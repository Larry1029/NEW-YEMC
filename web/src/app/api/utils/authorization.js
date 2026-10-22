import { auth } from "@/auth";

export async function getAuthenticatedUser() {
  const session = await auth();
  return session?.user || null;
}

export function isAdminUser(user) {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = user?.email?.trim().toLowerCase();
  return Boolean(adminEmail && userEmail && adminEmail === userEmail);
}

export async function requireAdmin() {
  const user = await getAuthenticatedUser();
  if (!user) {
    return {
      response: Response.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  if (!process.env.ADMIN_EMAIL?.trim()) {
    console.error("ADMIN_EMAIL must be configured to enable admin access.");
    return {
      response: Response.json(
        { error: "Admin access is not configured" },
        { status: 503 },
      ),
    };
  }

  if (!isAdminUser(user)) {
    return {
      response: Response.json(
        { error: "Admin access required" },
        { status: 403 },
      ),
    };
  }

  return { user };
}
