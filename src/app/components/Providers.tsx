"use client";

import { NeonAuthUIProvider } from "@neondatabase/auth/react";
import { authClient } from "../../../lib/auth/client";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider authClient={authClient as any} className = "z-0!">
      {children}
    </NeonAuthUIProvider>
  );
}
