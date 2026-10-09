import type { ProfileData } from "../shared/types";
import { DetailCard } from "../shared/DetailCard";
import { ProfileSection } from "../shared/ProfileSection";
import { CheckCircle2, ChevronDown, Plus, X } from "lucide-react";
import { useState, useCallback, useEffect, useRef } from "react";

const CATEGORIES = [
  "Popular",
  "Programming Languages",
  "Web Development",
  "Mobile Development",
  "Database",
  "Cloud & DevOps",
  "AI/ML & Data Science",
  "Cybersecurity",
  "Other",
];

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Information Technology",
  "Electronics & Communication Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Data Science & Artificial Intelligence",
  "Artificial Intelligence & Machine Learning",
  "Information Systems",
];

const PREDEFINED_SKILLS: { name: string; icon: string; category: string }[] = [
  { name: "Python", icon: "🐍", category: "Programming Languages" },
  { name: "Java", icon: "☕", category: "Programming Languages" },
  { name: "C++", icon: "⚙️", category: "Programming Languages" },
  { name: "JavaScript", icon: "🟨", category: "Programming Languages" },
  { name: "TypeScript", icon: "📘", category: "Programming Languages" },
  { name: "Go", icon: "🐹", category: "Programming Languages" },
  { name: "Rust", icon: "🦀", category: "Programming Languages" },
  { name: "Kotlin", icon: "🅺", category: "Programming Languages" },
  { name: "React", icon: "⚛️", category: "Web Development" },
  { name: "Node.js", icon: "🟢", category: "Web Development" },
  { name: "HTML/CSS", icon: "🌐", category: "Web Development" },
  { name: "Next.js", icon: "▲", category: "Web Development" },
  { name: "Vue.js", icon: "💚", category: "Web Development" },
  { name: "Docker", icon: "🐳", category: "Cloud & DevOps" },
  { name: "AWS", icon: "☁️", category: "Cloud & DevOps" },
  { name: "Kubernetes", icon: "⎈", category: "Cloud & DevOps" },
  { name: "Git", icon: "📦", category: "Cloud & DevOps" },
  { name: "CI/CD", icon: "🔄", category: "Cloud & DevOps" },
  { name: "SQL", icon: "🗄️", category: "Database" },
  { name: "MongoDB", icon: "🍃", category: "Database" },
  { name: "PostgreSQL", icon: "🐘", category: "Database" },
  { name: "Redis", icon: "🔴", category: "Database" },
  { name: "TensorFlow", icon: "🧠", category: "AI/ML & Data Science" },
  { name: "PyTorch", icon: "🔥", category: "AI/ML & Data Science" },
  { name: "Pandas", icon: "🐼", category: "AI/ML & Data Science" },
  { name: "Scikit-learn", icon: "📊", category: "AI/ML & Data Science" },
  { name: "Swift", icon: "🐦", category: "Mobile Development" },
  { name: "Flutter", icon: "💙", category: "Mobile Development" },
  { name: "React Native", icon: "📱", category: "Mobile Development" },
  { name: "Network Security", icon: "🔒", category: "Cybersecurity" },
  { name: "Penetration Testing", icon: "🎯", category: "Cybersecurity" },
];

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
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSkill, setModalSkill] = useState("");
  const [modalDepartment, setModalDepartment] = useState("");
  const [modalCategory, setModalCategory] = useState("");
  const [modalError, setModalError] = useState("");
  const [customSkills, setCustomSkills] = useState<{ name: string; icon: string; category: string }[]>([]);
  const [activeField, setActiveField] = useState<"department" | "category" | "skill" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const allSkills = [...PREDEFINED_SKILLS, ...customSkills];

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalError("");
    setModalDepartment("");
    setModalCategory("");
    setModalSkill("");
    setActiveField(null);
  }, []);

  const addSkill = (skillToAdd: string) => {
    const trimmed = skillToAdd.trim();
    if (!trimmed) return;
    const alreadyAdded = profile.skillsList.some(
      (s) => s.toLowerCase() === trimmed.toLowerCase(),
    );
    if (!alreadyAdded) {
      onProfileChange((prev) => ({
        ...prev,
        skillsList: [...prev.skillsList, trimmed],
      }));
      setSkillInput("");
      onNotice(`Added skill: ${trimmed}`);
    } else {
      setSkillInput("");
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeModal]);

  const handleSelectPredefinedSkill = (skillName: string) => {
    addSkill(skillName);
    inputRef.current?.focus();
  };

  const handleAddSkillClick = () => {
    const trimmed = skillInput.trim();
    if (!trimmed) return;

    const matches = allSkills.filter((sk) =>
      sk.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (matches.length > 0) {
      addSkill(trimmed);
      return;
    }

    setModalSkill(trimmed);
    setModalDepartment("");
    setModalCategory("");
    setModalError("");
    setIsModalOpen(true);
    setShowDropdown(false);
  };

  const handleModalConfirm = () => {
    const skill = modalSkill.trim();
    const category = modalCategory.trim();
    const department = modalDepartment.trim();
    if (!skill || !category || !department) {
      setModalError("Department, Category and Skill are required.");
      return;
    }
    if (allSkills.some((sk) => sk.name.toLowerCase() === skill.toLowerCase())) {
      setModalError("Skill already exists in predefined list.");
      return;
    }
    if (
      profile.skillsList.some((s) => s.toLowerCase() === skill.toLowerCase())
    ) {
      setModalError("Skill already in your skills.");
      return;
    }

    setCustomSkills((prev) => [...prev, { name: skill, icon: "⭐", category }]);
    onProfileChange((prev) => ({
      ...prev,
      skillsList: [...prev.skillsList, skill],
    }));
    onNotice(`Added skill: ${skill}`);
    setSkillInput("");
    closeModal();
  };

  const filteredSkills = allSkills.filter((sk) => {
    const matchesInput = !skillInput || sk.name.toLowerCase().includes(skillInput.toLowerCase());
    const matchesCategory = selectedCategory === "Popular" || sk.category === selectedCategory;
    return matchesInput && matchesCategory;
  });

  const showAddSkillOption = Boolean(skillInput.trim()) && filteredSkills.length === 0;

  const departmentSuggestions = modalDepartment.trim()
    ? DEPARTMENTS.filter((d) =>
        d.toLowerCase().includes(modalDepartment.trim().toLowerCase())
      )
    : [];

  const categorySuggestions = modalCategory.trim()
    ? CATEGORIES.filter((c) =>
        c.toLowerCase().includes(modalCategory.trim().toLowerCase())
      )
    : [];

  const skillSuggestions = modalSkill.trim()
    ? allSkills.filter((sk) =>
        sk.name.toLowerCase().includes(modalSkill.trim().toLowerCase())
      ).map((sk) => sk.name)
    : [];

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
          <span className="text-[10px] font-semibold text-slate-500">{profile.skillsList.length} skills added</span>
        </div>

        <div className="relative mt-4" ref={dropdownRef}>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onFocus={() => setShowDropdown(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddSkillClick();
                }
              }}
              placeholder="Search or select a skill (e.g. Python, React, AWS...)"
              className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-cyan-400"
            />
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>

          <button
            type="button"
            onClick={addSuggestedCS}
            className="mt-1 text-[10px] font-semibold text-cyan-600 hover:underline"
          >
            Show suggested for CS →
          </button>

          {showDropdown && (
            <div className="absolute left-0 top-full z-20 mt-1 grid w-full grid-cols-[140px_minmax(0,1fr)] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
              <div className="border-r border-slate-100 bg-slate-50/70 p-2 text-[11px]">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    className={`block w-full rounded-md px-2.5 py-1.5 text-left font-medium ${
                      cat === selectedCategory
                        ? "bg-white font-bold text-slate-800 shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="max-h-60 overflow-y-auto p-2 text-xs">
                {filteredSkills.map((sk) => (
                  <button
                    key={sk.name}
                    type="button"
                    onClick={() => handleSelectPredefinedSkill(sk.name)}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left font-semibold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <span>{sk.icon}</span>
                    <span>{sk.name}</span>
                  </button>
                ))}
                {showAddSkillOption && (
                  <button
                    type="button"
                    onClick={handleAddSkillClick}
                    className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left font-semibold text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700"
                  >
                    <Plus size={14} className="text-cyan-500" />
                    <span>+ Add Skill</span>
                    <span className="ml-auto text-[10px] text-slate-400">No matching skills found</span>
                  </button>
                )}
                {filteredSkills.length === 0 && !showAddSkillOption && (
                  <p className="px-3 py-2 text-slate-400 text-center">No skills match your search</p>
                )}
              </div>
            </div>
          )}
        </div>

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

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                    <Plus size={22} />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-gray-900">Add Skill</h2>
                    <p className="text-xs text-gray-500">Add a new skill to your profile.</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); handleModalConfirm(); }} autoComplete="off" className="mt-4 space-y-3">
                {modalError && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
                    {modalError}
                  </div>
                )}

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={modalDepartment}
                      onChange={(e) => {
                        setModalDepartment(e.target.value);
                        setModalError("");
                      }}
                      onFocus={() => setActiveField("department")}
                      onBlur={() => setTimeout(() => setActiveField(null), 150)}
                      placeholder="Type department name (e.g. CSE)"
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      required
                    />
                    {activeField === "department" && departmentSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                        {departmentSuggestions.map((dept) => (
                          <button
                            key={dept}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setModalDepartment(dept);
                              setModalError("");
                              setActiveField(null);
                            }}
                            className="block w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                          >
                            {dept}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={modalCategory}
                      onChange={(e) => {
                        setModalCategory(e.target.value);
                        setModalError("");
                      }}
                      onFocus={() => setActiveField("category")}
                      onBlur={() => setTimeout(() => setActiveField(null), 150)}
                      placeholder="Type category (e.g. Cloud & DevOps)"
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      required
                    />
                    {activeField === "category" && categorySuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                        {categorySuggestions.map((cat) => (
                          <button
                            key={cat}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setModalCategory(cat);
                              setModalError("");
                              setActiveField(null);
                            }}
                            className="block w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700">
                    Skill <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={modalSkill}
                      onChange={(e) => {
                        setModalSkill(e.target.value);
                        setModalError("");
                      }}
                      onFocus={() => setActiveField("skill")}
                      onBlur={() => setTimeout(() => setActiveField(null), 150)}
                      placeholder="Enter skill name"
                      className="h-10 w-full rounded-xl border border-gray-200 bg-white px-3 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                      required
                    />
                    {activeField === "skill" && skillSuggestions.length > 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-40 overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg">
                        {skillSuggestions.map((sk) => (
                          <button
                            key={sk}
                            type="button"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              setModalSkill(sk);
                              setModalError("");
                              setActiveField(null);
                            }}
                            className="block w-full px-3 py-1.5 text-left text-xs font-medium text-slate-700 hover:bg-cyan-50 hover:text-cyan-700"
                          >
                            {sk}
                          </button>
                        ))}
                      </div>
                    )}
                    {activeField === "skill" && skillSuggestions.length === 0 && (
                      <div className="absolute left-0 right-0 top-full z-20 mt-1 rounded-lg border border-slate-200 bg-white shadow-lg">
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setModalError("");
                            setActiveField(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 hover:bg-cyan-50"
                        >
                          <Plus size={14} className="text-cyan-500" />
                          <span className="text-xs font-semibold text-cyan-600">+ Add Skill</span>
                          <span className="ml-auto text-[10px] text-slate-400">No matching skills found</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-gray-200 bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.99] disabled:opacity-50 shadow-sm"
                  >
                    + Add Skill
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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