import React from "react";
import PengaturanClient from "./PengaturanClient";
import { getStoreByUserId } from "@/lib/queries";
import { requireSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function PengaturanPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);

  if (!store) {
    redirect("/setup-store");
  }

  // We only pass the fields we need to keep Client Component payload lean
  const initialStore = {
    storeName: store.storeName,
    bio: store.bio || "",
    logoUrl: store.logoUrl || "",
    slug: store.slug,
  };

  return <PengaturanClient initialStore={initialStore} />;
}
