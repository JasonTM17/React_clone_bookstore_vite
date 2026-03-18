import { apiClient } from "./api-client";

export type AdminImportModule = "books" | "orders" | "users";

type CsvRecord = Record<string, string>;

export type ImportResult = {
  total: number;
  success: number;
  failed: number;
  errors: string[];
};

function parseNumber(value: string | undefined, fallback: number = 0) {
  if (!value) {
    return fallback;
  }

  const normalized = value.replace(/,/g, "").trim();
  const numberValue = Number(normalized);

  return Number.isNaN(numberValue) ? fallback : numberValue;
}

function mapUserPayload(row: CsvRecord) {
  return {
    fullName: row.fullName || row.name || "",
    email: row.email || "",
    password: row.password || "123456",
    phone: row.phone || "",
    role: row.role || "USER",
    age: parseNumber(row.age, 18),
    gender: row.gender || "MALE",
    address: row.address || "",
  };
}

function mapBookPayload(row: CsvRecord) {
  return {
    title: row.title || "",
    author: row.author || "",
    category: row.category || "General",
    price: parseNumber(row.price, 0),
    quantity: parseNumber(row.quantity || row.stock, 0),
    sold: parseNumber(row.sold, 0),
    thumbnail: row.thumbnail || row.image || "",
  };
}

function mapOrderPayload(row: CsvRecord) {
  return {
    name: row.name || row.customerName || "",
    address: row.address || "",
    phone: row.phone || "",
    totalPrice: parseNumber(row.totalPrice || row.total, 0),
    type: row.type || "COD",
    detail: [],
  };
}

export async function importModuleRows(
  module: AdminImportModule,
  rows: CsvRecord[],
): Promise<ImportResult> {
  if (rows.length === 0) {
    return {
      total: 0,
      success: 0,
      failed: 0,
      errors: [],
    };
  }

  if (module === "users") {
    try {
      await apiClient.post(
        "/api/v1/user/bulk-create",
        rows.map(mapUserPayload),
      );
      return {
        total: rows.length,
        success: rows.length,
        failed: 0,
        errors: [],
      };
    } catch {
      return {
        total: rows.length,
        success: 0,
        failed: rows.length,
        errors: [
          "Không thể bulk-create users. Kiểm tra format cột CSV và backend.",
        ],
      };
    }
  }

  const endpoint = module === "books" ? "/api/v1/book" : "/api/v1/order";
  const mapPayload = module === "books" ? mapBookPayload : mapOrderPayload;

  const errors: string[] = [];
  let success = 0;

  for (const [index, row] of rows.entries()) {
    try {
      await apiClient.post(endpoint, mapPayload(row));
      success += 1;
    } catch {
      errors.push(`Dòng ${index + 1}: gửi dữ liệu thất bại`);
    }
  }

  return {
    total: rows.length,
    success,
    failed: rows.length - success,
    errors,
  };
}
