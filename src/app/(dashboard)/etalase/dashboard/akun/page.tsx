import React from "react";
import AkunClient from "./AkunClient";
import { requireSession } from "@/lib/session";

export default async function AkunPage() {
  const session = await requireSession();

  return <AkunClient initialEmail={session.user.email} />;
}
