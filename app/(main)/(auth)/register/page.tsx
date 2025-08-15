"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/typography/typography";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "@/hooks/useAuth";
import { createUserProfile } from "@/lib/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Zod 스키마 정의
const registerSchema = z.object({
    name: z.string().min(2, "이름은 2글자 이상 입력해주세요").max(10, "이름은 10글자 이하로 입력해주세요"),
    department: z.string().min(2, "학과를 입력해주세요").max(30, "학과명이 너무 깁니다"),
    studentId: z.string()
        .length(8, "학번은 정확히 8자리여야 합니다")
        .regex(/^\d{8}$/, "학번은 8자리 숫자만 입력할 수 있습니다"),
    grade: z.string().min(1, "학년을 선택해주세요"),
    phone: z.string()
        .min(1, "전화번호를 입력해주세요")
        .regex(/^010-\d{4}-\d{4}$/, "올바른 전화번호 형식을 입력해주세요 (010-0000-0000)")
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    const { user, refreshProfile } = useAuth();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // React Hook Form 설정
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            department: "",
            studentId: "",
            grade: "1",
            phone: ""
        }
    });

    const onSubmit = async (data: RegisterFormData) => {
        if (!user) {
            console.error("사용자 정보가 없습니다.");
            return;
        }

        setIsSubmitting(true);
        try {
            // 사용자 프로필 생성
            const profileData = {
                name: data.name,
                department: data.department,
                student_id: data.studentId,
                grade: data.grade,
                phone: data.phone
                
            };
            const profile = await createUserProfile(user.id, profileData);
            
            if (profile) {
                console.log("완성된 사용자 정보:", {
                    id: profile.id,
                    user_id: profile.user_id,
                    name: profile.name,
                    department: profile.department,
                    student_id: profile.student_id,
                    grade: profile.grade,
                    phone: profile.phone,
                    role: profile.role,
                    is_approved: profile.is_approved,
                    created_at: profile.created_at,
                    updated_at: profile.updated_at
                });
                
                // 프로필 새로고침
                await refreshProfile();
                // 성공 시 메인 페이지로 리다이렉트
                router.push('/');
            } else {
                console.error("프로필 생성에 실패했습니다.");
            }
        } catch (error) {
            console.error("가입 처리 중 오류:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!user) {
        router.push('/');
        return null;
    }

    return (
        <div className="xl:w-6xl xl:mx-auto lg:mx-16 mx-5 min-h-screen flex items-center justify-center py-12">
            <div className="w-full max-w-md">
                <Card>
                    <CardHeader className="text-center space-y-2">
                        <TypographyH2 className="border-b-0 pb-0">회원가입</TypographyH2>
                        <CardDescription>
                            최초 로그인 시 부원 확인을 위해 추가 정보를 입력해주세요
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    이름
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="홍길동"
                                    {...register("name")}
                                    className={errors.name ? "border-destructive" : ""}
                                />
                                {errors.name && (
                                    <p className="text-sm text-destructive">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="department" className="text-sm font-medium">
                                    학과
                                </label>
                                <Input
                                    id="department"
                                    type="text"
                                    placeholder="컴퓨터공학과"
                                    {...register("department")}
                                    className={errors.department ? "border-destructive" : ""}
                                />
                                {errors.department && (
                                    <p className="text-sm text-destructive">{errors.department.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="studentId" className="text-sm font-medium">
                                    학번
                                </label>
                                <Input
                                    id="studentId"
                                    type="text"
                                    placeholder="20241234"
                                    {...register("studentId")}
                                    className={errors.studentId ? "border-destructive" : ""}
                                />
                                {errors.studentId && (
                                    <p className="text-sm text-destructive">{errors.studentId.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="grade" className="text-sm font-medium">
                                    학년
                                </label>
                                <select
                                    id="grade"
                                    {...register("grade")}
                                    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${errors.grade ? "border-destructive" : ""}`}
                                >
                                    <option value="1">1학년</option>
                                    <option value="2">2학년</option>
                                    <option value="3">3학년</option>
                                    <option value="4">4학년</option>
                                </select>
                                {errors.grade && (
                                    <p className="text-sm text-destructive">{errors.grade.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">
                                    전화번호
                                </label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="010-1234-5678"
                                    {...register("phone")}
                                    className={errors.phone ? "border-destructive" : ""}
                                />
                                {errors.phone && (
                                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                                )}
                            </div>

                            <div className="pt-4">
                                <Button type="submit" className="w-full" disabled={isSubmitting}>
                                    {isSubmitting ? "처리 중..." : "가입 신청"}
                                </Button>
                            </div>
                        </form>

                        <div className="text-center">
                            <TypographyP className="text-xs text-muted-foreground mt-0">
                                가입 신청    후 승인을 기다려주세요
                            </TypographyP>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
