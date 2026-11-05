import type { ProfileData } from "../shared/types";
import { InfoItem } from "../shared/InfoItem";
import { ProfileSection } from "../shared/ProfileSection";
import { Building2, CalendarDays, FileText, GraduationCap, Mail, MapPin, Phone, UserRound } from "lucide-react";

export function BasicDetailsCard({ profile }: { profile: ProfileData }) {
  return (
    <ProfileSection title="Basic Details" icon={UserRound}>
      <div className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
        <InfoItem icon={UserRound} label="Student Name" value={profile.name} />
        <InfoItem icon={FileText} label="Registration Number" value={profile.registrationNumber} />
        <InfoItem icon={Building2} label="Department" value={profile.department} />
        <InfoItem icon={GraduationCap} label="Program" value={profile.program} />
        <InfoItem icon={CalendarDays} label="Batch / Semester" value={[profile.batch, profile.semester].filter(Boolean).join(" · ")} />
        <InfoItem icon={Mail} label="Email" value={profile.email} />
        <InfoItem icon={Phone} label="Phone" value={profile.phone} />
        <InfoItem icon={CalendarDays} label="Date of Birth" value={profile.dateOfBirth} />
        <InfoItem icon={MapPin} label="Location" value={profile.location} />
      </div>
    </ProfileSection>
  );
}
