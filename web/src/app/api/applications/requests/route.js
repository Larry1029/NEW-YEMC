import {
  getAuthenticatedUser,
  isAdminUser,
  requireAdmin,
} from "@/app/api/utils/authorization";
import {
  editableApplicationFields,
  validateApplicationChanges,
} from "@/app/api/utils/application-changes";
import sql from "@/app/api/utils/sql";

export async function GET() {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;

    const requests = await sql`
      SELECT
        application_change_requests.id,
        application_change_requests.application_id,
        application_change_requests.request_type,
        application_change_requests.request_data,
        application_change_requests.status,
        application_change_requests.requester_name,
        application_change_requests.requester_email,
        application.full_name AS current_full_name,
        application.email AS current_email,
        application.phone AS current_phone,
        application.status AS current_status,
        application.institution AS current_institution,
        application.message AS current_message,
        application_change_requests.created_at
      FROM application_change_requests
      LEFT JOIN applications AS application
        ON application.id = application_change_requests.application_id
      WHERE application_change_requests.status = 'pending'
      ORDER BY application_change_requests.created_at ASC
    `;
    return Response.json({ requests });
  } catch (error) {
    console.error("Error fetching application change requests:", error);
    return Response.json(
      { error: "Failed to fetch application change requests" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user?.id || !user.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (isAdminUser(user)) {
      return Response.json(
        { error: "Admins can make application changes directly" },
        { status: 400 },
      );
    }

    const { applicationId, action, changes } = await request.json();
    if (!applicationId || !["edit", "delete"].includes(action)) {
      return Response.json(
        { error: "Application ID and a valid action are required" },
        { status: 400 },
      );
    }

    let requestData = null;
    if (action === "edit") {
      const validationError = validateApplicationChanges(changes);
      if (validationError) {
        return Response.json({ error: validationError }, { status: 400 });
      }
      requestData = Object.fromEntries(
        editableApplicationFields.map((field) => [
          field,
          typeof changes[field] === "string" ? changes[field].trim() : null,
        ]),
      );
    }

    const application = await sql`
      SELECT id FROM applications WHERE id = ${applicationId}
    `;
    if (application.length === 0) {
      return Response.json({ error: "Application not found" }, { status: 404 });
    }

    const inserted = await sql`
      INSERT INTO application_change_requests (
        application_id,
        request_type,
        request_data,
        requested_by,
        requester_name,
        requester_email
      )
      VALUES (
        ${applicationId},
        ${action},
        ${requestData ? JSON.stringify(requestData) : null}::jsonb,
        ${user.id},
        ${user.name || null},
        ${user.email}
      )
      RETURNING id
    `;

    return Response.json({
      success: true,
      requestId: inserted[0].id,
      message: "Your request was sent to the admin for review and approval.",
    });
  } catch (error) {
    console.error("Error submitting application change request:", error);
    return Response.json(
      { error: "Failed to submit application change request" },
      { status: 500 },
    );
  }
}
