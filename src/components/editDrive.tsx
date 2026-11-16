import { LoaderCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { AddDrive } from "./addDrive";
import { useGetDriveQuery } from "../redux/api";

export function EditDrive() {
  const navigate = useNavigate();
  const { driveId = "" } = useParams();
  const { data: drive, error, isFetching, refetch } = useGetDriveQuery(driveId, {
    refetchOnMountOrArgChange: true,
  });

  if (isFetching) {
    return (
      <div className="flex min-h-64 items-center justify-center gap-2 text-sm text-slate-500">
        <LoaderCircle size={16} className="animate-spin" />
        Loading drive details...
      </div>
    );
  }

  if (error || !drive) {
    return (
      <div className="px-4 py-12 text-center">
        <p className="text-sm font-semibold text-rose-600">Unable to load this campus drive.</p>
        <div className="mt-3 flex justify-center gap-2">
          <button type="button" onClick={() => navigate("/campusdrive")} className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50">Back to Campus Drives</button>
          <button type="button" onClick={() => void refetch()} className="rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-600">Try again</button>
        </div>
      </div>
    );
  }

  return <AddDrive key={driveId} drive={drive} />;
}
