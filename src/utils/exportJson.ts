import * as XLSX from "xlsx";
import { BRANDS } from "../data/brands";

export function downloadBrandsJson() {
  const ws = XLSX.utils.json_to_sheet(BRANDS);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Brands");
  XLSX.writeFile(wb, "scentwise-brand-directory.xlsx");
}
