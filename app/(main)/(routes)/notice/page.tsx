"use client";

import { useEffect, useState } from "react";
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { DataTable } from "@/components/notice/data-table";
import { columns } from "@/components/notice/columns";
import Title from "@/components/custom/title";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, Megaphone } from "lucide-react";
import Link from "next/link";

export default function NoticePage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const res = await fetch("/api/notice");
            if (res.ok) {
                const data = await res.json();
                const mappedData = data.map((item: any) => ({
                    id: item.id,
                    title: item.title,
                    author: item.author_name,
                    date: item.created_at,
                    tag: "공지",
                }));
                setPosts(mappedData);
            }
        } catch (error) {
            console.error("Fetch notice error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchPosts(); }, []);

    return (
        <div className="py-12 animate-in fade-in duration-1000 ease-in-out">
            <Title image={bg} title="공지사항" description="코마의 새로운 소식과 주요 안내사항을 확인하세요." />
            
            <div className="max-w-5xl mx-auto mt-20 px-6">
                <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-12 pb-6 border-b-2">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-primary font-black text-xs tracking-tighter uppercase mb-1">
                            <Megaphone className="w-3 h-3" /> Latest Updates
                        </div>
                        <h2 className="text-3xl font-black tracking-tight">전체 공지사항</h2>
                        <p className="text-muted-foreground text-sm font-medium">코마 부원들이 꼭 확인해야 할 소식들입니다.</p>
                    </div>
                    {user?.role === "ADMIN" && (
                        <Link href="/notice/write">
                            <Button className="gap-2 h-12 px-8 font-black shadow-xl shadow-primary/20 rounded-xl transition-all hover:-translate-y-1 active:scale-95">
                                <Plus className="w-5 h-5" /> 새 글 작성
                            </Button>
                        </Link>
                    )}
                </div>

                {isLoading ? (
                    <div className="grid gap-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="h-20 bg-muted/30 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="w-full">
                        <DataTable columns={columns} data={posts} />
                    </div>
                )}
            </div>
        </div>
    );
}
