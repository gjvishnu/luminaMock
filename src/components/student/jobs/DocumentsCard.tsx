import { DetailCard } from "../shared/DetailCard";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export function DocumentsCard() {
  const documents = [
    { name: "Resume (PDF)", uploaded: true },
    { name: "Academic Transcripts", uploaded: true },
    { name: "Government ID Proof", uploaded: true },
    { name: "Passport Size Photo", uploaded: false },
  ];

  return (
    <DetailCard>
      <h2 className="text-sm font-bold text-slate-800 sm:text-base">
        Documents Required
      </h2>
      <div className="mt-4 space-y-3">
        {documents.map((document) => (
          <div
            key={document.name}
            className="flex items-center gap-2 text-[11px] text-slate-700"
          >
            <span
              className={
                document.uploaded ? "text-emerald-500" : "text-rose-500"
              }
            >
              {document.uploaded ? (
                <CheckCircle2 size={15} />
              ) : (
                <AlertTriangle size={15} />
              )}
            </span>
            <span className="min-w-0 flex-1">{document.name}</span>
            <span
              className={`text-[10px] font-semibold ${document.uploaded ? "text-emerald-500" : "text-rose-500"}`}
            >
              {document.uploaded ? "Uploaded" : "Not Uploaded"}
            </span>
          </div>
        ))}
      </div>
    </DetailCard>
  );
}
