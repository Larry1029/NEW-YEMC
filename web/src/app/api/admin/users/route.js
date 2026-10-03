import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
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
