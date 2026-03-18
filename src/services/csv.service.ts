export type ParsedCsvResult = {
  headers: string[];
  rows: Record<string, string>[];
};

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let currentValue = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];

    if (character === '"') {
      const nextCharacter = line[index + 1];

      if (inQuotes && nextCharacter === '"') {
        currentValue += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (character === "," && !inQuotes) {
      values.push(currentValue.trim());
      currentValue = "";
      continue;
    }

    currentValue += character;
  }

  values.push(currentValue.trim());
  return values;
}

export function parseCsvText(text: string): ParsedCsvResult {
  const normalizedText = text.replace(/\r\n/g, "\n").trim();

  if (!normalizedText) {
    throw new Error("File CSV rỗng");
  }

  const lines = normalizedText
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  if (lines.length < 2) {
    throw new Error("CSV cần tối thiểu 1 dòng header và 1 dòng dữ liệu");
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());

  if (headers.some((header) => header.length === 0)) {
    throw new Error("Header CSV không hợp lệ");
  }

  const rows = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] ?? "";
    });

    return row;
  });

  return {
    headers,
    rows,
  };
}

function escapeCsvValue(value: unknown): string {
  const stringValue = String(value ?? "");
  const normalized = stringValue.replace(/"/g, '""');

  if (
    normalized.includes(",") ||
    normalized.includes("\n") ||
    normalized.includes("\r") ||
    normalized.includes('"')
  ) {
    return `"${normalized}"`;
  }

  return normalized;
}

export function convertRowsToCsvText(
  rows: Record<string, unknown>[],
  preferredHeaders?: string[],
): string {
  if (
    rows.length === 0 &&
    (!preferredHeaders || preferredHeaders.length === 0)
  ) {
    throw new Error("Không có dữ liệu để xuất CSV");
  }

  const fallbackHeaders = rows.length > 0 ? Object.keys(rows[0]) : [];
  const headers =
    preferredHeaders && preferredHeaders.length > 0
      ? preferredHeaders
      : fallbackHeaders;

  const headerLine = headers.map((header) => escapeCsvValue(header)).join(",");
  const rowLines = rows.map((row) =>
    headers.map((header) => escapeCsvValue(row[header])).join(","),
  );

  return [headerLine, ...rowLines].join("\n");
}

export function downloadCsvFile(fileName: string, csvText: string) {
  const blob = new Blob([`\uFEFF${csvText}`], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}
