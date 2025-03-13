"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const noSidebarRoutes = ["/", "/login", "/signup"]; //Routes where sidebar shouldn't appear
  const pathname = usePathname();

  return noSidebarRoutes.includes(pathname) ? (
    <>{children}</>
  ) : (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default SidebarWrapper;
