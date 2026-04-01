"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        if (!isLoading) {
            if (!user || user.role !== "ADMIN") {
                router.push("/");
            } else {
                setIsAuthorized(true);
            }
        }
    }, [user, isLoading, router]);

    if (isLoading || !isAuthorized) {
        return (
            <div className="p-8 space-y-4">
                <Skeleton className="h-12 w-[250px]" />
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    const isDashboard = pathname === "/admin";

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="sticky top-14 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center gap-4 px-4 md:px-8">
                    {!isDashboard && (
                        <Button variant="ghost" size="sm" className="gap-1" onClick={() => router.back()}>
                            <ChevronLeft className="h-4 w-4" />
                            <span>뒤로가기</span>
                        </Button>
                    )}
                    <Link href="/admin" className="flex items-center gap-2 font-semibold">
                        <LayoutDashboard className="h-5 w-5 text-primary" />
                        <span className="hidden sm:inline-block">관리자 패널</span>
                    </Link>
                    <div className="ml-auto flex items-center gap-2">
                        {/* 관리자 관련 숏컷이나 상태 정보 추가 가능 */}
                    </div>
                </div>
            </header>
            <main className="container mx-auto py-6 px-4 md:px-8">
                {children}
            </main>
        </div>
    );
}
