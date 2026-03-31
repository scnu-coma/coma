"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/notice/editor";
import { ArrowLeft, Save, FileText, Layout } from "lucide-react";
import Link from "next/link";

export default function NoticeWritePage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

    const handleSave = async () => {
        if (!form.title || !form.content) {
            toast.error("제목과 내용을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/notice", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success("공지사항이 등록되었습니다.");
                router.push("/notice");
                router.refresh();
            } else {
                toast.error("등록 실패");
            }
        } catch (error) {
            toast.error("오류 발생");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-16 px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* 상단 헤더 및 액션 버튼 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 border-b pb-8">
                <div className="flex items-center gap-5">
                    <Link href="/notice">
                        <Button variant="outline" size="icon" className="rounded-2xl w-12 h-12 border-2 hover:bg-muted transition-all">
                            <ArrowLeft className="w-6 h-6" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-1">
                            <Layout className="w-3 h-3" /> Community Management
                        </div>
                        <h1 className="text-4xl font-black tracking-tight">새 공지사항 작성</h1>
                    </div>
                </div>
                <div className="flex gap-3 self-end md:self-center">
                    <Link href="/notice">
                        <Button variant="ghost" className="font-bold rounded-xl h-12 px-6 hover:bg-muted">취소</Button>
                    </Link>
                    <Button onClick={handleSave} disabled={isSubmitting} className="font-bold rounded-2xl h-12 px-10 gap-2 shadow-xl shadow-primary/20 transition-all hover:-translate-y-1">
                        <Save className="w-5 h-5" /> {isSubmitting ? "등록 중..." : "공지 등록하기"}
                    </Button>
                </div>
            </div>

            {/* 메인 작성 폼 */}
            <div className="grid grid-cols-1 gap-10">
                <div className="space-y-10 bg-card border-2 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-neutral-100 dark:shadow-none relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-primary/10"></div>
                    
                    <div className="space-y-4">
                        <Label className="text-xs font-black text-primary tracking-[0.2em] uppercase ml-1 flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Notice Title
                        </Label>
                        <Input 
                            className="h-20 text-3xl px-8 font-black border-2 rounded-[1.5rem] focus-visible:ring-primary/20 transition-all bg-muted/10 placeholder:text-muted-foreground/30"
                            value={form.title} 
                            onChange={e => setForm({...form, title: e.target.value})} 
                            placeholder="공지사항의 제목을 입력하세요" 
                        />
                    </div>

                    <div className="space-y-4">
                        <Label className="text-xs font-black text-primary tracking-[0.2em] uppercase ml-1">Content Body</Label>
                        <div className="rounded-[1.5rem] overflow-hidden border-2 min-h-[600px] flex flex-col group focus-within:border-primary transition-all shadow-inner">
                            <Editor 
                                value={form.content} 
                                onChange={val => setForm({...form, content: val})} 
                            />
                        </div>
                    </div>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm font-medium bg-muted/30 py-4 rounded-2xl border border-dashed">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    작성 중인 내용은 자동으로 저장되지 않습니다. 등록 전 한 번 더 확인해 주세요.
                </div>
            </div>
        </div>
    );
}
