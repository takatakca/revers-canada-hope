import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { LangProvider } from "@/i18n/LangContext";
import { AppAndPartners, AnnouncementStrip, WelcomePopup } from "./PlatformExtras";

function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/" || pathname === "/GAR";

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className={overlay ? "flex-1" : "flex-1 pt-[68px]"}>{children}</main>
      <AppAndPartners />
      <AnnouncementStrip />
      <SiteFooter />
      <WelcomePopup />
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <LangProvider>
      <Shell>{children}</Shell>
    </LangProvider>
  );
}
