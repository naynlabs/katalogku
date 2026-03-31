import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = {
  title: "Katalogku — Etalase Digital untuk UMKM Indonesia",
  description:
    "Ubah link bio kamu jadi toko online siap beli. Terima pesanan otomatis via WhatsApp dan mulai closing dalam hitungan menit. Tanpa potongan admin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} font-[family-name:var(--font-plus-jakarta)] antialiased selection:bg-primary-fixed selection:text-on-primary-fixed overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
