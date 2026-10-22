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
          created_at
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
          created_at
        FROM applications
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `;
    }
    const countResult = await sql`
      SELECT COUNT(*) as total FROM applications
    `;
    const total = parseInt(countResult[0].total);
    return Response.json({
      applications,
      total,
      limit,
      offset,
      isAdmin: isAdminUser(user),
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
