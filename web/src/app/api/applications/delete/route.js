import sql from "@/app/api/utils/sql";
export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) {
      return Response.json(
        { error: "Application ID is required" },
        { status: 400 },
      );
    }
    const result = await sql`
      DELETE FROM applications
      WHERE id = ${id}
      RETURNING id
    `;
    if (result.length === 0) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }
    return Response.json({
      success: true,
      message: "Application deleted successfully",
      id: result[0].id,
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return Response.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
