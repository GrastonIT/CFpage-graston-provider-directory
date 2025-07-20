import { Outlet } from "react-router";
import Aside from "../components/base/Aside";

export default function Index() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--graston-light-blue)] to-white">
      <Aside />
      <div className="flex-1 h-svh overflow-hidden">
        <div className="p-6 h-full overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
