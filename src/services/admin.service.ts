import { apiClient } from "./api-client";

type ApiEnvelope<T> = {
  data: T;
};

type PagedResult<T> = {
  meta?: {
    current: string;
    pageSize: string;
    pages: number;
    total: number;
  };
  result: T[];
};

export type DashboardSummary = {
  countOrder: number;
  countUser: number;
  countBook: number;
};

export type AdminBook = {
  _id: string;
  author?: string;
  category?: string;
  mainText?: string;
  price?: number;
  quantity?: number;
  sold?: number;
  thumbnail?: string;
};

export type AdminOrderDetail = {
  _id: string;
  bookName: string;
  quantity: number;
};

export type AdminOrder = {
  _id: string;
  name?: string;
  address?: string;
  phone?: string;
  totalPrice?: number;
  paymentStatus?: string;
  paymentRef?: string;
  detail?: AdminOrderDetail[];
};

export type AdminUser = {
  _id: string;
  fullName?: string;
  email?: string;
  phone?: string;
  role?: string;
};

function unwrapEnvelope<T>(payload: unknown): T {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>)
  ) {
    return (payload as ApiEnvelope<T>).data;
  }

  return payload as T;
}

function unwrapList<T>(payload: unknown): T[] {
  const data = unwrapEnvelope<PagedResult<T> | T[]>(payload);

  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object" && Array.isArray(data.result)) {
    return data.result;
  }

  return [];
}

export async function getAdminDashboardSummary() {
  const response = await apiClient.get("/api/v1/database/dashboard");
  return unwrapEnvelope<DashboardSummary>(response.data);
}

export async function getAdminBooks() {
  const response = await apiClient.get("/api/v1/book", {
    params: { current: 1, pageSize: 1000 },
  });
  return unwrapList<AdminBook>(response.data);
}

export async function getAdminOrders() {
  const response = await apiClient.get("/api/v1/order", {
    params: { current: 1, pageSize: 1000 },
  });
  return unwrapList<AdminOrder>(response.data);
}

export async function getAdminUsers() {
  const response = await apiClient.get("/api/v1/user", {
    params: { current: 1, pageSize: 1000 },
  });
  return unwrapList<AdminUser>(response.data);
}
