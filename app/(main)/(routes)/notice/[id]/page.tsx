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

    if (isLoading) return <div className="py-20 text-center text-muted-foreground">로딩 중...</div>;
    if (!notice) return null;

    // HTML인지 마크다운인지 판별 (간단하게 < 태그가 있으면 HTML로 간주)
    const isHtml = notice.content.trim().startsWith('<');
    const sanitizedContent = isHtml ? DOMPurify.sanitize(notice.content) : notice.content;
    
    const canManage = user && (user.id === notice.author_id || user.role === "ADMIN");

    return (
        <div className="py-8 animate-in fade-in duration-1000 ease-in-out">
            <div className="flex justify-between items-start mb-12">
                <PostHeader 
                    tag="공지" 
                    title={notice.title} 
                    date={parseDate(notice.created_at)} 
                    author={notice.author_name} 
                />
                {canManage && (
                    <div className="flex gap-2 shrink-0">
                        <Button variant="outline" size="icon" onClick={() => setIsEditOpen(true)}>
                            <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="text-red-500" onClick={handleDelete}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </div>
            
            <div className="my-12">
                {isHtml ? (
                    <div 
                        className="prose dark:prose-invert max-w-none ql-editor"
                        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                    />
                ) : (
                    <MarkdownRenderer post={sanitizedContent} />
                )}
            </div>

            <div className="w-full flex my-20">
                <Link href="/notice" className="mx-auto">
                    <Button variant="outline" className="w-36 h-12 rounded-3xl hover:cursor-pointer shadow-sm">목록으로</Button>
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
