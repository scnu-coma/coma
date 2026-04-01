"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowLeft, Calendar, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import MarkdownRenderer from "@/lib/markdown-renderer";
import DOMPurify from "dompurify";
import { parseDate } from "@/lib/parse-date";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function NoticeDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();
    const [notice, setNotice] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotice = async () => {
        try {
            const res = await fetch(`/api/notice/${id}`);
            if (res.ok) {
                const data = await res.json();
                setNotice(data);
            } else {
                toast.error("게시글을 찾을 수 없습니다.");
                router.push("/notice");
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchNotice(); }, [id]);

    const handleDelete = async () => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        try {
            const res = await fetch(`/api/notice/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("삭제되었습니다.");
                router.push("/notice");
            }
        } catch (error) {
            toast.error("삭제 실패");
        }
    };

    if (isLoading) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6 space-y-8">
                <Skeleton className="h-12 w-3/4" />
                <div className="flex gap-4"><Skeleton className="h-6 w-24" /><Skeleton className="h-6 w-24" /></div>
                <Skeleton className="h-[400px] w-full" />
            </div>
        );
    }

    if (!notice) return null;

    const hasMarkdownPattern = /[\*\_]{2,}|#{1,6}\s|\|[\-\s]+\|/.test(notice.content);
    const isHtml = /<\/?[a-z][\s\S]*>/i.test(notice.content) && !hasMarkdownPattern;
    const sanitizedContent = isHtml ? DOMPurify.sanitize(notice.content) : notice.content;
    const canManage = user && (user.id === notice.author_id || user.role === "ADMIN");

    return (
        <div className="min-h-screen pb-24">
            {/* 상단 네비게이션 경로 */}
            <div className="bg-muted/30 border-b">
                <div className="max-w-4xl mx-auto px-6 h-14 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-primary transition-colors">홈</Link>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                    <Link href="/notice" className="hover:text-primary transition-colors">공지사항</Link>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                    <span className="text-foreground font-medium truncate max-w-[200px] md:max-w-md">{notice.title}</span>
                </div>
            </div>

            <div className="max-w-4xl mx-auto py-16 px-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* 헤더 섹션 */}
                <header className="mb-12 space-y-6 text-center">
                    <div className="space-y-4">
                        <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/5 font-bold uppercase tracking-widest text-[10px]">Official Notice</Badge>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.2] text-foreground break-keep">
                            {notice.title}
                        </h1>
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-4 border-t border-dashed">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold border border-primary/20">
                                {notice.author_name?.charAt(0)}
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] text-muted-foreground font-bold uppercase">Author</span>
                                <span className="text-sm font-black">{notice.author_name}</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-muted hidden sm:block"></div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] font-bold uppercase">Date Published</span>
                                <time className="text-sm font-medium">{parseDate(notice.created_at)}</time>
                            </div>
                        </div>
                    </div>

                    {canManage && (
                        <div className="flex justify-center gap-2 pt-2">
                            <Link href={`/notice/edit/${id}`}>
                                <Button variant="outline" size="sm" className="rounded-xl gap-2 font-bold hover:bg-muted">
                                    <Pencil className="w-4 h-4" /> 수정하기
                                </Button>
                            </Link>
                            <Button variant="outline" size="sm" className="rounded-xl gap-2 font-bold text-destructive hover:bg-destructive/10 border-destructive/20" onClick={handleDelete}>
                                <Trash2 className="w-4 h-4" /> 삭제
                            </Button>
                        </div>
                    )}
                </header>
                
                {/* 본문 섹션 */}
                <div className="min-h-[500px] border-y py-12 px-2">
                    <div className="prose dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-img:rounded-2xl prose-img:shadow-lg ql-editor !p-0">
                        {isHtml ? (
                            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                        ) : (
                            <MarkdownRenderer post={sanitizedContent} />
                        )}
                    </div>
                </div>

                {/* 하단 네비게이션 */}
                <div className="mt-16 flex flex-col sm:flex-row justify-between items-center gap-8 border-t pt-12">
                    <Link href="/notice">
                        <Button variant="ghost" size="lg" className="rounded-2xl px-8 h-14 font-black transition-all group gap-3 hover:bg-muted">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            목록으로 돌아가기
                        </Button>
                    </Link>
                    <p className="text-muted-foreground text-sm font-medium italic">© COMA. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
