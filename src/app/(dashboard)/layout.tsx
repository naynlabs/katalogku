import Sidebar from "@/components/dashboard/Sidebar";
import TopBar from "@/components/dashboard/TopBar";
import BottomNav from "@/components/dashboard/BottomNav";
import { requireSession } from "@/lib/session";
import { getStoreByUserId } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side auth check + data fetch (single request, no waterfalls)
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);

  // No store yet → redirect to onboarding
  if (!store) {
    redirect("/onboarding");
  }

  const userData = {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image ?? null,
  };

  const storeData = {
    storeName: store.storeName,
    slug: store.slug,
  };

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden min-h-screen">
      <Sidebar storeSlug={storeData.slug} />
      <div className="md:ml-64 flex flex-col min-h-screen">
        <TopBar userName={userData.name} storeName={storeData.storeName} userImage={userData.image} />
        <main className="flex-1 pt-6 pb-24 px-4 lg:px-8 w-full max-w-7xl">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
