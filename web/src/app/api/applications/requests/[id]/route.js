import { requireAdmin } from "@/app/api/utils/authorization";
import sql from "@/app/api/utils/sql";

export async function PATCH(request, { params }) {
  try {
    const authorization = await requireAdmin();
    if (authorization.response) return authorization.response;

    const { decision } = await request.json();
    if (!["approve", "reject"].includes(decision)) {
      return Response.json(
        { error: "Decision must be approve or reject" },
        { status: 400 },
      );
    }

    const requestId = params.id;
    let result;
    if (decision === "reject") {
      result = await sql`
        UPDATE application_change_requests
        SET status = 'rejected',
            reviewed_by = ${authorization.user.id},
            reviewed_at = CURRENT_TIMESTAMP
        WHERE id = ${requestId} AND status = 'pending'
        RETURNING id
      `;
    } else {
      result = await sql`
        WITH pending_request AS (
          SELECT id, application_id, request_type, request_data
          FROM application_change_requests
          WHERE id = ${requestId} AND status = 'pending'
          FOR UPDATE
        ),
        changed_application AS (
          UPDATE applications
          SET full_name = pending_request.request_data->>'full_name',
              email = pending_request.request_data->>'email',
              phone = pending_request.request_data->>'phone',
              status = pending_request.request_data->>'status',
              institution = pending_request.request_data->>'institution',
              message = pending_request.request_data->>'message'
          FROM pending_request
          WHERE applications.id = pending_request.application_id
            AND pending_request.request_type = 'edit'
          RETURNING applications.id
        ),
        deleted_application AS (
          DELETE FROM applications
          USING pending_request
          WHERE applications.id = pending_request.application_id
            AND pending_request.request_type = 'delete'
          RETURNING applications.id
        ),
        completed_request AS (
          UPDATE application_change_requests
          SET status = 'approved',
              reviewed_by = ${authorization.user.id},
              reviewed_at = CURRENT_TIMESTAMP
          FROM pending_request
          WHERE application_change_requests.id = pending_request.id
            AND (
              EXISTS (SELECT 1 FROM changed_application)
              OR EXISTS (SELECT 1 FROM deleted_application)
            )
          RETURNING application_change_requests.id
        )
        SELECT id FROM completed_request
      `;
    }

    if (result.length === 0) {
      return Response.json(
        {
          error:
            "Request is no longer pending, or its application no longer exists",
        },
        { status: 409 },
      );
    }

    return Response.json({ success: true, decision });
  } catch (error) {
    console.error("Error reviewing application change request:", error);
    return Response.json(
      { error: "Failed to review application change request" },
      { status: 500 },
    );
  }
}
