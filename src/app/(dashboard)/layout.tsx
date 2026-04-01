import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import BottomNav from "@/components/dashboard/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Sidebar />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopBar />
        <main className="flex-1 pt-6 pb-24 px-4 lg:px-8 w-full max-w-7xl">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
