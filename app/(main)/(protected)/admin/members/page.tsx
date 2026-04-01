"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PendingUser {
    id: number;
    email: string;
    name: string;
    student_id: string;
    department: string;
    status: string;
    created_at: string;
}

export default function AdminMembersPage() {
    const [members, setMembers] = useState<PendingUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPendingMembers = async () => {
        try {
            const res = await fetch("/api/admin/members");
            if (res.ok) {
                const data = await res.json();
                setMembers(data);
            }
        } catch (error) {
            toast.error("부원 목록을 불러오는 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingMembers();
    }, []);

    const handleAction = async (userId: number, status: "APPROVED" | "REJECTED") => {
        try {
            const res = await fetch("/api/admin/members", {
                method: "PATCH",
                body: JSON.stringify({ userId, status }),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success(status === "APPROVED" ? "승인되었습니다." : "거절되었습니다.");
                fetchPendingMembers(); // 목록 새로고침
            } else {
                toast.error("처리에 실패했습니다.");
            }
        } catch (error) {
            toast.error("서버 오류가 발생했습니다.");
        }
    };

    if (isLoading) return <div className="p-8 text-center text-muted-foreground">목록을 불러오는 중...</div>;

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">부원 가입 승인 관리</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>이름</TableHead>
                                <TableHead>학번</TableHead>
                                <TableHead>학과</TableHead>
                                <TableHead>이메일</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead className="text-right">작업</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                        대기 중인 가입 신청이 없습니다.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                members.map((member) => (
                                    <TableRow key={member.id}>
                                        <TableCell className="font-medium">{member.name}</TableCell>
                                        <TableCell>{member.student_id}</TableCell>
                                        <TableCell>{member.department}</TableCell>
                                        <TableCell>{member.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                                승인 대기
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button 
                                                size="sm" 
                                                variant="default" 
                                                onClick={() => handleAction(member.id, "APPROVED")}
                                            >
                                                승인
                                            </Button>
                                            <Button 
                                                size="sm" 
                                                variant="destructive" 
                                                onClick={() => handleAction(member.id, "REJECTED")}
                                            >
                                                거절
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
