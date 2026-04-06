import { redirect } from "next/navigation";

export default function EtalaseRootRedirect() {
  // Langsung arahkan (redirect) pengguna ke halaman dashboard
  redirect("/etalase/dashboard");
}
