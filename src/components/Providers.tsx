"use client";

import { AppProvider } from "@/contexts/AppContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
