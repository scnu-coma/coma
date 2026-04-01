"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus } from "lucide-react";

interface Advantage {
    id: number;
    name: string;
    email?: string;
    password?: string;
    tag?: string;
}

export default function AdminAdvantagePage() {
    const [items, setItems] = useState<Advantage[]>([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [tag, setTag] = useState("");

    const fetchItems = async () => {
        const res = await fetch("/api/advantages");
        if (res.ok) setItems(await res.json());
    };

    useEffect(() => { fetchItems(); }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/advantages", {
            method: "POST",
            body: JSON.stringify({ name, email, password, tag }),
            headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
            toast.success("혜택이 추가되었습니다.");
            setName(""); setEmail(""); setPassword(""); setTag("");
            fetchItems();
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const res = await fetch(`/api/advantages?id=${id}`, { method: "DELETE" });
        if (res.ok) { toast.success("삭제되었습니다."); fetchItems(); }
    };

    return (
        <div className="p-6 space-y-8">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Plus className="w-5 h-5"/> 새 혜택 추가</CardTitle></CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <Input placeholder="서비스명 (예: 인프런)" value={name} onChange={e => setName(e.target.value)} required />
                        <Input placeholder="계정 이메일" value={email} onChange={e => setEmail(e.target.value)} />
                        <Input placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                        <Input placeholder="태그 (예: 인강)" value={tag} onChange={e => setTag(e.target.value)} />
                        <Button type="submit">등록</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle>등록된 혜택 목록</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>서비스명</TableHead>
                                <TableHead>계정</TableHead>
                                <TableHead>비밀번호</TableHead>
                                <TableHead>태그</TableHead>
                                <TableHead className="text-right">작업</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.password}</TableCell>
                                    <TableCell>{item.tag}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(item.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
