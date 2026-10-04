import { BRANDS } from "../data/brands";

// xlsx is ~300 kB, so it's only fetched when someone actually clicks export.
export async function downloadBrandsJson() {
  const XLSX = await import("xlsx");
  const ws = XLSX.utils.json_to_sheet(BRANDS);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Brands");
  XLSX.writeFile(wb, "scentwise-brand-directory.xlsx");
}
