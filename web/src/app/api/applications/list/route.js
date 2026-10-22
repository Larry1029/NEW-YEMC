import sql from "@/app/api/utils/sql";
import {
  getAuthenticatedUser,
  isAdminUser,
} from "@/app/api/utils/authorization";

export async function GET(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const limit = Math.min(
      Math.max(parseInt(searchParams.get("limit") || "50", 10), 1),
      100,
    );
    const offset = Math.max(parseInt(searchParams.get("offset") || "0", 10), 0);
    let applications;
    if (search) {
      applications = await sql`
        SELECT 
          id, 
          full_name, 
          email, 
          phone, 
          status,
          institution,
          message, 
          created_at,
          consent_given,
          consent_given_at,
          checked_in_at
        FROM applications
        WHERE 
          LOWER(full_name) LIKE LOWER(${"%" + search + "%"})
          OR LOWER(email) LIKE LOWER(${"%" + search + "%"})
          OR LOWER(phone) LIKE LOWER(${"%" + search + "%"})
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    } else {
      applications = await sql`
        SELECT 
          id, 
          full_name, 
          email, 
          phone, 
          status,
          institution,
          message, 
          created_at,
          consent_given,
          consent_given_at,
          checked_in_at
        FROM applications
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    }
    const summaryResult = await sql`
      WITH reporting_day AS (
        SELECT
          date_trunc(
            'day',
            CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Accra'
          ) AT TIME ZONE 'Africa/Accra' AS starts_at,
          (
            date_trunc(
              'day',
              CURRENT_TIMESTAMP AT TIME ZONE 'Africa/Accra'
            ) + INTERVAL '1 day'
          ) AT TIME ZONE 'Africa/Accra' AS ends_at
      )
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (
          WHERE applications.created_at >= reporting_day.starts_at
            AND applications.created_at < reporting_day.ends_at
        ) AS applications_today,
        COUNT(*) FILTER (
          WHERE applications.consent_given = TRUE
        ) AS consent_confirmed,
        COUNT(*) FILTER (
          WHERE applications.checked_in_at IS NOT NULL
        ) AS checked_in
      FROM applications
      CROSS JOIN reporting_day
    `;
    const summary = summaryResult[0];
    const total = parseInt(summary.total, 10);
    return Response.json({
      applications,
      total,
      limit,
      offset,
      isAdmin: isAdminUser(user),
      stats: {
        total,
        applicationsToday: parseInt(summary.applications_today, 10),
        consentConfirmed: parseInt(summary.consent_confirmed, 10),
        checkedIn: parseInt(summary.checked_in, 10),
      },
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
