import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
export async function DELETE(request, { params }) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = params.id;
    if (userId === session.user.id) {
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
