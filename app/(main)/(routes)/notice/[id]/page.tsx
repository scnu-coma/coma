"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostHeader from "@/components/posts/post-header";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parse-date";
import Link from "next/link";
import { toast } from "sonner";
import DOMPurify from "dompurify";
import { useAuth } from "@/hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/notice/editor";
import { Pencil, Trash2 } from "lucide-react";
import MarkdownRenderer from "@/lib/markdown-renderer";

export default function NoticeDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [notice, setNotice] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // 수정용 상태
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

    const fetchNotice = async () => {
        try {
            const res = await fetch(`/api/notice/${id}`);
            if (res.ok) {
                const data = await res.json();
                setNotice(data);
                setForm({ title: data.title, content: data.content });
            } else {
                toast.error("게시글을 불러올 수 없습니다.");
                router.push("/notice");
            }
        } catch (error) {
            console.error("Fetch notice detail error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchNotice();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const res = await fetch(`/api/notice/${id}`, {
                method: "PATCH",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                toast.success("수정되었습니다.");
                setIsEditOpen(false);
                fetchNotice();
            } else {
                toast.error("수정 실패");
            }
        } catch (error) {
            toast.error("오류 발생");
        }
    };

    const handleDelete = async () => {
        if (!confirm("정말로 이 공지사항을 삭제하시겠습니까?")) return;
        try {
            const res = await fetch(`/api/notice/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("삭제되었습니다.");
                router.push("/notice");
            } else {
                toast.error("삭제 실패");
            }
        } catch (error) {
            toast.error("오류 발생");
        }
    };

    if (isLoading) return (
        <div className="max-w-4xl mx-auto py-20 space-y-8 animate-pulse">
            <div className="h-12 bg-muted rounded-md w-3/4"></div>
            <div className="flex gap-4">
                <div className="h-4 bg-muted rounded w-24"></div>
                <div className="h-4 bg-muted rounded w-24"></div>
            </div>
            <div className="space-y-4">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-2/3"></div>
            </div>
        </div>
    );
    if (!notice) return null;

    // HTML 판별 로직 개선: 단순히 <로 시작하는 것뿐만 아니라, HTML 태그가 포함되어 있는지 확인
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(notice.content);
    const sanitizedContent = isHtml ? DOMPurify.sanitize(notice.content) : notice.content;
    
    const canManage = user && (user.id === notice.author_id || user.role === "ADMIN");

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <div className="border-b pb-8 mb-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <PostHeader 
                        tag="공지" 
                        title={notice.title} 
                        date={parseDate(notice.created_at)} 
                        author={notice.author_name} 
                    />
                    {canManage && (
                        <div className="flex gap-2 shrink-0 self-end sm:self-start">
                            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted" onClick={() => setIsEditOpen(true)}>
                                <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full text-destructive hover:bg-destructive/10" onClick={handleDelete}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            
            <article className="min-h-[300px]">
                {isHtml ? (
                    <div 
                        className="prose dark:prose-invert max-w-none ql-editor !p-0"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                ) : (
                    <MarkdownRenderer post={sanitizedContent} />
                )}
            </article>

            <div className="mt-20 pt-8 border-t flex justify-center">
                <Link href="/notice">
                    <Button variant="outline" size="lg" className="rounded-full px-8 hover:bg-accent group transition-all">
                        <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
                        목록으로 돌아가기
                    </Button>
                </Link>
            </div>

            {/* 수정 다이얼로그 */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                    <DialogHeader className="p-6 border-b">
                        <DialogTitle>공지사항 수정</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div className="space-y-2">
                            <Label className="font-bold">제목</Label>
                            <Input 
                                className="h-12 text-lg px-4"
                                value={form.title} 
                                onChange={e => setForm({...form, title: e.target.value})} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="font-bold">내용</Label>
                            <Editor value={form.content} onChange={val => setForm({...form, content: val})} />
                        </div>
                    </div>
                    <DialogFooter className="p-6 border-t bg-muted/20">
                        <Button variant="outline" onClick={() => setIsEditOpen(false)}>취소</Button>
                        <Button onClick={handleUpdate} className="px-8 font-bold">수정완료</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
