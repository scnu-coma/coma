"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import PostHeader from "@/components/posts/post-header";
import { Button } from "@/components/ui/button";
import { parseDate } from "@/lib/parse-date";
import Link from "next/link";
import { toast } from "sonner";
import DOMPurify from "dompurify";

export default function NoticeDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [notice, setNotice] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNotice = async () => {
            try {
                const res = await fetch(`/api/notice/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setNotice(data);
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

        if (id) fetchNotice();
    }, [id, router]);

    if (isLoading) return <div className="py-20 text-center text-muted-foreground">로딩 중...</div>;
    if (!notice) return null;

    // Sanitize HTML content
    const sanitizedContent = DOMPurify.sanitize(notice.content);

    return (
        <div className="container mx-auto px-4 py-8">
            <PostHeader 
                tag="공지" 
                title={notice.title} 
                date={parseDate(notice.created_at)} 
                author={notice.author_name} 
            />
            
            <div 
                className="prose dark:prose-invert max-w-none my-8 ql-editor"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <div className="w-full flex my-12">
                <Link href="/notice" className="mx-auto">
                    <Button className="w-36 h-12 rounded-3xl hover:cursor-pointer">목록으로</Button>
                </Link>
            </div>
        </div>
    );
}
