import React from "react";
import TampilanClient from "./TampilanClient";
import { getStoreByUserId } from "@/lib/queries";
import { requireSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function TampilanPage() {
  const session = await requireSession();
  const store = await getStoreByUserId(session.user.id);

  if (!store) {
    redirect("/setup-store");
  }

  // Parse JSON or provide smart defaults
  const themeConfig = store.themeConfig ? (store.themeConfig as any) : {};
  
  const initialTheme = {
    fontFamily: themeConfig.fontFamily || "Inter",
    buttonStyle: themeConfig.buttonStyle || "pill",
    theme: themeConfig.theme || "classic-light",
    bgColor: themeConfig.bgColor || "#f8f9fb",
  };

  const storeInfo = {
    slug: store.slug,
    storeName: store.storeName,
    bio: store.bio,
    logoUrl: store.logoUrl,
  };

  return <TampilanClient initialTheme={initialTheme} storeInfo={storeInfo} />;
}
