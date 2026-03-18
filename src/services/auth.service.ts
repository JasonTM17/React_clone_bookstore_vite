import { apiClient } from "./api-client";
import { setAuthSession, type AuthUser } from "./auth-storage";

export type LoginPayload = {
  username: string;
  password: string;
};

export type RegisterPayload = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
};

type AuthResponse = {
  access_token: string;
  user?: AuthUser;
};

function unwrapData<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as { data: T }).data;
  }

  return payload as T;
}

export async function login(payload: LoginPayload) {
  const response = await apiClient.post("/api/v1/auth/login", payload);
  const authData = unwrapData<AuthResponse>(response.data);

  if (!authData?.access_token) {
    throw new Error("Không nhận được access token từ server");
  }

  setAuthSession(authData.access_token, authData.user);
  return authData;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post("/api/v1/user/register", payload);
  return unwrapData(response.data);
}
