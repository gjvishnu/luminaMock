import type { ProfileData } from "../shared/types";
import { CustomSelect } from "../shared/CustomSelect";
import { InfoItem } from "../shared/InfoItem";
import { ProfileSection } from "../shared/ProfileSection";
import { formatDateOfBirth } from "./profileMapper";
import {
  Building2,
  CalendarDays,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
} from "lucide-react";

export function BasicDetailsCard({
  profile,
  onProfileChange,
  isEditing,
  onSave,
  onCancel,
  isSaving = false,
  isNewProfile = false,
  fieldErrors = {},
}: {
  profile: ProfileData;
  onProfileChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing?: boolean;
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  isNewProfile?: boolean;
  fieldErrors?: Record<string, string>;
}) {
  const errorText = (field: string) =>
    fieldErrors[field] ? (
      <p className="mt-1 text-[10px] font-medium text-rose-500">
        {fieldErrors[field]}
      </p>
    ) : null;

  if (isEditing) {
    return (
      <ProfileSection
        title="Basic Details"
        icon={UserRound}
        action={
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2.5 py-1 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
          >
            <Pencil size={13} /> Edit
          </button>
        }
      >
        <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2 text-xs">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              FULL NAME <span className="text-rose-500">*</span>
            </label>
            <input
              value={profile.name}
              onChange={(e) =>
                onProfileChange((prev) => ({ ...prev, name: e.target.value }))
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none focus:border-cyan-400"
            />
            {errorText("name")}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              REGISTRATION NUMBER <span className="text-rose-500">*</span>
            </label>
            <input
              disabled={!isNewProfile}
              value={profile.registrationNumber}
              onChange={(e) =>
                onProfileChange((prev) => ({
                  ...prev,
                  registrationNumber: e.target.value,
                }))
              }
              className={`h-10 w-full rounded-lg border border-slate-200 px-3 font-medium text-slate-700 outline-none focus:border-cyan-400 ${
                isNewProfile ? "bg-white" : "bg-slate-100"
              }`}
            />
            {errorText("registration_number")}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              DEPARTMENT <span className="text-rose-500">*</span>
            </label>
            <CustomSelect
              value={profile.department}
              onChange={(val) =>
                onProfileChange((prev) => ({ ...prev, department: val }))
              }
              options={[
                "Computer Science & Engineering",
                "Information Technology",
                "Electronics & Communication",
                "Electrical Engineering",
                "Mechanical Engineering",
                "Civil Engineering",
              ]}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              PROGRAM <span className="text-rose-500">*</span>
            </label>
            <CustomSelect
              value={profile.program}
              onChange={(val) =>
                onProfileChange((prev) => ({ ...prev, program: val }))
              }
              options={[
                "B.E. Computer Science",
                "B.Tech Information Technology",
                "B.E. Electronics & Communication",
                "B.E. Mechanical Engineering",
                "B.E. Civil Engineering",
              ]}
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              BATCH / SEMESTER <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <CustomSelect
                value={profile.batch}
                onChange={(val) =>
                  onProfileChange((prev) => ({ ...prev, batch: val }))
                }
                options={["2024", "2025", "2026", "2027", "2028"]}
              />
              <CustomSelect
                value={profile.semester}
                onChange={(val) =>
                  onProfileChange((prev) => ({ ...prev, semester: val }))
                }
                options={[
                  "1st Semester",
                  "2nd Semester",
                  "3rd Semester",
                  "4th Semester",
                  "5th Semester",
                  "6th Semester",
                  "7th Semester",
                  "8th Semester",
                ]}
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              EMAIL <span className="text-rose-500">*</span>
            </label>
            <input
              value={profile.email}
              onChange={(e) =>
                onProfileChange((prev) => ({ ...prev, email: e.target.value }))
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none focus:border-cyan-400"
            />
            {errorText("email")}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              PHONE <span className="text-rose-500">*</span>
            </label>
            <input
              value={profile.phone}
              onChange={(e) =>
                onProfileChange((prev) => ({ ...prev, phone: e.target.value }))
              }
              maxLength={20}
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none focus:border-cyan-400"
            />
            {errorText("phone")}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              DATE OF BIRTH <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) =>
                  onProfileChange((prev) => ({
                    ...prev,
                    dateOfBirth: e.target.value,
                  }))
                }
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none focus:border-cyan-400"
              />
            </div>
            {errorText("date_of_birth")}
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              LOCATION <span className="text-rose-500">*</span>
            </label>
            <input
              value={profile.location}
              onChange={(e) =>
                onProfileChange((prev) => ({
                  ...prev,
                  location: e.target.value,
                }))
              }
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 font-medium text-slate-700 outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </ProfileSection>
    );
  }

  return (
    <ProfileSection title="Basic Details" icon={UserRound}>
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <InfoItem
          icon={FileText}
          label="Registration Number"
          value={profile.registrationNumber || "-"}
        />
        <InfoItem
          icon={Building2}
          label="Department"
          value={profile.department || "-"}
        />
        <InfoItem
          icon={GraduationCap}
          label="Program"
          value={profile.program || "-"}
        />
        <InfoItem
          icon={CalendarDays}
          label="Batch / Semester"
          value={`${profile.batch} · ${profile.semester}`}
        />
        <InfoItem icon={Mail} label="Email" value={profile.email || "-"} />
        <InfoItem icon={Phone} label="Phone" value={profile.phone || "-"} />
        <InfoItem
          icon={CalendarDays}
          label="Date of Birth"
          value={formatDateOfBirth(profile.dateOfBirth) || "-"}
        />
        <InfoItem
          icon={MapPin}
          label="Location"
          value={profile.location || "-"}
        />
      </div>
    </ProfileSection>
  );
}
