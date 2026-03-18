export const AUTH_STORAGE_UPDATED_EVENT = "bookstore-auth-updated";

const ACCESS_TOKEN_KEY = "bookstore-access-token";
const USER_INFO_KEY = "bookstore-user-info";

export type AuthUser = {
  id?: string;
  email?: string;
  phone?: string;
  fullName?: string;
  role?: string;
  avatar?: string;
};

function emitAuthUpdated() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_STORAGE_UPDATED_EVENT));
  }
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getAuthUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_INFO_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setAuthSession(accessToken: string, user?: AuthUser) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

  if (user) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(user));
  }

  emitAuthUpdated();
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  emitAuthUpdated();
}

export function isAdminUser(user: AuthUser | null) {
  return (user?.role ?? "").toUpperCase() === "ADMIN";
}
