import ConsoleSidebar from "@/components/console/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Katalogku Console | Command Center",
  description: "Platform Administration Dashboard",
  robots: { index: false, follow: false }, // Prevent search engine indexing highly sensitive areas
};

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-surface-container-lowest text-on-surface">
      {/* Sidebar for Desktop */}
      <ConsoleSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-stretch overflow-hidden relative">
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
