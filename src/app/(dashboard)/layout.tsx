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
      <TopBar />
      <main className="md:pl-[280px] pt-4 pb-24 px-6 max-w-7xl mx-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
