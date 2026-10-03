import sql from "@/app/api/utils/sql";
import { auth } from "@/auth";
export async function POST(request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const file = formData.get("file");
    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }
    const text = await file.text();
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length === 0) {
      return Response.json({ error: "Empty CSV file" }, { status: 400 });
    }
    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const requiredColumns = ["full_name", "email", "phone"];
    const missingColumns = requiredColumns.filter(
      (col) => !headers.includes(col),
    );
    if (missingColumns.length > 0) {
      return Response.json(
        {
          error: `Missing required columns: ${missingColumns.join(", ")}`,
        },
        { status: 400 },
      );
    }
    const applications = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map((v) => v.trim());
      if (values.length === 0 || values.every((v) => !v)) continue;
      const app = {};
      headers.forEach((header, index) => {
        app[header] = values[index] || null;
      });
      applications.push(app);
    }
    if (applications.length === 0) {
      return Response.json({ error: "No valid data in CSV" }, { status: 400 });
    }
    let inserted = 0;
    let errors = [];
    for (const app of applications) {
      try {
        await sql(
          `INSERT INTO applications (full_name, email, phone, occupation, institution, status, message, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP)`,
          [
            app.full_name,
            app.email,
            app.phone,
            app.occupation || null,
            app.institution || null,
            app.status || null,
            app.message || null,
          ],
        );
        inserted++;
      } catch (error) {
        console.error("Error inserting application:", error);
        errors.push(`${app.full_name} (${app.email}): ${error.message}`);
      }
    }
    return Response.json({
      success: true,
      inserted,
      total: applications.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Error uploading CSV:", error);
    return Response.json({ error: "Failed to upload CSV" }, { status: 500 });
  }
}
