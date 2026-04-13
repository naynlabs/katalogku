import { requireSession } from "@/lib/session";
import { getStoreByUserId } from "@/lib/queries";
import { redirect } from "next/navigation";
import TeksTokoClient from "./TeksTokoClient";

export default async function TeksTokoPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);
  if (!store) redirect("/onboarding");

  return (
    <TeksTokoClient 
      initialConfig={store.teksConfig || {}} 
      storeName={store.storeName}
    />
  );
}
