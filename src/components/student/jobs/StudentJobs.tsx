import { JobFilter } from "../shared/JobFilter";
import { jobFilterOptions, jobListings } from "../shared/data";
import { JobMobileCard } from "./JobMobileCard";
import { JobTableRow } from "./JobTableRow";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function StudentJobs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    company: "All Companies",
    role: "All Roles",
    location: "All Locations",
    type: "All Job Types",
    sort: "Sort by: Newest",
  });
  const [currentPage, setCurrentPage] = useState(1);

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters((current) => ({ ...current, [key]: value }));
  };

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          <JobFilter
            options={jobFilterOptions.company}
            value={filters.company}
            onChange={(value) => updateFilter("company", value)}
          />
          <JobFilter
            options={jobFilterOptions.role}
            value={filters.role}
            onChange={(value) => updateFilter("role", value)}
          />
          <JobFilter
            options={jobFilterOptions.location}
            value={filters.location}
            onChange={(value) => updateFilter("location", value)}
          />
          <JobFilter
            options={jobFilterOptions.type}
            value={filters.type}
            onChange={(value) => updateFilter("type", value)}
          />
        </div>
        <JobFilter
          className="w-full sm:w-44 lg:w-44"
          options={["Sort by: Newest", "Sort by: Match", "Sort by: Deadline"]}
          value={filters.sort}
          onChange={(value) => updateFilter("sort", value)}
        />
      </div>

      <div className="hidden overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
        <div
          role="table"
          aria-label="Available jobs"
          className="min-w-[1050px]"
        >
          <div
            role="row"
            className="grid grid-cols-[1.45fr_1.75fr_1fr_.75fr_1fr_.7fr_24px] gap-4 rounded-t-xl bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
          >
            <span>Company</span>
            <span>Job Role</span>
            <span>Location</span>
            <span>CTC</span>
            <span>Apply By</span>
            <span>Match</span>
            <span />
          </div>
          {jobListings.map((job) => (
            <JobTableRow
              key={job.company}
              job={job}
              onOpen={() => navigate(`/jobs/${job.id}`)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3 lg:hidden">
        {jobListings.map((job) => (
          <JobMobileCard
            key={job.company}
            job={job}
            onOpen={() => navigate(`/jobs/${job.id}`)}
          />
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <span>Showing 1 to 8 of 24 jobs</span>
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === page ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}
            >
              {page}
            </button>
          ))}
          <span className="px-1 text-slate-400">...</span>
          <button
            type="button"
            onClick={() => setCurrentPage(6)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 6 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600 hover:border-cyan-200"}`}
          >
            6
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, 6))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
