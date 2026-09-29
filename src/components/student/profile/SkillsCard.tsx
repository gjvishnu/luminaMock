import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { ProfileSection } from "../shared/ProfileSection";
import { CheckCircle2, ChevronDown, Plus, X } from "lucide-react";
import { useState } from "react";

export function SkillsCard({
  profile,
  onProfileChange,
  isEditing,
  onNotice,
}: {
  profile: ProfileData;
  onProfileChange: React.Dispatch<React.SetStateAction<ProfileData>>;
  isEditing?: boolean;
  onNotice: (msg: string) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (trimmed && !profile.skillsList.includes(trimmed)) {
      onProfileChange((prev) => ({
        ...prev,
        skillsList: [...prev.skillsList, trimmed],
      }));
      setSkillInput("");
      onNotice(`Added skill: ${trimmed}`);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    onProfileChange((prev) => ({
      ...prev,
      skillsList: prev.skillsList.filter((sk) => sk !== skillToRemove),
    }));
    onNotice(`Removed skill: ${skillToRemove}`);
  };

  const addSuggestedCS = () => {
    const suggestions = ["Docker", "AWS", "TypeScript", "System Design"];
    onProfileChange((prev) => ({
      ...prev,
      skillsList: Array.from(new Set([...prev.skillsList, ...suggestions])),
    }));
    onNotice("Added suggested CS skills!");
  };

  if (isEditing) {
    return (
      <DetailCard className="h-full">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
              <CheckCircle2 size={18} />
            </span>
            <div>
              <h2 className="text-sm font-bold text-slate-800 sm:text-base">Skills</h2>
              <p className="mt-1 text-[10px] text-slate-500">Add and manage your technical and soft skills.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-semibold text-slate-500">{profile.skillsList.length} skills added</span>
            <button
              type="button"
              onClick={() => setShowDropdown((prev) => !prev)}
              className="inline-flex items-center gap-1 rounded-md border border-cyan-300 px-2 py-1 text-[11px] font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Plus size={12} /> Add Skill
            </button>
          </div>
        </div>

        {/* Add Skill input & dropdown trigger */}
        <div className="relative mt-4">
          <p className="text-[11px] font-bold text-slate-800 mb-1">Add Skill</p>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill(skillInput);
                  }
                }}
                placeholder="Search or select a skill (e.g. Python, React, AWS...)"
                className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-cyan-400"
              />
              <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>
            <button
              type="button"
              onClick={() => addSkill(skillInput)}
              className="h-10 rounded-lg bg-cyan-500 px-4 text-xs font-semibold text-white hover:bg-cyan-600"
            >
              Add
            </button>
          </div>
          <button
            type="button"
            onClick={addSuggestedCS}
            className="mt-1 text-[10px] font-semibold text-cyan-600 hover:underline"
          >
            Show suggested for CS →
          </button>

          {/* Skill Dropdown Overlay */}
          {showDropdown && (
            <div className="absolute left-0 top-full z-20 mt-1 grid w-full grid-cols-[140px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="border-r border-slate-100 bg-slate-50/70 p-2 text-[11px]">
                {["Popular", "Programming Languages", "Web Development", "Mobile Development", "Database", "Cloud & DevOps", "AI/ML & Data Science", "Cybersecurity", "Other"].map((cat, idx) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setShowDropdown(false)}
                    className={`block w-full rounded-md px-2.5 py-1.5 text-left font-medium ${idx === 0 ? "bg-white font-bold text-slate-800 shadow-sm" : "text-slate-600 hover:bg-slate-100"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="max-h-60 overflow-y-auto p-2 text-xs">
                {[
                  { name: "Python", icon: "🐍" },
                  { name: "Java", icon: "☕" },
                  { name: "C++", icon: "⚙️" },
                  { name: "JavaScript", icon: "🟨" },
                  { name: "TypeScript", icon: "📘" },
                  { name: "Go", icon: "🐹" },
                  { name: "Rust", icon: "🦀" },
                  { name: "Kotlin", icon: "🅺" },
                  { name: "Docker", icon: "🐳" },
                  { name: "AWS", icon: "☁️" },
                ]
                  .filter((sk) => !skillInput || sk.name.toLowerCase().includes(skillInput.toLowerCase()))
                  .map((sk) => (
                    <button
                      key={sk.name}
                      type="button"
                      onClick={() => {
                        addSkill(sk.name);
                        setShowDropdown(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left font-semibold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                    >
                      <span>{sk.icon}</span>
                      <span>{sk.name}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Your Skills Area */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800">Your Skills</h3>
            <button
              type="button"
              onClick={() => {
                onProfileChange((prev) => ({ ...prev, skillsList: [] }));
                onNotice("Cleared all skills.");
              }}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-500 hover:underline"
            >
              Clear All
            </button>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {profile.skillsList.map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700">
                {skill}
                <button type="button" onClick={() => removeSkill(skill)} className="text-violet-400 hover:text-violet-700">
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        </div>
      </DetailCard>
    );
  }

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
