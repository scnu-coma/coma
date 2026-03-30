"use client";

import { useEffect, useState } from "react";
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { DataTable } from "@/components/notice/data-table";
import { columns } from "@/components/notice/columns";
import Title from "@/components/custom/title";
import { toast } from "sonner";

export default function NoticePage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch("/api/notice");
                if (res.ok) {
                    const data = await res.json();
                    // Map DB fields to what components expect
                    const mappedData = data.map((item: any) => ({
                        id: item.id,
                        title: item.title,
                        author: item.author_name,
                        date: item.created_at,
                        tag: "공지", // Default tag for now
                    }));
                    setPosts(mappedData);
                } else {
                    toast.error("공지사항을 불러오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error("Fetch notice error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            {/* 제목 배너 */}
            <Title image={bg} title="공지사항" description="코마 새소식을 가장 먼저 만나보세요" />
            
            {isLoading ? (
                <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
            ) : (
                <DataTable columns={columns} data={posts} />
            )}
        </>
    );
}
