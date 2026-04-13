import { getAdminThemes } from "@/lib/queries";
import TemaClient from "./TemaClient";

export default async function TemaPage() {
  const themes = await getAdminThemes();

  const serialized = themes.map((t) => ({
    id: t.id,
    internalName: t.internalName,
    displayName: t.displayName,
    cssVariablesJson: t.cssVariablesJson as Record<string, string> | null,
    previewImageUrl: t.previewImageUrl,
    isProOnly: t.isProOnly,
    isActive: t.isActive,
    createdAt: t.createdAt.toISOString(),
  }));

  return <TemaClient themes={serialized} />;
}
