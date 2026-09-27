import type { ApplicationStatus } from "../shared/types";
import { applicationRows, applicationSummary, applicationTabs } from "../shared/data";
import { ApplicationMobileCard } from "./ApplicationMobileCard";
import { ApplicationTableRow } from "./ApplicationTableRow";
import { ChevronRight, Filter, Search } from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

/**
 * ApplicationsBoard renders the applications LIST experience: summary cards,
 * status tabs, search and the table/mobile cards. It is shared by the
 * student's own "My Applications" page and the TPO's per-student application
 * view so both stay visually identical.
 *
 * The status/search filters live in the URL (`?status=…&search=…`) so that
 * coming back from the detail route lands on the same filtered list.
 * "View Details"/"View Offer" navigate to the detail route (see
 * ApplicationDetailRoute) instead of swapping the view in place.
 */
export function ApplicationsBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const statusParam = searchParams.get("status");
  const activeTab: ApplicationStatus | "All" = applicationTabs.some(
    (tab) => tab.status === statusParam,
  )
    ? (statusParam as ApplicationStatus)
    : "All";
  const search = searchParams.get("search") ?? "";
  const activeTabDetails = applicationTabs.find((tab) =>
    activeTab === "All" ? !tab.status : tab.status === activeTab,
  );
  const filteredApplications = applicationRows.filter((application) => {
    const matchesTab = activeTab === "All" || application.status === activeTab;
    const searchText =
      `${application.companyName} ${application.role}`.toLowerCase();
    return matchesTab && searchText.includes(search.toLowerCase());
  });
  const totalForTab = activeTabDetails?.count ?? filteredApplications.length;

  const applyFilters = (
    status: ApplicationStatus | "All",
    nextSearch: string,
  ) => {
    const params = new URLSearchParams(searchParams);
    if (status === "All") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    if (nextSearch) {
      params.set("search", nextSearch);
    } else {
      params.delete("search");
    }
    setSearchParams(params, { replace: true });
    setCurrentPage(1);
  };

  // Navigates from the list to the detail route. Building the path from the
  // current pathname serves both audiences: "/applications" -> "/applications/:id"
  // and "/students/:id/applications" -> "/students/:id/applications/:id".
  // `state.from` lets the detail route send the user back to this exact
  // filtered list (filters live in the query string).
  const openApplication = (applicationId: string) =>
    navigate(`${location.pathname}/${applicationId}`, {
      state: { from: `${location.pathname}${location.search}` },
    });

  return (
    <div className="space-y-4 pb-5 text-slate-800">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {applicationSummary.map((summary) => {
          const Icon = summary.icon;

          return (
            <section
              key={summary.label}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${summary.tone}`}
              >
                <Icon size={22} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-medium text-slate-500 sm:text-xs">
                  {summary.label}
                </p>
                <p className="mt-1 text-2xl font-bold leading-none text-slate-800">
                  {summary.value}
                </p>
              </div>
            </section>
          );
        })}
      </div>

      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between lg:p-5">
          <div className="flex min-w-0 flex-1 overflow-x-auto">
            {applicationTabs.map((tab) => {
              const tabKey = tab.status ?? "All";
              const active = activeTab === tabKey;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => applyFilters(tabKey, search)}
                  className={`shrink-0 border-b-2 px-3 py-3 text-xs font-semibold transition sm:px-4 ${active ? "border-cyan-500 text-cyan-600" : "border-transparent text-slate-600 hover:text-cyan-600"}`}
                >
                  {tab.label} ({tab.count})
                </button>
              );
            })}
          </div>
          <div className="flex gap-2">
            <label className="relative min-w-0 flex-1 sm:w-72 sm:flex-none">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                value={search}
                onChange={(event) =>
                  applyFilters(activeTab, event.target.value)
                }
                placeholder="Search by company or role..."
                className="h-10 w-full rounded-md border border-slate-200 pl-9 pr-3 text-xs text-slate-700 outline-none placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100"
              />
            </label>
            <button
              type="button"
              onClick={() => applyFilters("All", "")}
              className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-md border border-cyan-300 px-3 text-xs font-semibold text-cyan-600 hover:bg-cyan-50"
            >
              <Filter size={15} /> Filters
            </button>
          </div>
        </div>

        <div className="hidden overflow-x-auto lg:block">
          <div
            role="table"
            aria-label="Applications"
            className="min-w-[1020px]"
          >
            <div
              role="row"
              className="grid grid-cols-[2.1fr_1fr_1.15fr_1.65fr_.75fr] gap-4 bg-slate-50/80 px-4 py-4 text-xs font-semibold text-slate-600 sm:px-5"
            >
              <span>Company &amp; Role</span>
              <span>Applied On</span>
              <span>Current Status</span>
              <span>Next Step / Update</span>
              <span>Action</span>
            </div>
            {filteredApplications.map((application) => (
              <ApplicationTableRow
                key={application.id}
                application={application}
                onView={openApplication}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 p-3 lg:hidden">
          {filteredApplications.map((application) => (
            <ApplicationMobileCard
              key={application.id}
              application={application}
              onView={openApplication}
            />
          ))}
        </div>

        {filteredApplications.length === 0 && (
          <p className="px-4 py-10 text-center text-xs text-slate-500">
            No applications match your filters.
          </p>
        )}
      </section>

      <div className="flex flex-col items-center justify-between gap-3 text-xs text-slate-500 sm:flex-row">
        <span>
          Showing {filteredApplications.length ? 1 : 0} to{" "}
          {filteredApplications.length} of{" "}
          {search || activeTab !== "All"
            ? filteredApplications.length
            : totalForTab}{" "}
          applications
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 1 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}
          >
            1
          </button>
          <button
            type="button"
            onClick={() => setCurrentPage(2)}
            className={`flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium ${currentPage === 2 ? "border-cyan-400 bg-cyan-50 text-cyan-600" : "border-slate-200 bg-white text-slate-600"}`}
          >
            2
          </button>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setCurrentPage((page) => Math.min(page + 1, 2))}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-600 hover:border-cyan-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
