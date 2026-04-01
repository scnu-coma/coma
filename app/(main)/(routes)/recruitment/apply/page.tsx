"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, Send, User, GraduationCap, Phone, Info } from "lucide-react";

const STUDY_GROUPS = [
    "파이썬", "C언어", "자바", "게임제작", "백엔드", "홈페이지 제작", "자격증", "모각코"
];

export default function RecruitmentApplyPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        name: "",
        student_id: "",
        phone: "",
        department: "",
        motive: "",
        introduction: "",
        study_groups: [] as string[],
    });

    const toggleGroup = (group: string) => {
        setForm(prev => ({
            ...prev,
            study_groups: prev.study_groups.includes(group)
                ? prev.study_groups.filter(g => g !== group)
                : [...prev.study_groups, group]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (form.study_groups.length === 0) {
            toast.error("하나 이상의 관심 스터디를 선택해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/applicants", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success("지원이 완료되었습니다! 곧 연락드리겠습니다.");
                router.push("/");
            } else {
                const data = await res.json();
                toast.error(data.message || "지원에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="py-12 px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-3xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-black tracking-tight">COMA 부원 가입 신청</h1>
                    <p className="text-muted-foreground">함께 성장할 열정 가득한 당신을 기다립니다.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card className="border-2 shadow-xl shadow-primary/5 rounded-[2rem] overflow-hidden">
                        <CardHeader className="bg-muted/30 p-8 border-b">
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-primary" /> 지원서 작성
                            </CardTitle>
                            <CardDescription>모든 항목은 필수 입력 사항입니다.</CardDescription>
                        </CardHeader>
                        
                        <CardContent className="p-8 space-y-8">
                            {/* 인적 사항 */}
                            <div className="space-y-6">
                                <h3 className="font-bold flex items-center gap-2 text-primary">
                                    <User className="w-4 h-4" /> 인적 사항
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>이름</Label>
                                        <Input 
                                            placeholder="홍길동" 
                                            value={form.name} 
                                            onChange={e => setForm({...form, name: e.target.value})} 
                                            required 
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>학과</Label>
                                        <Input 
                                            placeholder="컴퓨터공학과" 
                                            value={form.department} 
                                            onChange={e => setForm({...form, department: e.target.value})} 
                                            required 
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>학번</Label>
                                        <Input 
                                            placeholder="20250000" 
                                            value={form.student_id} 
                                            onChange={e => setForm({...form, student_id: e.target.value})} 
                                            required 
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>연락처</Label>
                                        <Input 
                                            placeholder="010-0000-0000" 
                                            value={form.phone} 
                                            onChange={e => setForm({...form, phone: e.target.value})} 
                                            required 
                                            className="h-12 rounded-xl"
                                        />
                                    </div>
                                </div>
                            </div>

                            <hr className="border-muted" />

                            {/* 관심 스터디 */}
                            <div className="space-y-4">
                                <h3 className="font-bold flex items-center gap-2 text-primary">
                                    <GraduationCap className="w-4 h-4" /> 관심 스터디 그룹 (중복 선택 가능)
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {STUDY_GROUPS.map(group => (
                                        <div 
                                            key={group} 
                                            className={`flex items-center gap-2 p-3 border rounded-xl cursor-pointer transition-all ${
                                                form.study_groups.includes(group) 
                                                    ? "bg-primary/5 border-primary text-primary font-bold shadow-sm" 
                                                    : "hover:bg-muted"
                                            }`}
                                            onClick={() => toggleGroup(group)}
                                        >
                                            <Checkbox 
                                                id={group} 
                                                checked={form.study_groups.includes(group)} 
                                                onCheckedChange={() => toggleGroup(group)}
                                            />
                                            <Label htmlFor={group} className="cursor-pointer text-sm">{group}</Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <hr className="border-muted" />

                            {/* 내용 작성 */}
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="font-bold flex items-center gap-2">
                                        <Info className="w-4 h-4 text-primary" /> 자기소개
                                    </Label>
                                    <Textarea 
                                        placeholder="자신을 자유롭게 소개해 주세요." 
                                        className="min-h-[150px] rounded-xl p-4 resize-none focus-visible:ring-primary/20"
                                        value={form.introduction}
                                        onChange={e => setForm({...form, introduction: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="font-bold flex items-center gap-2">
                                        <Send className="w-4 h-4 text-primary" /> 지원 동기 및 포부
                                    </Label>
                                    <Textarea 
                                        placeholder="COMA에 지원하게 된 동기와 활동 목표를 작성해 주세요." 
                                        className="min-h-[150px] rounded-xl p-4 resize-none focus-visible:ring-primary/20"
                                        value={form.motive}
                                        onChange={e => setForm({...form, motive: e.target.value})}
                                        required
                                    />
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="bg-muted/30 p-8 border-t flex flex-col gap-4">
                            <p className="text-xs text-muted-foreground text-center">
                                제출하신 정보는 부원 선발 목적으로만 사용되며, 수집된 정보는 안전하게 관리됩니다.
                            </p>
                            <Button 
                                type="submit" 
                                className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "제출 중..." : "지원서 제출하기"}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
}
