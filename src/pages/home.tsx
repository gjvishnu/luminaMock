import { Outlet } from "react-router-dom";
import { Header } from "../components/header";
import { Sidebar } from "../components/sideBar";
import { RoleProvider } from "../context/roleProvider";

export const Home = () => {
  return (
    <RoleProvider>
      <div className="flex h-screen w-full overflow-hidden">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

          {/* Header */}
          <Header />

          {/* Page Content */}
          <div className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden p-3">
            <Outlet />
          </div>

        </div>
      </div>
    </RoleProvider>
  );
};
