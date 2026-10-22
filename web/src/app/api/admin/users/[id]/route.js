import sql from "@/app/api/utils/sql";
import { requireAdmin } from "@/app/api/utils/authorization";
export async function DELETE(request, { params }) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;

    const userId = params.id;
    if (String(userId) === String(authorization.user.id)) {
      return Response.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }
    await sql`DELETE FROM auth_users WHERE id = ${userId}`;
    return Response.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
