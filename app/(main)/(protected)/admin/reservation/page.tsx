"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export default function AdminReservationPage() {
    const [reservations, setReservations] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAdminData = async () => {
        try {
            const res = await fetch("/api/admin/reservation");
            if (res.ok) {
                const data = await res.json();
                setReservations(data.reservations);
                setIsOpen(data.is_open);
            }
        } catch (error) {
            toast.error("데이터를 불러오는 데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchAdminData(); }, []);

    const toggleSystem = async (checked: boolean) => {
        try {
            const res = await fetch("/api/admin/reservation", {
                method: "PATCH",
                body: JSON.stringify({ action: "toggle", isOpen: checked }),
                headers: { "Content-Type": "application/json" }
            });
            
            const data = await res.json().catch(() => ({ message: "서버 응답 오류" }));
            
            if (res.ok) {
                setIsOpen(checked);
                toast.success(data.message || `예약 시스템이 ${checked ? '활성화' : '비활성화'}되었습니다.`);
            } else {
                toast.error(data.message || "설정 변경에 실패했습니다.");
                // 서버 상태와 동기화 (토글 상태 원복)
                fetchAdminData();
            }
        } catch (error) {
            console.error("Toggle error:", error);
            toast.error("네트워크 오류가 발생했습니다.");
            fetchAdminData();
        }
    };

    const handleAction = async (reservationId: number, status: string) => {
        try {
            const res = await fetch("/api/admin/reservation", {
                method: "PATCH",
                body: JSON.stringify({ action: "approve", reservationId, status }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                toast.success(status === "APPROVED" ? "승인되었습니다." : "거절되었습니다.");
                fetchAdminData();
            }
        } catch (error) {
            toast.error("처리 실패");
        }
    };

    return (
        <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">부실 예약 관리</h1>
                    <p className="text-muted-foreground">부원들의 동아리방 사용 신청을 관리합니다.</p>
                </div>
                <Card className="flex items-center gap-4 px-6 py-4">
                    <div className="space-y-0.5">
                        <div className="text-sm font-bold">예약 시스템 스위치</div>
                        <div className="text-xs text-muted-foreground">{isOpen ? "현재 부원들이 신청 가능합니다" : "현재 신청이 불가능합니다"}</div>
                    </div>
                    <Switch checked={isOpen} onCheckedChange={toggleSystem} />
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>예약 신청 내역</CardTitle>
                    <CardDescription>모든 예약 신청 건에 대한 승인/거절을 관리합니다.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>신청자</TableHead>
                                <TableHead>날짜</TableHead>
                                <TableHead>시간</TableHead>
                                <TableHead>목적</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reservations.length === 0 ? (
                                <TableRow><TableCell colSpan={6} className="text-center py-10">신청 내역이 없습니다.</TableCell></TableRow>
                            ) : (
                                reservations.map((res) => (
                                    <TableRow key={res.id}>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-bold">{res.user_name}</span>
                                                <span className="text-xs text-muted-foreground">{res.student_id}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{res.reservation_date.split('T')[0]}</TableCell>
                                        <TableCell>{res.start_time.substring(0, 5)} ~ {res.end_time.substring(0, 5)}</TableCell>
                                        <TableCell className="max-w-[200px] truncate">{res.title}</TableCell>
                                        <TableCell>
                                            <Badge variant={res.status === 'APPROVED' ? 'default' : res.status === 'PENDING' ? 'secondary' : 'destructive'}>
                                                {res.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            {res.status === 'PENDING' && (
                                                <>
                                                    <Button size="icon" variant="outline" className="text-green-600 hover:text-green-700 hover:bg-green-50" onClick={() => handleAction(res.id, 'APPROVED')}>
                                                        <Check className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleAction(res.id, 'REJECTED')}>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
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
