"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";

interface Event {
    id: number;
    title: string;
    from: string;
    to: string;
}

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [newTitle, setNewTitle] = useState("");
    const [newFrom, setNewFrom] = useState("");
    const [newTo, setNewTo] = useState("");

    const fetchEvents = async () => {
        const res = await fetch("/api/admin/events");
        if (res.ok) setEvents(await res.json());
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/admin/events", {
            method: "POST",
            body: JSON.stringify({ title: newTitle, from: newFrom, to: newTo }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("행사가 추가되었습니다.");
            setNewTitle(""); setNewFrom(""); setNewTo("");
            fetchEvents();
        } else {
            toast.error("추가 실패");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const res = await fetch(`/api/admin/events?id=${id}`, { method: "DELETE" });
        if (res.ok) {
            toast.success("삭제되었습니다.");
            fetchEvents();
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">일정 관리</h1>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="w-5 h-5" /> 새 행사 추가
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Input placeholder="행사명" value={newTitle} onChange={e => setNewTitle(e.target.value)} required />
                        <Input type="date" value={newFrom} onChange={e => setNewFrom(e.target.value)} required />
                        <Input type="date" value={newTo} onChange={e => setNewTo(e.target.value)} required />
                        <Button type="submit" className="font-bold">행사 등록</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>전체 행사 목록</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>행사명</TableHead>
                                <TableHead>시작일</TableHead>
                                <TableHead>종료일</TableHead>
                                <TableHead className="text-right">작업</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.id}>
                                    <TableCell className="font-medium">{event.title}</TableCell>
                                    <TableCell>{event.from.split('T')[0]}</TableCell>
                                    <TableCell>{event.to.split('T')[0]}</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(event.id)}>
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
