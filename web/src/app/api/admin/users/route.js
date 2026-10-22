import sql from "@/app/api/utils/sql";
import { requireAdmin } from "@/app/api/utils/authorization";
export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;
    const users = await sql`
      SELECT 
        id, 
        name, 
        email, 
        "emailVerified",
        image
      FROM auth_users
      ORDER BY id ASC
    `;
    return Response.json({ users });
  } catch (error) {
    console.error("Get users error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
