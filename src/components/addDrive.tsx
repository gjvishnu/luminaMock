import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  FileText,
  Home,
  LoaderCircle,
  MapPin,
  Pencil,
  Plus,
  Search,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  type CompanyRecord,
  type CreateDriveRequest,
  type DepartmentRecord,
  type DriveJobType,
  type DriveStatus,
  type SelectionProcess,
  type SkillRecord,
  useCreateCompanyMutation,
  useCreateDepartmentMutation,
  useCreateDriveMutation,
  useCreateSkillMutation,
  useGetCompaniesQuery,
  useGetDepartmentsQuery,
  useGetSkillsQuery,
} from "../redux/api";

type JdFile = {
  name: string;
  size: string;
  url: string;
};

// Each role section contains Job Role Info + Eligibility + Role Details
type RoleSection = {
  id: string;
  // Job Role Info
  jobRole: string;
  jobLocation: string;
  jobType: string;
  ctc: string;
  skills: string[];
  openings: string;
  // Eligibility Criteria
  departments: string[];
  batch: string;
  minimumCgpa: string;
  maximumBacklogs: string;
  degree: string;
  otherCriteria: string;
  // Role Details
  jobDescription: string;
  jdFile: JdFile | null;
  selectionProcesses: string[];
};

type CatalogModalKind = "skill" | "department";

const jobTypeOptions = ["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "APPRENTICESHIP"];
const batchOptions = ["2026", "2025", "2024", "2023"];
const driveStatusOptions = ["DRAFT", "UPCOMING", "ONGOING"];
const selectionProcessOptions = [
  "ONLINE_ASSESSMENT",
  "APTITUDE_TEST",
  "TECHNICAL_TEST",
  "GROUP_DISCUSSION",
  "TECHNICAL_INTERVIEW",
  "HR_INTERVIEW",
  "MANAGERIAL_INTERVIEW",
  "CASE_STUDY",
  "CODING_ROUND",
];

const defaultRoleSection = (): RoleSection => ({
  id: "role-" + Date.now() + "-" + Math.random(),
  jobRole: "",
  jobLocation: "",
  jobType: "",
  ctc: "",
  skills: [],
  openings: "",
  departments: [],
  batch: "",
  minimumCgpa: "",
  maximumBacklogs: "",
  degree: "",
  otherCriteria: "",
  jobDescription: "",
  jdFile: null,
  selectionProcesses: [],
});

function getCompanyId(company: CompanyRecord) {
  return String(company.companyUuid ?? company.companyId ?? company.id ?? "");
}

function getCatalogRecordId(record: SkillRecord | DepartmentRecord) {
  return String("skill" in record
    ? record.skillUuid ?? record.skillId ?? record.id ?? ""
    : record.departmentUuid ?? record.departmentId ?? record.id ?? "");
}

function getCatalogRecordLabel(record: SkillRecord | DepartmentRecord) {
  return "skill" in record ? record.skill : record.name;
}

function formatCatalogValues(values: string[], options: (SkillRecord | DepartmentRecord)[]) {
  return values.map((value) => {
    const option = options.find((item) => getCatalogRecordId(item) === value);
    return option ? getCatalogRecordLabel(option) : value;
  }).join(", ");
}

function getApiErrorMessage(error: unknown, fallback: string) {
  if (typeof error === "object" && error !== null && "data" in error) {
    const data = (error as { data?: { message?: string } | string }).data;
    if (typeof data === "string") return data;
    if (data?.message) return data.message;
  }

  return fallback;
}

type FieldErrors = Record<string, string>;

export const AddDrive = () => {
  const navigate = useNavigate();
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Card 1: Company & Drive Information
  const [companyId, setCompanyId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [driveDate, setDriveDate] = useState("");
  const [driveTime, setDriveTime] = useState("");
  const [venue, setVenue] = useState("");
  const [registrationEndDate, setRegistrationEndDate] = useState("");
  const [driveStatus, setDriveStatus] = useState("");
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyWebsite, setNewCompanyWebsite] = useState("");
  const [newCompanyLocation, setNewCompanyLocation] = useState("");
  const [companyModalError, setCompanyModalError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const companiesQuery = useGetCompaniesQuery();
  const departmentsQuery = useGetDepartmentsQuery();
  const skillsQuery = useGetSkillsQuery();
  const [createCompany, { isLoading: isCreatingCompany }] = useCreateCompanyMutation();
  const [createDepartment, { isLoading: isCreatingDepartment }] = useCreateDepartmentMutation();
  const [createDrive, { isLoading: isCreatingDrive }] = useCreateDriveMutation();
  const [createSkill, { isLoading: isCreatingSkill }] = useCreateSkillMutation();
  const companies = companiesQuery.data ?? [];
  const departments = departmentsQuery.data ?? [];
  const skills = skillsQuery.data ?? [];
  const [catalogModal, setCatalogModal] = useState<CatalogModalKind | null>(null);
  const [catalogName, setCatalogName] = useState("");
  const [catalogCategory, setCatalogCategory] = useState("");
  const [catalogDomain, setCatalogDomain] = useState("");
  const [catalogError, setCatalogError] = useState<string | null>(null);

  // Multiple role sections (each has Job Role Info + Eligibility + Role Details)
  const [roleSections, setRoleSections] = useState<RoleSection[]>([
    { ...defaultRoleSection(), id: "role-1" },
  ]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      roleSections.forEach((r) => {
        if (r.jdFile) URL.revokeObjectURL(r.jdFile.url);
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAddRole = () => {
    setRoleSections((prev) => [...prev, defaultRoleSection()]);
    toast.info("Added new role section");
  };

  const handleDeleteRole = (id: string) => {
    if (roleSections.length <= 1) return;
    setRoleSections((prev) => {
      const removed = prev.find((r) => r.id === id);
      if (removed?.jdFile) URL.revokeObjectURL(removed.jdFile.url);
      return prev.filter((r) => r.id !== id);
    });
    toast.info("Deleted role section");
  };

  const updateRole = (id: string, patch: Partial<Omit<RoleSection, "id">>) => {
    setRoleSections((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch } : r))
    );
  };

  const clearFieldError = (field: string) => {
    setFieldErrors((previous) => {
      if (!previous[field]) return previous;
      const next = { ...previous };
      delete next[field];
      return next;
    });
  };

  const handleCompanySelect = (company: CompanyRecord) => {
    setCompanyId(getCompanyId(company));
    setCompanyName(company.name);
    setCompanyWebsite(company.website ?? "");
    clearFieldError("companyId");
  };

  const handleCreateCompany = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCompanyModalError(null);

    try {
      const company = await createCompany({
        name: newCompanyName.trim(),
        website: newCompanyWebsite.trim(),
        location: newCompanyLocation.trim(),
      }).unwrap();

      handleCompanySelect(company);
      setNewCompanyName("");
      setNewCompanyWebsite("");
      setNewCompanyLocation("");
      setIsCompanyModalOpen(false);
      toast.success("Company added and selected.");
    } catch (error) {
      const data = typeof error === "object" && error !== null && "data" in error
        ? (error as { data?: { message?: string } | string }).data
        : undefined;
      setCompanyModalError(typeof data === "string" ? data : data?.message ?? "Unable to add company. Please try again.");
    }
  };

  const openCatalogModal = (kind: CatalogModalKind) => {
    setCatalogModal(kind);
    setCatalogName("");
    setCatalogCategory("");
    setCatalogDomain("");
    setCatalogError(null);
  };

  const closeCatalogModal = () => {
    setCatalogModal(null);
    setCatalogError(null);
  };

  const handleCreateCatalogItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCatalogError(null);

    try {
      if (catalogModal === "skill") {
        await createSkill({
          skill: catalogName.trim(),
          category: catalogCategory.trim(),
          domain: catalogDomain.trim(),
        }).unwrap();
        toast.success("Skill added and available in the dropdown.");
      } else if (catalogModal === "department") {
        await createDepartment({ name: catalogName.trim() }).unwrap();
        toast.success("Department added and available in the dropdown.");
      }
      closeCatalogModal();
    } catch (error) {
      const data = typeof error === "object" && error !== null && "data" in error
        ? (error as { data?: { message?: string } | string }).data
        : undefined;
      setCatalogError(typeof data === "string" ? data : data?.message ?? "Unable to add this item. Please try again.");
    }
  };

  const handleSaveDrive = async () => {
    const validationErrors: FieldErrors = {};
    const addError = (field: string, message: string) => {
      validationErrors[field] = message;
    };

    if (!companyId) addError("companyId", "Company is required.");
    if (!driveDate) addError("driveDate", "Drive date is required.");
    if (!driveTime) addError("driveTime", "Drive time is required.");
    if (!venue.trim()) addError("venue", "Venue is required.");
    if (!registrationEndDate) addError("registrationEndDate", "Registration end date is required.");
    if (!driveStatus) addError("driveStatus", "Drive status is required.");

    roleSections.forEach((role, index) => {
      const prefix = roleSections.length > 1 ? `Role ${index + 1}: ` : "";
      const field = (name: string) => `role:${role.id}.${name}`;
      if (!role.jobRole.trim()) addError(field("jobRole"), `${prefix}Job role is required.`);
      if (!role.jobLocation.trim()) addError(field("jobLocation"), `${prefix}Job location is required.`);
      if (!role.jobType) addError(field("jobType"), `${prefix}Job type is required.`);
      if (!role.ctc.trim()) addError(field("ctc"), `${prefix}CTC / package is required.`);
      if (!role.openings || !Number.isInteger(Number(role.openings)) || Number(role.openings) <= 0) {
        addError(field("openings"), `${prefix}Enter a valid number of openings.`);
      }
      if (role.departments.length === 0) addError(field("departments"), `${prefix}Select at least one department.`);
      if (!role.batch || !Number.isFinite(Number(role.batch))) addError(field("batch"), `${prefix}Graduation year is required.`);
      if (!role.minimumCgpa || !Number.isFinite(Number(role.minimumCgpa))) addError(field("minimumCgpa"), `${prefix}Enter a valid minimum CGPA.`);
      if (!role.maximumBacklogs || !Number.isFinite(Number(role.maximumBacklogs))) addError(field("maximumBacklogs"), `${prefix}Enter maximum backlogs.`);
      if (!role.degree.trim()) addError(field("degree"), `${prefix}Degree is required.`);
      if (role.selectionProcesses.length === 0) addError(field("selectionProcesses"), `${prefix}Select at least one selection process.`);
      if (role.skills.length === 0) addError(field("skills"), `${prefix}Select at least one skill.`);
    });

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      if (isPreviewMode) setIsPreviewMode(false);
      toast.error("Please complete the highlighted fields.");
      return;
    }

    setFieldErrors({});

    const payload: CreateDriveRequest = {
      companyId,
      driveDate: `${driveDate}T00:00:00.000Z`,
      driveTime,
      venue: venue.trim(),
      registrationEndDate: `${registrationEndDate}T00:00:00.000Z`,
      status: driveStatus as DriveStatus,
      roles: roleSections.map((role) => ({
        jobRole: role.jobRole.trim(),
        jobLocation: role.jobLocation.trim(),
        jobType: role.jobType as DriveJobType,
        ctcPackage: role.ctc.trim(),
        numberOfOpenings: Number(role.openings),
        departments: role.departments,
        graduationYears: [Number(role.batch)],
        minimumCgpa: Number(role.minimumCgpa),
        maximumBacklogs: Number(role.maximumBacklogs),
        degree: role.degree,
        otherCriteria: role.otherCriteria.trim() ? [role.otherCriteria.trim()] : [],
        jobDescription: role.jobDescription.trim() || undefined,
        jdPdfUrl: null,
        selectionProcesses: role.selectionProcesses as SelectionProcess[],
        skillIds: role.skills,
      })),
    };

    try {
      await createDrive(payload).unwrap();
      toast.success("Campus Drive saved successfully!");
      navigate("/campusdrive");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save the campus drive. Please try again."));
    }
  };

  return (
    <div className="space-y-4 pb-6 text-slate-800">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={() => navigate("/campusdrive")}
          className="flex items-center text-cyan-500 hover:opacity-80 transition"
          aria-label="Home"
        >
          <Home size={15} />
        </button>
        <ChevronRight size={13} className="text-slate-300" />
        <button
          type="button"
          onClick={() => navigate("/campusdrive")}
          className="text-slate-400 hover:text-slate-600 transition"
        >
          Applications
        </button>
        <ChevronRight size={13} className="text-slate-300" />
        <span className="font-bold text-slate-800">
          {isPreviewMode ? "Preview Campus Drive" : "Company details"}
        </span>
      </div>

      {/* Page Title & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {isPreviewMode && (
            <button
              type="button"
              onClick={() => setIsPreviewMode(false)}
              className="rounded-lg p-1.5 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              aria-label="Back to editing"
              title="Back to editing"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[26px]">
              {isPreviewMode ? "Preview Campus Drive" : "Add Campus Drive"}
            </h1>
            <p className="mt-0.5 text-xs text-slate-500">
              {isPreviewMode
                ? "Review the drive details before saving."
                : "Set shared drive details once, then add role-specific requirements."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isPreviewMode ? (
            <>
              <button
                type="button"
                onClick={() => setIsPreviewMode(false)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500 bg-white px-4 py-2 text-xs font-semibold text-cyan-500 shadow-sm transition hover:bg-cyan-50"
              >
                <Pencil size={15} />
                Edit
              </button>
              <button
                type="button"
                onClick={handleSaveDrive}
                disabled={isCreatingDrive}
                className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingDrive ? "Saving..." : "Save Drive"}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsPreviewMode(true)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                <Eye size={15} />
                Preview
              </button>
              <button
                type="button"
                onClick={() => navigate("/campusdrive")}
                className="rounded-lg border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDrive}
                disabled={isCreatingDrive}
                className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isCreatingDrive ? "Saving..." : "Save Drive"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* --- PREVIEW MODE --- */}
      {isPreviewMode ? (
        <div className="space-y-4">
          {/* Section 1: Company & Drive Information Preview */}
          <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-cyan-500 sm:text-[17px]">
              Company &amp; Drive Information
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <PreviewField label="Company Name" value={companyName} />
              </div>
              <div className="lg:col-span-4">
                <PreviewField label="Company Website" value={companyWebsite} />
              </div>
              <div className="lg:col-span-4 lg:row-span-2">
                <PreviewField label="About Company" value={aboutCompany} isTextArea />
              </div>

              <div className="lg:col-span-4">
                <PreviewField label="Drive Date" value={driveDate} />
              </div>
              <div className="lg:col-span-4">
                <PreviewField label="Drive Time" value={driveTime} />
              </div>

              <div className="lg:col-span-4">
                <PreviewField label="Venue" value={venue} />
              </div>
              <div className="lg:col-span-4">
                <PreviewField label="Drive Status" value={driveStatus} />
              </div>
              <div className="lg:col-span-4">
                <PreviewField label="Registration End Date" value={registrationEndDate} />
              </div>
            </div>
          </section>

          {/* Role Sections Preview */}
          {roleSections.map((role, idx) => (
            <section key={role.id} className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6 space-y-5">
              {roleSections.length > 1 && (
                <h2 className="text-base font-bold text-cyan-500 sm:text-[17px]">
                  Role {idx + 1} Details
                </h2>
              )}

              {/* Sub-section 1: Job Role Information */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <PreviewField label="Job Role" value={role.jobRole} />
                </div>
                <div>
                  <PreviewField label="Job Type" value={role.jobType} />
                </div>
                <div>
                  <PreviewField label="CTC / Package" value={role.ctc} />
                </div>
                <div>
                  <PreviewField label="Number of Openings" value={role.openings} />
                </div>

                <div>
                  <PreviewField label="Job Location" value={role.jobLocation} />
                </div>
                <div className="md:col-span-2 lg:col-span-3">
                  <PreviewField label="Skills Required" value={formatCatalogValues(role.skills, skills)} />
                </div>
              </div>

              {/* Sub-section 2: Eligibility Criteria */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Eligibility Criteria
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <PreviewField label="Departments" value={formatCatalogValues(role.departments, departments)} />
                  </div>
                  <div>
                    <PreviewField label="Batch / Graduation Year" value={role.batch} />
                  </div>
                  <div>
                    <PreviewField label="Minimum CGPA" value={role.minimumCgpa} />
                  </div>
                  <div>
                    <PreviewField label="Maximum Backlogs" value={role.maximumBacklogs} />
                  </div>

                  <div>
                    <PreviewField label="Degree" value={role.degree} />
                  </div>
                  <div className="md:col-span-2 lg:col-span-3">
                    <PreviewField label="Other Criteria" value={role.otherCriteria} />
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Role Details & Additional Information */}
              <div className="border-t border-slate-100 pt-4">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-500">
                  Role Details &amp; Additional Information
                </h3>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <PreviewField
                      label="Job Description / JD"
                      value={role.jdFile ? `PDF File: ${role.jdFile.name} (${role.jdFile.size})` : role.jobDescription}
                      isTextArea
                    />
                  </div>
                  <div className="lg:col-span-4">
                    <PreviewField
                      label="Selection Process"
                      value={role.selectionProcesses.map((process, processIndex) => `Round ${processIndex + 1}: ${process}`).join(", ")}
                    />
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Footer Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsPreviewMode(false)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500 bg-white px-5 py-2.5 text-xs font-semibold text-cyan-500 shadow-sm transition hover:bg-cyan-50"
            >
              <Pencil size={15} />
              Edit
            </button>
            <button
              type="button"
              onClick={handleSaveDrive}
              disabled={isCreatingDrive}
              className="rounded-lg bg-cyan-500 px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isCreatingDrive ? "Saving..." : "Save Drive"}
            </button>
          </div>
        </div>
      ) : (
        /* --- EDIT MODE --- */
        <div className="space-y-4">
          {/* Card 1: Company & Drive Information */}
          <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-base font-bold text-cyan-500 sm:text-[17px]">
              Company &amp; Drive Information
            </h2>

            {/* Row 1: Company Name | Company Website | About Company (rowspan 2) */}
            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <CompanyDropdown
                  companies={companies}
                  value={companyId}
                  isLoading={companiesQuery.isLoading}
                  onSelect={handleCompanySelect}
                  error={fieldErrors.companyId}
                  onAddCompany={() => {
                    setCompanyModalError(null);
                    setIsCompanyModalOpen(true);
                  }}
                />
              </div>
              <div className="lg:col-span-4">
                <InputField label="Company Website" placeholder="https://" value={companyWebsite} onChange={setCompanyWebsite} />
              </div>
              <div className="lg:col-span-4 lg:row-span-2">
                <label className="block">
                  <FieldLabel label="About Company" />
                  <textarea
                    value={aboutCompany}
                    onChange={(e) => setAboutCompany(e.target.value)}
                    placeholder="Brief about the company"
                    className="h-[108px] w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  />
                </label>
              </div>

              {/* Row 2: Drive Date | Drive Time */}
              <div className="lg:col-span-4">
                <DateField label="Drive Date" required placeholder="Select date" value={driveDate} onChange={(value) => { setDriveDate(value); clearFieldError("driveDate"); }} error={fieldErrors.driveDate} />
              </div>
              <div className="lg:col-span-4">
                <TimeField label="Drive Time" required placeholder="Select time" value={driveTime} onChange={(value) => { setDriveTime(value); clearFieldError("driveTime"); }} error={fieldErrors.driveTime} />
              </div>

              {/* Row 3: Venue | Registration End Date | Drive Status */}
              <div className="lg:col-span-4">
                <InputField label="Venue" required placeholder="Enter venue" value={venue} onChange={(value) => { setVenue(value); clearFieldError("venue"); }} error={fieldErrors.venue} />
              </div>
              <div className="lg:col-span-4">
                <DateField label="Registration End Date" required placeholder="Select date" value={registrationEndDate} onChange={(value) => { setRegistrationEndDate(value); clearFieldError("registrationEndDate"); }} error={fieldErrors.registrationEndDate} />
              </div>
              <div className="lg:col-span-2">
                <SelectField
                  label="Drive Status"
                  required
                  placeholder="Select an option"
                  options={driveStatusOptions}
                  value={driveStatus}
                  onChange={(value) => { setDriveStatus(value); clearFieldError("driveStatus"); }}
                  error={fieldErrors.driveStatus}
                />
              </div>
            </div>
          </section>

          {/* Repeated Role Sections */}
          {roleSections.map((role, index) => (
            <RoleSectionCard
              key={role.id}
              role={role}
              index={index}
              totalCount={roleSections.length}
              onUpdate={(patch) => updateRole(role.id, patch)}
              onDelete={() => handleDeleteRole(role.id)}
              onAddAnother={handleAddRole}
              skills={skills}
              departments={departments}
              skillsLoading={skillsQuery.isLoading}
              departmentsLoading={departmentsQuery.isLoading}
              onAddSkill={() => openCatalogModal("skill")}
              onAddDepartment={() => openCatalogModal("department")}
              errors={fieldErrors}
              onClearError={clearFieldError}
            />
          ))}
        </div>
      )}

      {isCompanyModalOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Add Company</h2>
                <p className="mt-1 text-xs text-slate-500">Create a company and select it for this drive.</p>
              </div>
              <button type="button" onClick={() => setIsCompanyModalOpen(false)} aria-label="Close add company dialog" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="mt-6 space-y-4">
              {companyModalError && <p role="alert" className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-xs font-medium text-rose-600">{companyModalError}</p>}
              <InputField label="Company Name" required placeholder="Enter company name" value={newCompanyName} onChange={setNewCompanyName} />
              <InputField label="Company Website" placeholder="https://" value={newCompanyWebsite} onChange={setNewCompanyWebsite} />
              <InputField label="Location" required placeholder="Enter company location" value={newCompanyLocation} onChange={setNewCompanyLocation} />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsCompanyModalOpen(false)} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" disabled={isCreatingCompany} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
                  {isCreatingCompany && <LoaderCircle size={14} className="animate-spin" />}
                  {isCreatingCompany ? "Adding..." : "Add Company"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {catalogModal && (
        <CatalogModal
          kind={catalogModal}
          name={catalogName}
          category={catalogCategory}
          domain={catalogDomain}
          error={catalogError}
          isLoading={catalogModal === "skill" ? isCreatingSkill : isCreatingDepartment}
          onNameChange={setCatalogName}
          onCategoryChange={setCatalogCategory}
          onDomainChange={setCatalogDomain}
          onClose={closeCatalogModal}
          onSubmit={handleCreateCatalogItem}
        />
      )}
    </div>
  );
};

function CatalogModal({
  kind,
  name,
  category,
  domain,
  error,
  isLoading,
  onNameChange,
  onCategoryChange,
  onDomainChange,
  onClose,
  onSubmit,
}: {
  kind: CatalogModalKind;
  name: string;
  category: string;
  domain: string;
  error: string | null;
  isLoading: boolean;
  onNameChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onDomainChange: (value: string) => void;
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const isSkill = kind === "skill";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Add {isSkill ? "Skill" : "Department"}</h2>
            <p className="mt-1 text-xs text-slate-500">Create a new catalog item for campus drive eligibility.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close catalog dialog" className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={18} /></button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {error && <p role="alert" className="rounded-lg border border-rose-100 bg-rose-50 p-3 text-xs font-medium text-rose-600">{error}</p>}
          <InputField label={isSkill ? "Skill" : "Department Name"} required placeholder={isSkill ? "Enter skill name" : "Enter department name"} value={name} onChange={onNameChange} />
          {isSkill && <InputField label="Category" required placeholder="Enter skill category" value={category} onChange={onCategoryChange} />}
          {isSkill && <InputField label="Domain" required placeholder="Enter skill domain" value={domain} onChange={onDomainChange} />}
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            <button type="submit" disabled={isLoading} className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-xs font-semibold text-white hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60">
              {isLoading && <LoaderCircle size={14} className="animate-spin" />}
              {isLoading ? "Adding..." : `Add ${isSkill ? "Skill" : "Department"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* --- Helper for Read-Only Preview Display --- */
function PreviewField({
  label,
  value,
  isTextArea = false,
}: {
  label: string;
  value?: string;
  isTextArea?: boolean;
}) {
  const displayVal = value && value.trim() ? value : "-";
  return (
    <div className="w-full">
      <span className="mb-1.5 block text-xs font-bold text-slate-800">
        {label}
      </span>
      <div
        className={`w-full rounded-lg border border-slate-200/80 bg-slate-50/80 px-3.5 py-2.5 text-xs text-slate-700 ${
          isTextArea ? "min-h-[108px] whitespace-pre-wrap" : "min-h-[40px] flex items-center"
        }`}
      >
        {displayVal}
      </div>
    </div>
  );
}

/* --- RoleSectionCard --- */
function RoleSectionCard({
  role,
  index,
  totalCount,
  onUpdate,
  onDelete,
  onAddAnother,
  skills,
  departments,
  skillsLoading,
  departmentsLoading,
  onAddSkill,
  onAddDepartment,
  errors,
  onClearError,
}: {
  role: RoleSection;
  index: number;
  totalCount: number;
  onUpdate: (patch: Partial<Omit<RoleSection, "id">>) => void;
  onDelete: () => void;
  onAddAnother: () => void;
  skills: SkillRecord[];
  departments: DepartmentRecord[];
  skillsLoading: boolean;
  departmentsLoading: boolean;
  onAddSkill: () => void;
  onAddDepartment: () => void;
  errors: FieldErrors;
  onClearError: (field: string) => void;
}) {
  const handleJdFileChange = (file: File | undefined) => {
    const isPdf = file?.type === "application/pdf" || file?.name.toLowerCase().endsWith(".pdf");
    if (!file || !isPdf) return;
    const jdFile: JdFile = {
      name: file.name,
      size: `${Math.max(file.size / 1024, 1).toFixed(0)} KB`,
      url: URL.createObjectURL(file),
    };
    onUpdate({ jdFile });
  };

  const removeJdFile = () => {
    if (role.jdFile) URL.revokeObjectURL(role.jdFile.url);
    onUpdate({ jdFile: null });
  };

  const errorKey = (field: string) => `role:${role.id}.${field}`;
  const updateField = (patch: Partial<Omit<RoleSection, "id">>, field: string) => {
    onUpdate(patch);
    onClearError(errorKey(field));
  };

  return (
    <section className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-cyan-500 sm:text-[17px]">
            Role {totalCount > 1 ? `${index + 1}` : ""} Details
          </h2>
          <p className="mt-0.5 text-[10px] text-slate-400">
            Job role information, eligibility criteria &amp; role details
          </p>
        </div>
        <div className="flex items-center gap-2">
          {totalCount > 1 && (
            <button
              type="button"
              onClick={onDelete}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-rose-600 shadow-sm transition hover:bg-rose-50 hover:border-rose-300"
            >
              <Trash2 size={13} />
              Delete role
            </button>
          )}
          <button
            type="button"
            onClick={onAddAnother}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500 bg-white px-3 py-1.5 text-xs font-semibold text-cyan-500 shadow-sm transition hover:bg-cyan-50"
          >
            <Plus size={14} />
            Add another role
          </button>
        </div>
      </div>

      {/* Sub-section A: Job Role Information */}
      <div className="mt-5">
        <h3 className="mb-3 text-sm font-bold text-cyan-500">Job Role Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <InputField
              label="Job Role" required placeholder="Enter job role"
              value={role.jobRole} onChange={(v) => updateField({ jobRole: v }, "jobRole")} error={errors[errorKey("jobRole")]}
            />
          </div>
          <div>
            <InputField
              label="Job Location" required placeholder="Enter job location"
              value={role.jobLocation} onChange={(v) => updateField({ jobLocation: v }, "jobLocation")} error={errors[errorKey("jobLocation")]}
            />
          </div>
          <div>
            <SelectField
              label="Job Type" required placeholder="Select job type"
              options={jobTypeOptions} value={role.jobType} onChange={(v) => updateField({ jobType: v }, "jobType")} error={errors[errorKey("jobType")]}
            />
          </div>
          <div>
            <InputField
              label="CTC / Package" required placeholder="Enter ctc / package"
              value={role.ctc} onChange={(v) => updateField({ ctc: v }, "ctc")} error={errors[errorKey("ctc")]}
            />
          </div>
          <div>
            <SkillsPicker
              label="Skills Required"
              required
              value={role.skills}
              onChange={(v) => updateField({ skills: v }, "skills")}
              options={skills}
              isLoading={skillsLoading}
              onAddOption={onAddSkill}
              addLabel="Add skill"
              error={errors[errorKey("skills")]}
            />
          </div>
          <div>
            <InputField
              label="Number of Openings" required placeholder="Enter number of openings"
              value={role.openings} onChange={(v) => updateField({ openings: v }, "openings")} error={errors[errorKey("openings")]}
            />
          </div>
        </div>
      </div>

      {/* Sub-section B: Eligibility Criteria */}
      <div className="mt-5 border-t border-slate-100 pt-5">
        <h3 className="mb-3 text-sm font-bold text-cyan-500">Eligibility Criteria</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <SkillsPicker
              label="Departments"
              value={role.departments}
              onChange={(v) => updateField({ departments: v }, "departments")}
              options={departments}
              isLoading={departmentsLoading}
              onAddOption={onAddDepartment}
              addLabel="Add department"
              required
              error={errors[errorKey("departments")]}
            />
          </div>

          <div>
            <SelectField
              label="Batch / Graduation Year" required placeholder="Select batch / graduation year"
              options={batchOptions} value={role.batch} onChange={(v) => updateField({ batch: v }, "batch")} error={errors[errorKey("batch")]}
            />
          </div>
          <div>
            <InputField
              label="Minimum CGPA" required placeholder="Enter minimum cgpa"
              value={role.minimumCgpa} onChange={(v) => updateField({ minimumCgpa: v }, "minimumCgpa")} error={errors[errorKey("minimumCgpa")]}
            />
          </div>
          <div>
            <InputField
              label="Maximum Backlogs" required placeholder="e.g. 0"
              value={role.maximumBacklogs} onChange={(v) => updateField({ maximumBacklogs: v }, "maximumBacklogs")} error={errors[errorKey("maximumBacklogs")]}
            />
          </div>
          <div>
            <InputField
              label="Degree" required placeholder="Enter degree"
              value={role.degree} onChange={(v) => updateField({ degree: v }, "degree")} error={errors[errorKey("degree")]}
            />
          </div>
          <div>
            <InputField
              label="Other Criteria" placeholder="Add other criteria"
              value={role.otherCriteria} onChange={(v) => onUpdate({ otherCriteria: v })}
            />
          </div>
        </div>
      </div>

      {/* Sub-section C: Role Details & Additional Information */}
      <div className="mt-5 border-t border-slate-100 pt-5">
        <h3 className="mb-3 text-sm font-bold text-cyan-500">Role Details &amp; Additional Information</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <FieldLabel label="Job Description / JD" />
            <JobDescriptionEditor
              value={role.jobDescription}
              onChange={(v) => onUpdate({ jobDescription: v })}
              file={role.jdFile}
              onFileChange={handleJdFileChange}
              onRemoveFile={removeJdFile}
            />
          </div>
          <div className="lg:col-span-4">
            <SelectionProcessPicker
              label="Selection Process"
              required
              value={role.selectionProcesses}
              onChange={(v) => updateField({ selectionProcesses: v }, "selectionProcesses")}
              error={errors[errorKey("selectionProcesses")]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Shared Field Components --- */

function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <span className="mb-1.5 block text-xs font-bold text-slate-800">
      {label}
      {required && <span className="ml-1 font-bold text-red-500">*</span>}
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-[11px] font-medium leading-4 text-red-500">{message}</p>;
}

function InputField({
  label, placeholder, required = false, value, onChange, error,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
  error?: string;
}) {
  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <input
        type="text"
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
      />
      <FieldError message={error} />
    </label>
  );
}

function CompanyDropdown({
  companies,
  value,
  isLoading,
  onSelect,
  onAddCompany,
  error,
}: {
  companies: CompanyRecord[];
  value: string;
  isLoading: boolean;
  onSelect: (company: CompanyRecord) => void;
  onAddCompany: () => void;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCompany = companies.find((company) => getCompanyId(company) === value);
  const filteredCompanies = companies.filter((company) => {
    const query = searchQuery.trim().toLowerCase();
    return !query || [company.name, company.location ?? ""].some((field) => field.toLowerCase().includes(query));
  });

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const openDropdown = () => {
    setSearchQuery("");
    setIsOpen((open) => !open);
  };

  const handleAddCompany = () => {
    setIsOpen(false);
    setSearchQuery("");
    onAddCompany();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <FieldLabel label="Company Name" required />
      <button
        type="button"
        onClick={openDropdown}
        className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-left text-xs outline-none transition ${isOpen ? "border-cyan-500 ring-2 ring-cyan-100" : "border-slate-200 hover:border-slate-300"}`}
      >
        <span className={`truncate ${selectedCompany ? "font-medium text-slate-700" : "text-slate-400"}`}>
          {selectedCompany?.name ?? (isLoading ? "Loading companies..." : "Select a company")}
        </span>
        <ChevronDown size={14} className={`ml-2 shrink-0 text-slate-500 transition-transform ${isOpen ? "rotate-180 text-cyan-500" : ""}`} />
      </button>
      <FieldError message={error} />

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 p-2">
            <div className="relative">
              <Search size={14} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                autoFocus
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search companies..."
                className="h-8 w-full rounded-md border border-slate-200 pl-8 pr-2 text-xs text-slate-700 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100"
              />
            </div>
          </div>

          <div className="max-h-52 overflow-y-auto p-1.5">
            {isLoading ? (
              <p className="px-2.5 py-3 text-xs text-slate-400">Loading companies...</p>
            ) : filteredCompanies.length === 0 ? (
              <p className="px-2.5 py-3 text-xs text-slate-400">No companies found.</p>
            ) : (
              filteredCompanies.map((company) => {
                const companyId = getCompanyId(company);
                return (
                  <button
                    key={companyId || company.name}
                    type="button"
                    onClick={() => {
                      onSelect(company);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className={`flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left transition ${companyId === value ? "bg-cyan-50 text-cyan-700" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold">{company.name}</span>
                      {company.location && <span className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400"><MapPin size={10} />{company.location}</span>}
                    </span>
                    {companyId === value && <Check size={14} className="shrink-0 text-cyan-500" />}
                  </button>
                );
              })
            )}
          </div>

          <button type="button" onClick={handleAddCompany} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50">
            <Plus size={14} /> Add company
          </button>
        </div>
      )}
    </div>
  );
}

function SelectField({
  label, options, required = false, value, onChange, placeholder = "Select an option", error,
}: {
  label: string; options: string[]; required?: boolean;
  value?: string; onChange?: (value: string) => void; placeholder?: string;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex h-10 w-full items-center justify-between rounded-lg border bg-white px-3 text-xs outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 ${
            isOpen
              ? "border-cyan-500 ring-2 ring-cyan-100"
              : "border-slate-200 hover:border-slate-300"
          }`}
        >
          <span className={`truncate ${!value ? "text-slate-400" : "font-medium text-slate-700"}`}>
            {value || placeholder}
          </span>
          <ChevronDown
            size={14}
            className={`pointer-events-none ml-1 shrink-0 text-slate-500 transition-transform duration-200 ${
              isOpen ? "rotate-180 text-cyan-500" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-56 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {options.map((opt) => {
              const isSelected = opt === value;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange?.(opt);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                    isSelected
                      ? "bg-cyan-50 font-bold text-cyan-600"
                      : "font-medium text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="truncate">{opt}</span>
                  {isSelected && <Check size={13} className="ml-2 shrink-0 text-cyan-500" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

function DateField({
  label, placeholder, required = false, value, onChange, error,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = inputRef.current;
    if (!input) return;
    input.type = "date";
    input.showPicker?.();
  };

  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <CalendarDays size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          onFocus={(e) => { e.target.type = "date"; }}
          onClick={openDatePicker}
          onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>
      <FieldError message={error} />
    </label>
  );
}

function TimeField({
  label, placeholder, required = false, value, onChange, error,
}: {
  label: string; placeholder: string; required?: boolean;
  value?: string; onChange?: (value: string) => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const openTimePicker = () => {
    const input = inputRef.current;
    if (!input) return;
    input.type = "time";
    input.showPicker?.();
  };

  return (
    <label className="block">
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <Clock3 size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          type="text"
          onFocus={(e) => { e.target.type = "time"; }}
          onClick={openTimePicker}
          onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
        />
      </div>
      <FieldError message={error} />
    </label>
  );
}

function SkillsPicker({
  label,
  value,
  onChange,
  options,
  isLoading,
  onAddOption,
  addLabel,
  required = false,
  error,
}: {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
  options: (SkillRecord | DepartmentRecord)[];
  isLoading: boolean;
  onAddOption: () => void;
  addLabel: string;
  required?: boolean;
  error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredOptions = options.filter((option) => {
    const optionId = getCatalogRecordId(option);
    return optionId && getCatalogRecordLabel(option).toLowerCase().includes(searchQuery.trim().toLowerCase());
  });
  const selectedLabels = value.map((selectedId) => {
    const option = options.find((item) => getCatalogRecordId(item) === selectedId);
    return option ? getCatalogRecordLabel(option) : selectedId;
  });
  const toggle = (option: SkillRecord | DepartmentRecord) => {
    const optionId = getCatalogRecordId(option);
    onChange(value.includes(optionId) ? value.filter((item) => item !== optionId) : [...value, optionId]);
  };
  const handleAddOption = () => {
    setIsOpen(false);
    setSearchQuery("");
    onAddOption();
  };

  return (
    <div ref={ref}>
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            setIsOpen((p) => !p);
          }}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-cyan-500"
        >
          {value.length === 0
            ? <span className="text-slate-400">{isLoading ? "Loading..." : `Select ${label.toLowerCase()}`}</span>
            : <span className="truncate font-medium text-slate-700">{selectedLabels.join(", ")}</span>}
          <ChevronDown size={14} className="pointer-events-none ml-1 shrink-0 text-slate-500" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="border-b border-slate-100 p-2">
              <div className="relative">
                <Search size={13} className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  autoFocus
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={`Search ${label.toLowerCase()}...`}
                  className="h-8 w-full rounded-md border border-slate-200 pl-8 pr-2 text-xs text-slate-700 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-100"
                />
              </div>
            </div>
            <div className="max-h-52 overflow-y-auto p-1.5">
            {isLoading ? <p className="px-2.5 py-3 text-xs text-slate-400">Loading...</p> : filteredOptions.length === 0 ? <p className="px-2.5 py-3 text-xs text-slate-400">No options found.</p> : filteredOptions.map((option) => {
              const name = getCatalogRecordLabel(option);
              const optionId = getCatalogRecordId(option);
              const sel = value.includes(optionId);
              return (
                <button key={optionId} type="button" onClick={() => toggle(option)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-cyan-50"
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-300"}`}>
                    {sel && <Check size={11} />}
                  </span>
                  {name}
                </button>
              );
            })}
            </div>
            <button type="button" onClick={handleAddOption} className="flex w-full items-center gap-2 border-t border-slate-100 px-3 py-2.5 text-left text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50">
              <Plus size={14} /> {addLabel}
            </button>
          </div>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}

function SelectionProcessPicker({ label, value, onChange, required = false, error }: {
  label: string; value: string[]; onChange: (val: string[]) => void; required?: boolean; error?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggle = (p: string) =>
    onChange(value.includes(p) ? value.filter((x) => x !== p) : [...value, p]);

  return (
    <div ref={ref}>
      <FieldLabel label={label} required={required} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 text-xs outline-none transition focus:border-cyan-500"
        >
          {value.length === 0
            ? <span className="text-slate-400">Select selection processes</span>
            : <span className="truncate font-medium text-slate-700">
              {value.map((process, index) => `Round ${index + 1}: ${process}`).join(" · ")}
            </span>}
          <ChevronDown size={14} className="pointer-events-none ml-1 shrink-0 text-slate-500" />
        </button>
        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-52 overflow-y-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">
            {selectionProcessOptions.map((p) => {
              const sel = value.includes(p);
              return (
                <button key={p} type="button" onClick={() => toggle(p)}
                  className="flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium text-slate-700 transition hover:bg-cyan-50"
                >
                  <span className={`flex h-4 w-4 items-center justify-center rounded border ${sel ? "border-cyan-500 bg-cyan-500 text-white" : "border-slate-300"}`}>
                    {sel && <Check size={11} />}
                  </span>
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="text-[10px] text-slate-400">{sel ? `Round ${value.indexOf(p) + 1}` : ""}</span>
                    {p}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {value.length > 0 && (
        <div className="mt-2 space-y-1.5 rounded-lg border border-cyan-100 bg-cyan-50/50 p-2">
          {value.map((process, index) => (
            <div key={`${process}-${index}`} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-cyan-500 px-1.5 text-[10px] text-white">{index + 1}</span>
              <span>Round {index + 1}: {process}</span>
            </div>
          ))}
        </div>
      )}
      <FieldError message={error} />
    </div>
  );
}

function JobDescriptionEditor({
  value, onChange, file, onFileChange, onRemoveFile,
}: {
  value: string;
  onChange: (v: string) => void;
  file: JdFile | null;
  onFileChange: (f: File | undefined) => void;
  onRemoveFile: () => void;
}) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const showPreview = Boolean(file && previewUrl === file.url);

  return (
    <div>
      {file ? (
        <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 border-b border-slate-200 bg-white px-3 py-2.5">
            <FileText size={16} className="shrink-0 text-rose-500" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-slate-800">{file.name}</p>
              <p className="text-[10px] text-slate-500">{file.size} · PDF</p>
            </div>
            <button type="button"
              onClick={() => setPreviewUrl(showPreview ? null : file.url)}
              className={`rounded p-1 transition ${showPreview ? "bg-cyan-50 text-cyan-500" : "text-slate-400 hover:bg-cyan-50 hover:text-cyan-500"}`}
            ><Eye size={15} /></button>
            <button type="button" onClick={onRemoveFile}
              className="rounded p-1 text-slate-400 transition hover:bg-rose-50 hover:text-rose-500"
            ><X size={15} /></button>
          </div>
          <p className="px-3 py-2 text-xs text-slate-500">Using uploaded PDF. Remove to enter JD as text.</p>
        </div>
      ) : (
        <>
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter job description, responsibilities, skills required, etc."
            className="h-[92px] w-full resize-none rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
          <div className="mt-2.5 flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-cyan-500 bg-white px-3.5 py-1.5 text-xs font-semibold text-cyan-500 shadow-sm transition hover:bg-cyan-50">
              <Upload size={14} />
              Upload JD PDF
              <input type="file" accept="application/pdf,.pdf" className="sr-only"
                onChange={(e) => { onFileChange(e.target.files?.[0]); e.currentTarget.value = ""; }}
              />
            </label>
            <span className="text-xs text-slate-500">Choose either typed text or one PDF upload.</span>
          </div>
        </>
      )}

      {showPreview && file && (
        <div role="dialog" aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setPreviewUrl(null)}
        >
          <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-3">
              <FileText size={16} className="shrink-0 text-rose-500" />
              <p className="min-w-0 flex-1 truncate text-sm font-semibold text-slate-800">{file.name}</p>
              <button type="button" onClick={() => setPreviewUrl(null)}
                className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              ><X size={18} /></button>
            </div>
            <iframe src={file.url} title={`Preview of ${file.name}`} className="min-h-[65vh] w-full bg-slate-100" />
          </div>
        </div>
      )}
    </div>
  );
}
