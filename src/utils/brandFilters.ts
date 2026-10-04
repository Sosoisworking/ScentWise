import type { Brand, BrandCategory } from "../data/brands";

export type CategoryFilter = "all" | BrandCategory;

export function filterBrands(
  brands: Brand[],
  query: string,
  category: CategoryFilter,
  activeLetter: string | null,
): Brand[] {
  const q = query.trim().toLowerCase();
  return brands.filter((brand) => {
    const matchesQuery =
      q === "" ||
      brand.name.toLowerCase().includes(q) ||
      brand.tagline.toLowerCase().includes(q) ||
      brand.country.toLowerCase().includes(q);
    const matchesCategory = category === "all" || brand.category === category;
    const matchesLetter = !activeLetter || brand.name[0].toUpperCase() === activeLetter;
    return matchesQuery && matchesCategory && matchesLetter;
  });
}

export function groupByLetter(brands: Brand[]): Record<string, Brand[]> {
  const sorted = [...brands].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.reduce<Record<string, Brand[]>>((acc, brand) => {
    const letter = brand.name[0].toUpperCase();
    (acc[letter] ||= []).push(brand);
    return acc;
  }, {});
}

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
