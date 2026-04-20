import type { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LangProvider } from "@/i18n/LangContext";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </LangProvider>
  );
}
