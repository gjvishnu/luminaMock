import type { DepartmentRecord, SkillRecord } from "../redux/api";

export function getCatalogRecordId(record: SkillRecord | DepartmentRecord) {
  return String("skill" in record
    ? record.skillUuid ?? record.skillId ?? record.id ?? ""
    : record.departmentUuid ?? record.departmentId ?? record.id ?? "");
}

export function getCatalogRecordLabel(record: SkillRecord | DepartmentRecord) {
  return "skill" in record ? record.skill : record.name;
}

export function mergeCatalog<T extends SkillRecord | DepartmentRecord>(options: T[], selected: T[]) {
  const ids = new Set(options.map(getCatalogRecordId));
  return [...options, ...selected.filter((record) => {
    const id = getCatalogRecordId(record);
    if (ids.has(id)) return false;
    ids.add(id);
    return true;
  })];
}

export function getChangedFields<T extends object>(current: T, saved: T) {
  return Object.fromEntries(
    Object.entries(current).filter(([key, value]) => JSON.stringify(value) !== JSON.stringify(saved[key as keyof T])),
  ) as Partial<T>;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } | string }).data;
    if (typeof data === "string") return data;
    if (data?.message) return data.message;
  }

  return fallback;
}
