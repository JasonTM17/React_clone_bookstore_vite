import { apiClient } from "./api-client";

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  const response = await apiClient.post("/auth/login", payload);
  return response.data;
}

export async function register(payload: RegisterPayload) {
  const response = await apiClient.post("/auth/register", payload);
  return response.data;
}
