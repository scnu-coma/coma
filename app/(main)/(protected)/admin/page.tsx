"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Users, UserPlus, BookOpen, Calendar, Settings } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    totalMembers: number;
    pendingMembers: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({ totalMembers: 0, pendingMembers: 0 });

    useEffect(() => {
        // 통계 데이터를 가져오는 API 호출 (나중에 API 추가 가능)
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/admin/stats");
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error("Stats fetch error:", error);
            }
        };
        fetchStats();
    }, []);

    const adminMenus = [
        {
            title: "부원 승인 관리",
            description: "가입 신청한 신규 부원을 승인하거나 거절합니다.",
            icon: <UserPlus className="w-6 h-6 text-blue-500" />,
            href: "/admin/members",
            badge: stats.pendingMembers > 0 ? `${stats.pendingMembers}명 대기` : null
        },
        {
            title: "전체 회원 관리",
            description: "기존 부원의 정보를 조회하고 권한을 관리합니다.",
            icon: <Users className="w-6 h-6 text-green-500" />,
            href: "/admin/members/all", // 나중에 추가 가능
        },
        {
            title: "공지사항 관리",
            description: "사이트의 공지사항을 작성, 수정 및 관리합니다.",
            icon: <Calendar className="w-6 h-6 text-purple-500" />,
            href: "/admin/notice",
        },
        {
            title: "부실 예약 관리",
            description: "동아리방 예약 신청을 승인하고 시스템을 제어합니다.",
            icon: <Settings className="w-6 h-6 text-red-500" />,
            href: "/admin/reservation",
        },
        {
            title: "모집 공고 관리",
            description: "학기별 신입 부원 모집 공고를 수정하고 관리합니다.",
            icon: <Calendar className="w-6 h-6 text-blue-500" />,
            href: "/admin/recruitment",
        },
        {
            title: "스터디 그룹 관리",
            description: "운영 중인 스터디 그룹과 시간표를 관리합니다.",
            icon: <BookOpen className="w-6 h-6 text-orange-500" />,
            href: "/admin/studygroups",
        }
    ];

    return (
        <div className="p-6 space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">관리자 대시보드</h1>
                <p className="text-muted-foreground">COMA 시스템의 모든 데이터를 관리합니다.</p>
            </div>

            {/* 대시보드 핵심 통계 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">전체 부원</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalMembers}명</div>
                    </CardContent>
                </Card>
                <Card className="border-blue-200 bg-blue-50/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">가입 승인 대기</CardTitle>
                        <UserPlus className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-700">{stats.pendingMembers}명</div>
                    </CardContent>
                </Card>
            </div>

            {/* 주요 관리 메뉴 */}
            <div className="grid gap-6 md:grid-cols-2">
                {adminMenus.map((menu, idx) => (
                    <Link key={idx} href={menu.href}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/10">
                            <CardHeader className="flex flex-row items-center space-x-4">
                                <div className="p-3 bg-muted rounded-lg">{menu.icon}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="text-xl font-bold">{menu.title}</CardTitle>
                                        {menu.badge && (
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                                                {menu.badge}
                                            </span>
                                        )}
                                    </div>
                                    <CardDescription>{menu.description}</CardDescription>
                                </div>
                            </CardHeader>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
