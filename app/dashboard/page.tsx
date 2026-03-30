"use client";

import { TypographyH1, TypographyP } from "@/components/typography/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

export default function DashboardPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !isLoading && !user) {
            router.push("/login");
        }
    }, [isMounted, isLoading, user, router]);

    if (!isMounted || isLoading) return <div className="h-svh"></div>;
    if (!user) return null;

    const roleLabel = (role: string, status: string) => {
        if (status === "PENDING") return "인증 대기 중";
        if (status === "REJECTED") return "가입 거절됨";
        if (role === "ADMIN") return "최고관리자";
        return "코마 정부원";
    };

    return (
        <div className="max-w-lg mx-auto px-5 my-12 space-y-12">
            <div>
                <TypographyH1 className="text-3xl!">내 대시보드</TypographyH1>
                <TypographyP>등록된 나의 회원 정보를 확인할 수 있습니다.</TypographyP>
            </div>

            <div className="space-y-8 list-none">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border">
                    <span className="text-sm font-medium">현재 상태</span>
                    <Badge variant={user.status === "APPROVED" ? "default" : "secondary"}>
                        {roleLabel(user.role, user.status)}
                    </Badge>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <Label>이름</Label>
                        <Tooltip>
                            <TooltipTrigger className="w-full">
                                <Input value={user.name} disabled className="bg-muted/50" />
                            </TooltipTrigger>
                            <TooltipContent>이름은 관리자만 수정할 수 있습니다.</TooltipContent>
                        </Tooltip>
                    </div>

                    <div className="space-y-2">
                        <Label>학번</Label>
                        <div className="flex justify-start">
                            <InputOTP value={user.student_id} disabled maxLength={8}>
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                    <InputOTPSlot index={6} />
                                    <InputOTPSlot index={7} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>소속 학과</Label>
                        <Input value={user.department} disabled className="bg-muted/50" />
                    </div>

                    <div className="space-y-2">
                        <Label>이메일 계정</Label>
                        <Input value={user.email} disabled className="bg-muted/50" />
                    </div>
                </div>

                <div className="pt-6 border-t">
                    <TypographyP className="text-sm text-muted-foreground">
                        ※ 정보 수정이 필요한 경우 운영진에게 문의해주세요.
                    </TypographyP>
                </div>
            </div>
        </div>
    );
}
