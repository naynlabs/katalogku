"use client";

import React, { useState, useTransition } from "react";
import { adminUpdateFeedbackStatus } from "@/lib/actions";

type Feedback = {
  id: number;
  typeOfReport: string;
  message: string;
  status: string;
  createdAt: string;
  userName: string;
  userEmail: string;
};

const typeLabels: Record<string, string> = {
  BUG: "Bug",
  FEATURE_REQUEST: "Fitur Baru",
  COMPLAINT: "Keluhan",
  OTHER: "Lainnya",
};

const typeStyles: Record<string, string> = {
  BUG: "bg-red-100 text-red-700",
  FEATURE_REQUEST: "bg-blue-100 text-blue-700",
  COMPLAINT: "bg-amber-100 text-amber-700",
  OTHER: "bg-surface-container text-on-surface-variant",
};

const statusLabels: Record<string, string> = {
  OPEN: "Terbuka",
  IN_PROGRESS: "Diproses",
  RESOLVED: "Selesai",
  CLOSED: "Ditutup",
};

const statusStyles: Record<string, string> = {
  OPEN: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  RESOLVED: "bg-green-100 text-green-700",
  CLOSED: "bg-surface-container text-on-surface-variant",
};

export default function FeedbackClient({ feedbacks: initial }: { feedbacks: Feedback[] }) {
  const [feedbacks, setFeedbacks] = useState(initial);
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (id: number, newStatus: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED") => {
    startTransition(async () => {
      await adminUpdateFeedbackStatus(id, newStatus);
      setFeedbacks((prev) => prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)));
    });
  };

  const openCount = feedbacks.filter((f) => f.status === "OPEN").length;

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="space-y-8 pb-12 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-on-surface tracking-tight">Laporan Bug & Feedback</h1>
          <p className="text-on-surface-variant mt-1">Kotak masuk untuk mengecek keluhan pengguna dan error sistem.</p>
        </div>
        {openCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {openCount} terbuka
          </div>
        )}
      </div>

      {feedbacks.length === 0 ? (
        <div className="bg-surface rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden p-8 text-center text-on-surface-variant">
          <span className="material-symbols-outlined text-6xl mb-4 text-green-500/50">check_circle</span>
          <h2 className="text-xl font-bold mb-2 text-on-surface">Platform Berjalan Mulus!</h2>
          <p className="max-w-md mx-auto">Saat ini belum ada tumpukan laporan bug atau keluhan dari pengguna.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((f) => (
            <div key={f.id} className="bg-surface rounded-2xl border border-outline-variant/30 shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${typeStyles[f.typeOfReport] ?? typeStyles.OTHER}`}>
                      {typeLabels[f.typeOfReport] ?? f.typeOfReport}
                    </span>
                    <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg ${statusStyles[f.status] ?? statusStyles.OPEN}`}>
                      {statusLabels[f.status] ?? f.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface leading-relaxed">{f.message}</p>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant">
                    <span className="font-medium">{f.userName}</span>
                    <span>•</span>
                    <span>{f.userEmail}</span>
                    <span>•</span>
                    <span>{formatDate(f.createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <select
                    value={f.status}
                    onChange={(e) => handleStatusChange(f.id, e.target.value as "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED")}
                    disabled={isPending}
                    className="px-3 py-2 rounded-xl border border-outline-variant/30 bg-surface-container-lowest text-xs font-bold focus:ring-2 focus:ring-primary outline-none disabled:opacity-50"
                  >
                    <option value="OPEN">Terbuka</option>
                    <option value="IN_PROGRESS">Diproses</option>
                    <option value="RESOLVED">Selesai</option>
                    <option value="CLOSED">Ditutup</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
