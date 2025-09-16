"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Title from "@/components/custom/title";
import { Label } from "@/components/ui/label";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { majors } from "@/data/majors";
import { CircleAlert } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

// Zod 스키마 정의
const registerSchema = z.object({
    name: z.string().min(2, "2글자 이상 입력하세요.").max(10, "10글자 이하로 입력하세요."),
    major: z.string().min(2, "학과를 입력하세요.").max(30, "학과명이 너무 깁니다."),
    minor: z.string().max(30, "학과명이 너무 깁니다."),
    studentId: z.string().min(8, "학번을 입력하세요.").max(8, "학번을 입력하세요."),
    grade: z.string().min(1, "학년을 선택하세요."),
    phone: z
        .string()
        .min(1, "전화번호를 입력하세요.")
        .regex(/^010\d{8}$/, "올바른 전화번호 형식을 입력하세요."),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
    // React Hook Form 설정
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            major: "",
            minor: "",
            studentId: "",
            grade: "",
            phone: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            // TODO: 추가 정보를 데이터베이스에 저장하는 로직
            console.log("완성된 사용자 정보:", {
                ...data,
            });

            // 성공 시 처리 로직 (예: 리다이렉트)
            // router.push('/dashboard');
        } catch (error) {
            toast.error(`가입 처리 오류: ${(error as Error).message}`);
        }
    };

    return (
        <div className="">
            <Title title="부원 인증" description="코마 부원 인증을 위한 기본정보를 입력하세요." />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 [&_li]:space-y-2 list-none [&_p]:flex [&_p]:items-center [&_p]:space-x-2.5 [&_input]:text-sm [&_span]:text-xs"
            >
                <li>
                    <p>
                        <Label htmlFor="name">이름</Label>
                        {errors.name && <span className="text-destructive">{errors.name.message}</span>}
                    </p>
                    <Input
                        id="name"
                        type="text"
                        placeholder="김코미"
                        autoFocus
                        {...register("name")}
                        className={
                            errors.name
                                ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/50"
                                : ""
                        }
                    />
                </li>
                <li>
                    <p>
                        <Label htmlFor="studentId">학번</Label>
                        {errors.studentId && <span className="text-destructive">{errors.studentId.message}</span>}
                    </p>
                    <Controller
                        name="studentId"
                        control={control}
                        render={({ field }) => (
                            <InputOTP
                                value={field.value}
                                onChange={field.onChange}
                                maxLength={8}
                                inputMode="numeric"
                                pattern={REGEXP_ONLY_DIGITS}
                                className={errors.studentId ? "border-destructive" : ""}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                </InputOTPGroup>
                                <InputOTPSeparator />
                                <InputOTPGroup>
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                    <InputOTPSlot index={6} />
                                    <InputOTPSlot index={7} />
                                </InputOTPGroup>
                            </InputOTP>
                        )}
                    />
                </li>
                <li>
                    <p>
                        <Label htmlFor="major">전공</Label>
                        {errors.major && <span className="text-destructive">{errors.major.message}</span>}
                        <span className="underline font-semibold flex items-end gap-1 ml-auto hover:cursor-pointer">
                            <CircleAlert size={14} /> 찾는 전공이 목록에 없어요!
                        </span>
                    </p>
                    <Command>
                        <CommandInput placeholder="전공명을 검색하세요..." id="major" {...register("major")} />
                        <CommandList>
                            <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
                            {majors.map((schools) => (
                                <div key={schools.school}>
                                    <CommandGroup heading={schools.school}>
                                        {schools.major.map((item) => (
                                            <CommandItem key={item}>
                                                {schools.icon}
                                                <span>{item}</span>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    <CommandSeparator />
                                </div>
                            ))}
                        </CommandList>
                    </Command>
                </li>
                <li>
                    <p>
                        <Label htmlFor="grade">학년</Label>
                        {errors.grade && <span className="text-destructive">{errors.grade.message}</span>}
                    </p>
                    <Controller
                        name="grade"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex justify-around"
                            >
                                {Array.from({ length: 6 }).map((_, index) => (
                                    <div key={index} className="flex flex-col items-center gap-3">
                                        <RadioGroupItem value={`${index + 1}`} id={`r${index + 1}`} />
                                        <Label htmlFor={`r${index + 1}`}>{index + 1}학년</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        )}
                    />
                </li>
                <li>
                    <p>
                        <Label htmlFor="phone">전화번호</Label>
                        {errors.phone && <span className="text-destructive">{errors.phone.message}</span>}
                    </p>
                    <Input
                        type="tel"
                        placeholder="01012345678"
                        maxLength={11}
                        {...register("phone")}
                        className={errors.phone ? "border-destructive" : ""}
                    />
                </li>
                <li className="mt-12">
                    <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                        {isSubmitting ? "처리 중..." : "작성 완료"}
                    </Button>
                </li>
            </form>
        </div>
    );
}
