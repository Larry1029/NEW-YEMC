import { getContext } from "hono/context-storage";
import { getCookie } from "hono/cookie";
import AppAdapter from "../../../../__create/adapter.ts";

const adapter = AppAdapter();
const defaultAdminEmail = "mr.glover1029@gmail.com";

export async function getAuthenticatedUser() {
  const context = getContext();
  const sessionToken = getCookie(context, "sessionToken");
  if (!sessionToken) return null;

  const sessionAndUser = await adapter.getSessionAndUser(sessionToken);
  if (
    !sessionAndUser ||
    new Date(sessionAndUser.session.expires) <= new Date()
  ) {
    return null;
  }

  return sessionAndUser.user;
}

export function isAdminUser(user) {
  const adminEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase() || defaultAdminEmail;
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
