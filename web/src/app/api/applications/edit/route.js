import { requireAdmin } from "@/app/api/utils/authorization";
import {
  editableApplicationFields,
  validateApplicationChanges,
} from "@/app/api/utils/application-changes";
import sql from "@/app/api/utils/sql";

export async function PATCH(request) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;

    const { id, ...data } = await request.json();
    if (!id) {
      return Response.json(
        { error: "Application ID is required" },
        { status: 400 },
      );
    }
    const validationError = validateApplicationChanges(data);
    if (validationError) {
      return Response.json({ error: validationError }, { status: 400 });
    }

    const values = Object.fromEntries(
      editableApplicationFields.map((field) => [
        field,
        typeof data[field] === "string" ? data[field].trim() : null,
      ]),
    );
    const result = await sql`
      UPDATE applications
      SET full_name = ${values.full_name},
          email = ${values.email},
          phone = ${values.phone},
          status = ${values.status},
          institution = ${values.institution},
          message = ${values.message}
      WHERE id = ${id}
      RETURNING id
    `;
    if (result.length === 0) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }

    return Response.json({ success: true, id: result[0].id });
  } catch (error) {
    console.error("Error updating application:", error);
    return Response.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}
