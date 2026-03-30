"use client";

import { useEffect, useState } from "react";
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { DataTable } from "@/components/notice/data-table";
import { columns } from "@/components/notice/columns";
import Title from "@/components/custom/title";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/notice/editor";
import { Plus } from "lucide-react";

export default function NoticePage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });

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

    const handleSave = async () => {
        if (!form.title || !form.content) {
            toast.error("제목과 내용을 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("/api/notice", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success("공지사항이 등록되었습니다.");
                setIsDialogOpen(false);
                setForm({ title: "", content: "" });
                fetchPosts();
            } else {
                toast.error("등록 실패");
            }
        } catch (error) {
            toast.error("오류 발생");
        }
    };

    return (
        <div className="py-8 animate-in fade-in duration-1000 ease-in-out">
            <Title image={bg} title="공지사항" description="코마 새소식을 가장 먼저 만나보세요" />
            
            <div className="mt-12">
                {user?.role === "ADMIN" && (
                    <div className="flex justify-end mb-8">
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="gap-2 h-12 px-6 font-bold shadow-sm"><Plus className="w-5 h-5" /> 글쓰기</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0">
                                <DialogHeader className="p-6 border-b">
                                    <DialogTitle className="text-xl font-bold">새 공지사항 작성</DialogTitle>
                                </DialogHeader>
                                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="font-bold">제목</Label>
                                        <Input 
                                            className="h-12 text-lg px-4"
                                            value={form.title} 
                                            onChange={e => setForm({...form, title: e.target.value})} 
                                            placeholder="공지사항 제목을 입력하세요" 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold">내용</Label>
                                        <Editor value={form.content} onChange={val => setForm({...form, content: val})} />
                                    </div>
                                </div>
                                <DialogFooter className="p-6 border-t bg-muted/20">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                                    <Button onClick={handleSave} className="px-8 font-bold">등록하기</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}

                {isLoading ? (
                    <div className="py-20 text-center text-muted-foreground">로딩 중...</div>
                ) : (
                    <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
                        <DataTable columns={columns} data={posts} />
                    </div>
                )}
            </div>
        </div>
    );
}
