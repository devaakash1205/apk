"use client";

import { AppProvider } from "@/contexts/AppContext";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppProvider>{children}</AppProvider>
    </ThemeProvider>
  );
}
