import type { ProfileData } from "../shared/types";
import { ProfileSection } from "../shared/ProfileSection";
import { CheckCircle2 } from "lucide-react";

export function SkillsCard({ profile }: { profile: ProfileData }) {
  return (
    <ProfileSection title="Skills" icon={CheckCircle2} action={<span className="text-[10px] font-medium text-slate-500">{profile.skillsList.length} skills added</span>}>
      <div className="flex flex-wrap gap-2">
        {profile.skillsList.map((skill) => (
          <span key={skill} className="rounded-md bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-600">
            {skill}
          </span>
        ))}
      </div>
    </ProfileSection>
  );
}
