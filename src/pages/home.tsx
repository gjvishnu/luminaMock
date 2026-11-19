import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Sidebar } from "../components/sideBar";
import { ErrorBoundary } from "../components/ErrorBoundary";

export const Home = () => {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-[#f8fafd]">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f8fafd]">

        {/* Header */}
        <Header />

        {/* Page Content - single scroll container protected by page-level Error Boundary */}
        <div className="min-w-0 min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 sm:px-6 lg:px-7">
          <ErrorBoundary
            level="page"
            title="Unable to display this section"
            description="An unexpected error occurred while rendering this page. You can try again or use the navigation sidebar to visit another section."
          >
            <Outlet />
          </ErrorBoundary>
        </div>

      </div>
    </div>
  );
};
