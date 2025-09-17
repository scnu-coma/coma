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
import { Check, ChevronsUpDown, CircleAlert, Edit3 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

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
    const [pageLoading, setPageLoading] = useState(true);
    const [majorOpen, setMajorOpen] = useState(false);
    const [majorCustomInput, setMajorCustomInput] = useState(false);
    const route = useRouter();

    // 페이지 초기 로딩 시 정보 등록 여부 확인
    useEffect(() => {
        setPageLoading(true);
        supabase.auth.getSession().then(async ({ data }) => {
            const uuid = await supabase.from("users").select("user_id").eq("user_id", data.session?.user.id).single();
            // 승인 여부와 관계없이, 이미 등록이 완료되었다면 메인화면으로 강제이동
            if (data.session && uuid.data?.user_id) {
                toast.dismiss();
                toast.warning("이미 추가정보 등록이 완료되었습니다.");
                route.push("/");
                // 그렇지 않을 경우 로딩 해제
            } else {
                setPageLoading(false);
            }
        });
    }, [route]);

    // React Hook Form 설정
    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        clearErrors,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            major: "",
            minor: "없음",
            studentId: "",
            grade: "",
            phone: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        try {
            toast.loading("등록 중입니다...");
            // users 테이블의 정보 생성 또는 업데이트
            try {
                await supabase.from("users").upsert({
                    user_id: (await supabase.auth.getUser()).data.user?.id,
                    name: data.name,
                    major: data.major,
                    minor: data.minor,
                    student_id: data.studentId,
                    grade: data.grade,
                    phone: data.phone,
                });
            } catch (error) {
                toast.dismiss();
                toast.error(`등록 중 오류가 발생했습니다. ${(error as Error).message}`);
                console.error(error);
                return;
            }
            // authentication의 메타데이터 업데이트 (header에 표시되는 이름)
            try {
                await supabase.auth.updateUser({
                    data: { display_name: data.name, is_registered: true },
                    phone: data.phone,
                });
            } catch (error) {
                toast.dismiss();
                toast.error(`등록 중 오류가 발생했습니다. ${(error as Error).message}`);
                console.error(error);
                return;
            }
        } catch (error) {
            toast.dismiss();
            toast.error(`등록 중 오류가 발생했습니다. ${(error as Error).message}`);
            console.error(error);
            return;
        } finally {
            route.push("/");
            toast.dismiss();
            toast.info("관리자 승인 후 서비스 이용이 가능합니다.");
            toast.success("등록이 완료되었습니다.");
        }
    };
    // 전공 선택 핸들링
    const watchedMajor = watch("major");
    const handleMajorSelect = (value: string) => {
        if (value === "__custom__") {
            setValue("major", "");
            setMajorCustomInput(true);
        } else {
            setValue("major", value);
            clearErrors("major");
            setMajorCustomInput(false);
        }
        setMajorOpen(false);
    };
    // 페이지 로딩 상태를 추가하면 좋다. 현재는 빈 화면이다.
    if (pageLoading) return <div className="h-svh"></div>;
    else
        return (
            <>
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
                            <Dialog>
                                <DialogTrigger className="ml-auto">
                                    <span className="underline font-semibold flex items-end gap-1 hover:cursor-pointer">
                                        <CircleAlert size={14} /> 찾는 전공이 목록에 없어요!
                                    </span>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>찾는 전공이 목록에 없어요!</DialogTitle>
                                    </DialogHeader>
                                    <DialogDescription className="flex items-center">
                                        전공 목록에서{" "}
                                        <strong className="inline-flex items-center gap-0.5">
                                            <Edit3 className="h-4" /> 직접 입력하기...
                                        </strong>
                                        를 선택하면 직접 입력할 수 있습니다.
                                    </DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </p>
                        {majorCustomInput ? (
                            <Controller
                                name="major"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex gap-2">
                                        <Input
                                            {...field}
                                            placeholder="전공명을 입력하세요..."
                                            className={cn(
                                                "flex-1",
                                                errors.major && "border-red-500 focus:border-red-500"
                                            )}
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="text-xs"
                                            onClick={() => {
                                                setMajorCustomInput(false);
                                            }}
                                        >
                                            목록에서 선택
                                        </Button>
                                    </div>
                                )}
                            />
                        ) : (
                            <Controller
                                name="major"
                                control={control}
                                render={({ field }) => (
                                    <Popover open={majorOpen} onOpenChange={setMajorOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={majorOpen}
                                                className={cn(
                                                    "w-full justify-between",
                                                    !field.value && "text-muted-foreground",
                                                    errors.major && "border-red-500 focus:border-red-500"
                                                )}
                                            >
                                                {field.value || "전공을 선택하세요..."}
                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0" align="start">
                                            <Command>
                                                <CommandInput placeholder="전공명을 검색하세요..." />
                                                <CommandList>
                                                    <CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
                                                    <CommandGroup>
                                                        <CommandItem
                                                            value="__custom__"
                                                            onSelect={() => handleMajorSelect("__custom__")}
                                                            className="py-2.5"
                                                        >
                                                            <Edit3 />
                                                            <span>직접 입력하기...</span>
                                                        </CommandItem>
                                                    </CommandGroup>
                                                    <CommandSeparator />
                                                    {majors.map((schools) => (
                                                        <div key={schools.school}>
                                                            <CommandGroup heading={schools.school}>
                                                                {schools.major.map((item) => (
                                                                    <CommandItem
                                                                        key={item}
                                                                        value={item}
                                                                        onSelect={() => handleMajorSelect(item)}
                                                                        className="py-2.5"
                                                                    >
                                                                        {schools.icon}
                                                                        <span>{item}</span>
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto",
                                                                                watchedMajor === item
                                                                                    ? "opacity-100"
                                                                                    : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                            <CommandSeparator />
                                                        </div>
                                                    ))}
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                )}
                            />
                        )}
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
                    <li className="my-12">
                        <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
                            {isSubmitting ? "처리 중..." : "작성 완료"}
                        </Button>
                    </li>
                </form>
            </>
        );
}
