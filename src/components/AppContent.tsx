"use client";

import { useApp } from "@/contexts/AppContext";
import { SplashScreen } from "./SplashScreen";
import OnboardingPage from "@/app/onboarding/page";
import { BottomNav } from "./BottomNav";
import { usePathname } from "next/navigation";

export function AppContent({ children }: { children: React.ReactNode }) {
    const { isAppLoading, isOnboardingComplete } = useApp();
    const pathname = usePathname();

    if (isAppLoading) {
        return <SplashScreen />;
    }

    if (!isOnboardingComplete) {
        return <OnboardingPage />;
    }
    
    const showNav = pathname !== '/onboarding';

    return (
        <>
            <main className="flex-1 overflow-y-auto no-scrollbar">{children}</main>
            {showNav && <BottomNav />}
        </>
    );
}
