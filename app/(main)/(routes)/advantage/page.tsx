"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock } from "lucide-react";

interface Advantage {
    id: number;
    name: string;
    email?: string;
    password?: string;
    tag?: string;
}

export default function AdvantagePage() {
    const { user, isLoading: authLoading } = useAuth();
    const [advantages, setAdvantages] = useState<Advantage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdvantages = async () => {
            try {
                const res = await fetch("/api/advantages");
                if (res.ok) {
                    setAdvantages(await res.json());
                }
            } catch (error) {
                console.error("Failed to fetch advantages", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAdvantages();
    }, []);

    if (authLoading || loading) {
        return (
            <div className="p-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
            </div>
        );
    }

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-1000 ease-in-out">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">코마 부원 혜택</h1>
                <p className="text-muted-foreground text-lg">코마 부원들에게만 제공되는 다양한 서비스 계정들을 확인하세요.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {advantages.map((ad) => (
                    <Card key={ad.id} className="overflow-hidden border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader className="bg-muted/30 pb-4">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold">{ad.name}</CardTitle>
                                {ad.tag && <Badge variant="outline" className="bg-primary/5">{ad.tag}</Badge>}
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6 space-y-4">
                            {user && user.status === "APPROVED" ? (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">아이디</span>
                                        <span className="font-medium font-mono">{ad.email || "정보 없음"}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">비밀번호</span>
                                        <span className="font-medium font-mono bg-primary/5 px-1 rounded">{ad.password || "정보 없음"}</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-4 bg-muted/20 rounded-lg space-y-2 text-muted-foreground">
                                    <Lock className="w-5 h-5" />
                                    <p className="text-sm font-medium">부원 승인 후 확인 가능합니다.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
            {advantages.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">등록된 혜택이 없습니다.</div>
            )}
        </div>
    );
}
