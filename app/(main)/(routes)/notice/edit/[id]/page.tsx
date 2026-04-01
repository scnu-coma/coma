"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/notice/editor";
import { ArrowLeft, Save, FileText, Layout, RotateCcw } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function NoticeEditPage() {
    const { id } = useParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });
    const [original, setOriginal] = useState({ title: "", content: "" });

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await fetch(`/api/notice/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    const initialData = { title: data.title, content: data.content };
                    setForm(initialData);
                    setOriginal(initialData);
                } else {
                    toast.error("게시글을 불러올 수 없습니다.");
                    router.push("/notice");
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotice();
    }, [id]);

    const handleSave = async () => {
        if (!form.title || !form.content) {
            toast.error("제목과 내용을 입력해주세요.");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch(`/api/notice/${id}`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success("수정되었습니다.");
                router.push(`/notice/${id}`);
                router.refresh();
            } else {
                toast.error("수정 실패");
            }
        } catch (error) {
            toast.error("오류 발생");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        if (confirm("수정 중인 내용을 취소하고 원본으로 되돌리시겠습니까?")) {
            setForm(original);
            toast.info("원본 내용으로 복구되었습니다.");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-5xl mx-auto py-16 px-6 space-y-10">
                <Skeleton className="h-12 w-1/2" />
                <Skeleton className="h-[600px] w-full rounded-3xl" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-12 px-6 animate-in fade-in duration-700">
            {/* 상단 헤더 */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">공지사항 수정</h1>
                        <p className="text-muted-foreground text-sm font-medium">기존 게시글의 내용을 수정합니다.</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleReset} className="font-bold rounded-xl h-11 gap-2">
                        <RotateCcw className="w-4 h-4" /> 원본 복구
                    </Button>
                    <Button onClick={handleSave} disabled={isSubmitting} className="font-bold rounded-xl h-11 px-8 gap-2 shadow-lg shadow-primary/20">
                        <Save className="w-4 h-4" /> {isSubmitting ? "저장 중..." : "수정 완료"}
                    </Button>
                </div>
            </div>

            {/* 작성 영역 (테두리 최소화, 비율 강조) */}
            <div className="space-y-8">
                <div className="space-y-3">
                    <Label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1">Title</Label>
                    <Input 
                        className="h-16 text-2xl px-0 font-black border-0 border-b-2 rounded-none focus-visible:ring-0 focus-visible:border-primary transition-all bg-transparent placeholder:text-muted-foreground/20"
                        value={form.title} 
                        onChange={e => setForm({...form, title: e.target.value})} 
                        placeholder="제목을 입력하세요" 
                    />
                </div>

                <div className="space-y-3">
                    <Label className="text-[10px] font-black text-primary tracking-[0.2em] uppercase ml-1">Content Body</Label>
                    <div className="min-h-[600px] flex flex-col transition-all">
                        <Editor 
                            value={form.content} 
                            onChange={val => setForm({...form, content: val})} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
