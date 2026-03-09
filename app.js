export function normalizePartNumber(input) {
  return input
    .toLowerCase()
    .replace(/\s+/g, "");
}