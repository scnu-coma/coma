"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

interface User {
    id: number;
    email: string;
    name: string;
    student_id: string;
    department: string;
    role: "USER" | "ADMIN";
    status: "APPROVED" | "PENDING" | "REJECTED";
}

export default function AdminAllMembersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [editForm, setEditForm] = useState({
        email: "",
        name: "",
        student_id: "",
        department: "",
        password: "",
        role: "USER" as "USER" | "ADMIN",
        status: "PENDING" as "APPROVED" | "PENDING" | "REJECTED"
    });

    const fetchUsers = async () => {
        const res = await fetch("/api/admin/members/all");
        if (res.ok) setUsers(await res.json());
    };

    useEffect(() => { fetchUsers(); }, []);

    const handleEditClick = (user: User) => {
        setEditingUser(user);
        setEditForm({
            email: user.email,
            name: user.name,
            student_id: user.student_id,
            department: user.department,
            password: "", // 비밀번호는 보안상 빈 값으로 시작
            role: user.role,
            status: user.status
        });
    };

    const handleUpdate = async () => {
        if (!editingUser) return;
        
        try {
            const res = await fetch("/api/admin/members/update", {
                method: "PATCH",
                body: JSON.stringify({ userId: editingUser.id, ...editForm }),
                headers: { "Content-Type": "application/json" },
            });
            
            if (res.ok) {
                toast.success("회원 정보가 수정되었습니다.");
                setEditingUser(null);
                fetchUsers();
            } else {
                toast.error("정보 수정에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        }
    };

    const filteredUsers = users.filter(u => 
        u.name.includes(search) || u.student_id.includes(search) || u.email.includes(search)
    );

    return (
        <div className="p-6 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="text-2xl font-bold">전체 부원 관리</CardTitle>
                    <Input placeholder="이름, 학번, 이메일로 검색..." className="max-w-xs" value={search} onChange={e => setSearch(e.target.value)} />
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>이름 (학번)</TableHead>
                                <TableHead>학과</TableHead>
                                <TableHead>이메일</TableHead>
                                <TableHead>상태 / 권한</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex flex-col">
                                            <span>{user.name}</span>
                                            <span className="text-xs text-muted-foreground">{user.student_id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{user.department}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={user.status === 'APPROVED' ? 'default' : 'secondary'}>
                                                {user.status}
                                            </Badge>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)}>
                                            <Settings2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* 회원 정보 수정 다이얼로그 */}
            <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>회원 정보 강제 수정</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">이름</Label>
                            <Input id="name" value={editForm.name} className="col-span-3" 
                                onChange={e => setEditForm({...editForm, name: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="student_id" className="text-right">학번</Label>
                            <Input id="student_id" value={editForm.student_id} className="col-span-3" 
                                onChange={e => setEditForm({...editForm, student_id: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">이메일</Label>
                            <Input id="email" value={editForm.email} className="col-span-3" 
                                onChange={e => setEditForm({...editForm, email: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="department" className="text-right">학과</Label>
                            <Input id="department" value={editForm.department} className="col-span-3" 
                                onChange={e => setEditForm({...editForm, department: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">상태</Label>
                            <Select value={editForm.status} onValueChange={(val: any) => setEditForm({...editForm, status: val})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="PENDING">인증 대기</SelectItem>
                                    <SelectItem value="APPROVED">가입 승인</SelectItem>
                                    <SelectItem value="REJECTED">가입 거절</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">권한</Label>
                            <Select value={editForm.role} onValueChange={(val: any) => setEditForm({...editForm, role: val})}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="USER">일반 부원</SelectItem>
                                    <SelectItem value="ADMIN">관리자</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 border-t pt-4">
                            <Label htmlFor="pass" className="text-right font-bold text-red-500">비번 초기화</Label>
                            <Input id="pass" type="password" placeholder="변경할 때만 입력" className="col-span-3" 
                                onChange={e => setEditForm({...editForm, password: e.target.value})} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditingUser(null)}>취소</Button>
                        <Button type="submit" onClick={handleUpdate}>저장하기</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
