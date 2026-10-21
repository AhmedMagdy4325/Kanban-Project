import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function HomeLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
