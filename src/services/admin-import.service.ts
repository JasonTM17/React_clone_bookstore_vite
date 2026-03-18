import { apiClient } from "./api-client";

export type AdminImportModule = "books" | "orders" | "users";

type CsvRecord = Record<string, string>;

const validBookCategories = new Set([
  "Arts",
  "Business",
  "Comics",
  "Cooking",
  "Entertainment",
  "History",
  "Music",
  "Sports",
  "Teen",
  "Travel",
]);

function normalizeBookCategory(value: string | undefined) {
  const normalized = (value ?? "").trim();

  if (!normalized) {
    return "Business";
  }

  if (validBookCategories.has(normalized)) {
    return normalized;
  }

  const titleCase =
    normalized.charAt(0).toUpperCase() + normalized.slice(1).toLowerCase();

  return validBookCategories.has(titleCase) ? titleCase : "Business";
}

function parseSlider(value: string | undefined, fallbackThumbnail: string) {
  const normalized = (value ?? "").trim();

  if (!normalized) {
    return fallbackThumbnail ? [fallbackThumbnail] : ["about:blank"];
  }

  const items = normalized
    .split("|")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return items.length > 0 ? items : [fallbackThumbnail || "about:blank"];
}

function parseOrderDetail(row: CsvRecord) {
  const detailJson = row.detailJson?.trim();

  if (detailJson) {
    try {
      const parsed = JSON.parse(detailJson) as Array<{
        _id: string;
        bookName: string;
        quantity: number;
      }>;

      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch {
      return [];
    }
  }

  const bookId = (row.bookId || row._id || "").trim();

  if (!bookId) {
    return [];
  }

  return [
    {
      _id: bookId,
      bookName: row.bookName || row.title || "Unknown",
      quantity: Math.max(1, parseNumber(row.quantity, 1)),
    },
  ];
}

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
    fullName: row.fullName || row.name || "Unknown User",
    email: row.email || "",
    password: row.password || "123456",
    phone: row.phone || "0000000000",
  };
}

function mapBookPayload(row: CsvRecord) {
  const thumbnail = row.thumbnail || row.image || "about:blank";

  return {
    thumbnail,
    slider: parseSlider(row.slider, thumbnail),
    mainText: row.mainText || row.description || row.title || "No description",
    author: row.author || "Unknown Author",
    price: parseNumber(row.price, 0),
    quantity: parseNumber(row.quantity || row.stock, 0),
    category: normalizeBookCategory(row.category),
  };
}

function mapOrderPayload(row: CsvRecord) {
  const detail = parseOrderDetail(row);

  return {
    name: row.name || row.customerName || "Unknown Customer",
    address: row.address || "Unknown Address",
    phone: row.phone || "0000000000",
    totalPrice: parseNumber(row.totalPrice || row.total, 0),
    type: row.type || "COD",
    detail,
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

  const errors: string[] = [];
  let success = 0;

  for (const [index, row] of rows.entries()) {
    try {
      if (module === "orders") {
        const payload = mapOrderPayload(row);

        if (payload.detail.length === 0) {
          errors.push(
            `Dòng ${index + 1}: thiếu bookId/detailJson cho đơn hàng`,
          );
          continue;
        }

        await apiClient.post(endpoint, payload);
      } else {
        await apiClient.post(endpoint, mapBookPayload(row));
      }

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
