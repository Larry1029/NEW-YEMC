import sql from "@/app/api/utils/sql";
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
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
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return Response.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
