import { useRef, useState } from "react";
import { UserRound } from "lucide-react";
import { toast } from "material-react-toastify";
import {
  type DegreeRecord,
  type DepartmentRecord,
  type StudentProfileRecord,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} from "../../../redux/api";
import { FieldError, InputField, SearchableDropdown } from "../../formFields";
import { getApiErrorMessage, getChangedFields } from "../../formHelpers";
import { CustomSelect } from "../shared/CustomSelect";
import { formatSemester } from "../shared/helpers";
import { ProfileSection } from "../shared/ProfileSection";
import { SectionSaveFooter } from "./SectionSaveFooter";

const batchOptions = ["2024", "2025", "2026", "2027", "2028"];
const semesterOptions = Array.from({ length: 8 }, (_, index) => formatSemester(index + 1));

type Fields = {
  name: string;
  registrationNumber: string;
  departmentId: string;
  degreeId: string;
  batch: string;
  semester: string;
  cgpa: string;
  backlogs: string;
  phone: string;
  dateOfBirth: string;
  location: string;
};

// CGPA and backlogs are optional, so they are validated separately.
const fieldMessages: Record<Exclude<keyof Fields, "cgpa" | "backlogs">, string> = {
  name: "Student name is required.",
  registrationNumber: "Registration number is required.",
  departmentId: "Department is required.",
  degreeId: "Program is required.",
  batch: "Batch is required.",
  semester: "Semester is required.",
  phone: "Phone is required.",
  dateOfBirth: "Date of birth is required.",
  location: "Location is required.",
};

function toFields(student: StudentProfileRecord | null): Fields {
  return {
    name: student?.name ?? "",
    registrationNumber: student?.registrationNumber ?? "",
    departmentId: student?.departmentId ?? "",
    degreeId: student?.degreeId ?? "",
    batch: student?.batch ? String(student.batch) : "",
    semester: student?.semester ? formatSemester(student.semester) : "",
    cgpa: student?.cgpa == null ? "" : String(student.cgpa),
    backlogs: student?.backlogs == null ? "" : String(student.backlogs),
    phone: student?.phone ?? "",
    dateOfBirth: student?.dateOfBirth?.slice(0, 10) ?? "",
    location: student?.location ?? "",
  };
}

function toBody(fields: Fields) {
  return {
    name: fields.name.trim(),
    registrationNumber: fields.registrationNumber.trim(),
    departmentId: fields.departmentId,
    degreeId: fields.degreeId,
    batch: Number(fields.batch),
    semester: parseInt(fields.semester, 10),
    cgpa: fields.cgpa.trim() ? Number(fields.cgpa) : null,
    backlogs: fields.backlogs.trim() ? Number(fields.backlogs) : null,
    phone: fields.phone.trim(),
    dateOfBirth: fields.dateOfBirth,
    location: fields.location.trim(),
  };
}

// Backend accepts a number from 0 to 10 with at most 2 decimal places.
function getCgpaError(value: string) {
  const cgpa = value.trim();
  if (!cgpa) return undefined;
  if (!/^\d{1,2}(\.\d{1,2})?$/.test(cgpa) || Number(cgpa) > 10) return "Enter a CGPA between 0 and 10 (up to 2 decimals).";
  return undefined;
}

export function BasicDetailsEditor({
  userUuid,
  email,
  student,
  studentId,
  departments,
  degrees,
  onCreated,
}: {
  userUuid: string;
  email: string;
  student: StudentProfileRecord | null;
  studentId: string | null;
  departments: DepartmentRecord[];
  degrees: DegreeRecord[];
  onCreated: (studentId: string) => void;
}) {
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const [fields, setFields] = useState(() => toFields(student));
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const savedFieldsRef = useRef(fields);

  const setField = (field: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleCancel = () => {
    setFields(savedFieldsRef.current);
    setErrors({});
  };

  const handleSave = async () => {
    const missing = (Object.keys(fieldMessages) as (keyof typeof fieldMessages)[]).filter((field) => !fields[field].trim());
    const nextErrors: Partial<Record<keyof Fields, string>> = Object.fromEntries(missing.map((field) => [field, fieldMessages[field]]));
    const cgpaError = getCgpaError(fields.cgpa);
    if (cgpaError) nextErrors.cgpa = cgpaError;
    // Backend accepts a whole number of 0 or more; the input already strips non-digits.
    if (fields.backlogs.trim() && !/^\d+$/.test(fields.backlogs.trim())) nextErrors.backlogs = "Enter backlogs as a whole number (0 or more).";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please complete the highlighted fields.");
      return;
    }

    try {
      const body = toBody(fields);

      if (studentId) {
        // Only changed fields, so an old inactive degree is not rejected on an unrelated edit.
        const changes = getChangedFields(body, toBody(savedFieldsRef.current));
        if (Object.keys(changes).length === 0) {
          toast.info("No changes to save.");
          return;
        }
        await updateStudent({ studentId, body: { userUuid, ...changes } }).unwrap();
      } else {
        const created = await createStudent({ userUuid, ...body }).unwrap();
        onCreated(created.id);
      }

      savedFieldsRef.current = fields;
      toast.success("Basic details saved.");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to save your basic details. Please try again."));
    }
  };

  const departmentOptions = departments
    .filter((department) => department.status !== "INACTIVE")
    .map((department) => ({ value: String(department.id), label: department.name }));
  const degreeOptions = degrees
    .filter((degree) => degree.status !== "INACTIVE")
    .map((degree) => ({ value: String(degree.id), label: degree.degreeName }));

  return (
    <ProfileSection title="Basic Details" icon={UserRound}>
      <div className="grid gap-x-4 gap-y-3 text-xs sm:grid-cols-2">
        <div className="sm:col-span-2">
          <InputField label="Student Name" required placeholder="Enter your full name" value={fields.name} maxLength={150} onChange={(value) => setField("name", value)} error={errors.name} />
        </div>

        <div>
          <InputField
            label="Registration Number"
            required
            placeholder="Enter registration number"
            value={fields.registrationNumber}
            disabled={Boolean(studentId)}
            maxLength={50}
            onChange={(value) => setField("registrationNumber", value)}
            error={errors.registrationNumber}
          />
        </div>

        <SearchableDropdown
          label="Department"
          noun="departments"
          placeholder="Select a department"
          options={departmentOptions}
          value={fields.departmentId}
          selectedLabel={departments.find((department) => department.id === fields.departmentId)?.name ?? ""}
          isLoading={false}
          onSelect={(value) => setField("departmentId", value)}
          error={errors.departmentId}
        />

        <SearchableDropdown
          label="Program"
          noun="programs"
          placeholder="Select a program"
          options={degreeOptions}
          value={fields.degreeId}
          selectedLabel={degrees.find((degree) => degree.id === fields.degreeId)?.degreeName ?? ""}
          isLoading={false}
          onSelect={(value) => setField("degreeId", value)}
          error={errors.degreeId}
        />

        <div>
          <span className="mb-1.5 block text-xs font-bold text-slate-800">Batch / Semester <span className="ml-1 font-bold text-red-500">*</span></span>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <CustomSelect value={fields.batch} onChange={(value) => setField("batch", value)} options={batchOptions} placeholder="Batch" />
              <FieldError message={errors.batch} />
            </div>
            <div>
              <CustomSelect value={fields.semester} onChange={(value) => setField("semester", value)} options={semesterOptions} placeholder="Semester" />
              <FieldError message={errors.semester} />
            </div>
          </div>
        </div>

        <div>
          <InputField
            label="CGPA"
            placeholder="e.g. 8.75"
            value={fields.cgpa}
            maxLength={5}
            onChange={(value) => setField("cgpa", value.replace(/[^\d.]/g, ""))}
            error={errors.cgpa}
          />
        </div>

        <div>
          <InputField
            label="Backlogs"
            placeholder="e.g. 0"
            value={fields.backlogs}
            maxLength={2}
            onChange={(value) => setField("backlogs", value.replace(/\D/g, ""))}
            error={errors.backlogs}
          />
        </div>

        <div>
          <InputField label="Email" required placeholder="" value={email} disabled />
        </div>

        <div>
          <InputField label="Phone" required placeholder="Enter phone number" value={fields.phone} maxLength={20} onChange={(value) => setField("phone", value)} error={errors.phone} />
        </div>

        <div>
          <InputField label="Date of Birth" required type="date" placeholder="" value={fields.dateOfBirth} onChange={(value) => setField("dateOfBirth", value)} error={errors.dateOfBirth} />
        </div>

        <div>
          <InputField label="Location" required placeholder="Enter location" value={fields.location} maxLength={150} onChange={(value) => setField("location", value)} error={errors.location} />
        </div>
      </div>

      <SectionSaveFooter label="Save Basic Details" isSaving={isCreating || isUpdating} onSave={handleSave} onCancel={handleCancel} />
    </ProfileSection>
  );
}
