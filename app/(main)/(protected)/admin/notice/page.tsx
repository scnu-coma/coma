"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Editor from "@/components/notice/editor";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function AdminNoticePage() {
    const [notices, setNotices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingNotice, setEditingNotice] = useState<any>(null);
    
    const [form, setForm] = useState({
        title: "",
        content: ""
    });

    const fetchNotices = async () => {
        try {
            const res = await fetch("/api/notice");
            if (res.ok) setNotices(await res.json());
        } catch (error) {
            toast.error("공지사항을 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchNotices(); }, []);

    const handleSave = async () => {
        if (!form.title || !form.content) {
            toast.error("제목과 내용을 모두 입력해주세요.");
            return;
        }

        try {
            const url = editingNotice ? `/api/notice/${editingNotice.id}` : "/api/notice";
            const method = editingNotice ? "PATCH" : "POST";
            
            const res = await fetch(url, {
                method,
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success(editingNotice ? "수정되었습니다." : "등록되었습니다.");
                setIsDialogOpen(false);
                setEditingNotice(null);
                setForm({ title: "", content: "" });
                fetchNotices();
            } else {
                toast.error("저장에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말로 삭제하시겠습니까?")) return;
        
        try {
            const res = await fetch(`/api/notice/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("삭제되었습니다.");
                fetchNotices();
            }
        } catch (error) {
            toast.error("삭제 실패");
        }
    };

    const openEdit = (notice: any) => {
        setEditingNotice(notice);
        // We need to fetch full content since the list API doesn't return it
        fetch(`/api/notice/${notice.id}`)
            .then(res => res.json())
            .then(data => {
                setForm({ title: data.title, content: data.content });
                setIsDialogOpen(true);
            });
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">공지사항 관리</h1>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) { setEditingNotice(null); setForm({ title: "", content: "" }); }
                }}>
                    <DialogTrigger asChild>
                        <Button className="gap-2"><Plus className="w-4 h-4" /> 새 공지 작성</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                        <DialogHeader>
                            <DialogTitle>{editingNotice ? "공지사항 수정" : "새 공지사항 작성"}</DialogTitle>
                        </DialogHeader>
                        <div className="flex-1 overflow-y-auto space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">제목</Label>
                                <Input id="title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="제목을 입력하세요" />
                            </div>
                            <div className="space-y-2">
                                <Label>내용</Label>
                                <Editor value={form.content} onChange={val => setForm({...form, content: val})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>취소</Button>
                            <Button onClick={handleSave}>저장하기</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="pt-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>제목</TableHead>
                                <TableHead>작성자</TableHead>
                                <TableHead>작성일</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-10">로딩 중...</TableCell></TableRow>
                            ) : notices.length === 0 ? (
                                <TableRow><TableCell colSpan={4} className="text-center py-10">등록된 공지사항이 없습니다.</TableCell></TableRow>
                            ) : (
                                notices.map((notice) => (
                                    <TableRow key={notice.id}>
                                        <TableCell className="font-medium">{notice.title}</TableCell>
                                        <TableCell>{notice.author_name}</TableCell>
                                        <TableCell>{new Date(notice.created_at).toLocaleDateString()}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="icon" variant="ghost" onClick={() => openEdit(notice)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDelete(notice.id)}>
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
