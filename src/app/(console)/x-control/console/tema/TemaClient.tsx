"use client";

import React from "react";

type Theme = {
  id: number;
  internalName: string;
  displayName: string;
  cssVariablesJson: Record<string, string> | null;
  previewImageUrl: string | null;
  isProOnly: boolean;
  isActive: boolean;
  createdAt: string;
};

export default function TemaClient({ themes }: { themes: Theme[] }) {
  // Extract up to 3 colors from cssVariablesJson for preview
  function getPreviewColors(theme: Theme): string[] {
    if (theme.cssVariablesJson) {
      const values = Object.values(theme.cssVariablesJson).filter((v) => v.startsWith("#") || v.startsWith("rgb"));
      return values.slice(0, 3);
    }
    return ["#e5e7eb", "#f3f4f6", "#d1d5db"]; // fallback grays
  }

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Pustaka Tema</h1>
        <p className="text-on-surface-variant mt-1">Kelola palet warna dan template tampilan yang tersedia untuk etalase pengguna.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {themes.map((theme) => {
          const colors = getPreviewColors(theme);
          return (
            <div key={theme.id} className={`bg-surface rounded-2xl p-4 border shadow-sm ${theme.isActive ? "border-outline-variant/40" : "border-outline-variant/20 opacity-60"}`}>
              {theme.previewImageUrl ? (
                <div className="w-full h-24 rounded-xl overflow-hidden mb-4 bg-surface-container">
                  <img src={theme.previewImageUrl} alt={theme.displayName} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="flex w-full h-24 rounded-xl overflow-hidden mb-4">
                  {colors.map((c, j) => (
                    <div key={j} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
              )}
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-sm text-on-surface">{theme.displayName}</h3>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  theme.isProOnly ? "bg-tertiary/10 text-tertiary" : "bg-surface-container-high text-on-surface"
                }`}>
                  {theme.isProOnly ? "Pro" : "Free"}
                </span>
              </div>
            </div>
          );
        })}

        {/* Add New Theme Placeholder */}
        <div className="bg-surface-container-lowest rounded-2xl border-2 border-dashed border-outline-variant/50 hover:border-primary/50 transition-colors flex flex-col items-center justify-center p-4 cursor-pointer text-on-surface-variant hover:text-primary min-h-[140px]">
          <span className="material-symbols-outlined text-4xl mb-2">add_circle</span>
          <span className="font-bold text-sm">Tambah Tema</span>
        </div>
      </div>

      {themes.length === 0 && (
        <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden p-8 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">palette</span>
          <h2 className="text-xl font-bold mb-2 text-on-surface">Belum Ada Tema</h2>
          <p className="max-w-md mx-auto">Tambahkan tema pertama untuk pengguna Katalogku.</p>
        </div>
      )}
    </div>
  );
}
