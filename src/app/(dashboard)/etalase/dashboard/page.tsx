import DashboardOverview from "./DashboardClient";
import { requireSession } from "@/lib/session";
import { getStoreByUserId } from "@/lib/queries";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  return <DashboardOverview storeSlug={store.slug} />;
}
