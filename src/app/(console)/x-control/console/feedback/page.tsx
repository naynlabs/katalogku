"use client";

import React from "react";

export default function FeedbackPage() {
  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Laporan Bug & Feedback</h1>
        <p className="text-on-surface-variant mt-1">Kotak masuk untuk mengecek keluhan pengguna dan error sistem.</p>
      </div>

      <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden p-8 text-center text-on-surface-variant">
        <span className="material-symbols-outlined text-6xl mb-4 text-green-500/50">check_circle</span>
        <h2 className="text-xl font-bold mb-2 text-on-surface">Platform Berjalan Mulus!</h2>
        <p className="max-w-md mx-auto">Saat ini belum ada tumpukan laporan bug atau keluhan (feedback) terbaru dari pengguna.</p>
      </div>
    </div>
  );
}
