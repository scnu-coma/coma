"use client";

import { useEffect, useState } from "react";
import Title from "@/components/custom/title";
import bg from "@/public/images/event.webp";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function ReservationPage() {
    const { user } = useAuth();
    const [reservations, setReservations] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    const [form, setForm] = useState({
        date: "",
        startTime: "",
        endTime: "",
        purpose: ""
    });

    const fetchReservations = async () => {
        try {
            const res = await fetch("/api/reservation");
            if (res.ok) {
                const data = await res.json();
                setReservations(data.reservations);
                setIsOpen(data.is_open);
            }
        } catch (error) {
            console.error("Fetch reservations error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchReservations(); }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            toast.error("로그인이 필요합니다.");
            return;
        }

        try {
            const res = await fetch("/api/reservation", {
                method: "POST",
                body: JSON.stringify(form),
                headers: { "Content-Type": "application/json" }
            });

            if (res.ok) {
                toast.success("예약 신청이 완료되었습니다.");
                setForm({ date: "", startTime: "", endTime: "", purpose: "" });
                fetchReservations();
            } else {
                const data = await res.json();
                toast.error(data.message || "신청에 실패했습니다.");
            }
        } catch (error) {
            toast.error("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className="space-y-12 pb-20 animate-in fade-in duration-1000 ease-in-out">
            <Title image={bg} title="부실 예약" description="코마 동아리방을 예약하고 사용해보세요" />

            {!isOpen ? (
                <Card className="max-w-2xl mx-auto border-yellow-200 bg-yellow-50">
                    <CardContent className="py-10 text-center space-y-4">
                        <div className="text-4xl">🚧</div>
                        <h2 className="text-2xl font-bold text-yellow-800">현재 예약 준비 중입니다</h2>
                        <p className="text-yellow-700">관리자가 시스템을 활성화한 후 신청이 가능합니다.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* 예약 신청 폼 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>예약 신청하기</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {!user ? (
                                <div className="py-10 text-center text-muted-foreground">
                                    로그인한 사용자만 예약 신청이 가능합니다.
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">날짜</label>
                                        <Input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">시작 시간</label>
                                            <Input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} required />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">종료 시간</label>
                                            <Input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} required />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">사용 목적</label>
                                        <Input placeholder="예: 스터디 회의, 소모임 등" value={form.purpose} onChange={e => setForm({...form, purpose: e.target.value})} required />
                                    </div>
                                    <Button type="submit" className="w-full h-12 text-lg font-bold">신청 완료</Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    {/* 승인된 예약 목록 */}
                    <Card>
                        <CardHeader>
                            <CardTitle>확정된 예약 목록</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>날짜</TableHead>
                                        <TableHead>시간</TableHead>
                                        <TableHead>사용자</TableHead>
                                        <TableHead>상태</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow><TableCell colSpan={4} className="text-center py-10">로딩 중...</TableCell></TableRow>
                                    ) : reservations.length === 0 ? (
                                        <TableRow><TableCell colSpan={4} className="text-center py-10">확정된 예약이 없습니다.</TableCell></TableRow>
                                    ) : (
                                        reservations.map((res, idx) => (
                                            <TableRow key={idx}>
                                                <TableCell className="font-medium">{res.reservation_date.split('T')[0]}</TableCell>
                                                <TableCell>{res.start_time.substring(0, 5)} ~ {res.end_time.substring(0, 5)}</TableCell>
                                                <TableCell>{res.user_name}</TableCell>
                                                <TableCell><Badge>확정</Badge></TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
