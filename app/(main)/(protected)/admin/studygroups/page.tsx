"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface StudyGroup {
    id: number;
    title: string;
    description: string;
    leader_name: string;
    max_members: number;
    status: "RECRUITING" | "IN_PROGRESS" | "FINISHED";
    created_at: string;
}

export default function AdminStudyGroupsPage() {
    const [groups, setGroups] = useState<StudyGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [newGroup, setNewGroup] = useState({
        title: "",
        description: "",
        leader_name: "",
        max_members: 10
    });

    const fetchGroups = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/studygroups");
            if (res.ok) {
                const data = await res.json();
                setGroups(data);
            }
        } catch (error) {
            toast.error("스터디 목록을 불러오지 못했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleCreate = async () => {
        if (!newGroup.title || !newGroup.leader_name) {
            toast.error("제목과 리더 이름은 필수입니다.");
            return;
        }

        try {
            const res = await fetch("/api/admin/studygroups", {
                method: "POST",
                body: JSON.stringify(newGroup),
                headers: { "Content-Type": "application/json" },
            });

            if (res.ok) {
                toast.success("스터디 그룹이 등록되었습니다.");
                setIsCreateOpen(false);
                setNewGroup({ title: "", description: "", leader_name: "", max_members: 10 });
                fetchGroups();
            } else {
                toast.error("등록에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        }
    };

    const updateStatus = async (id: number, status: string) => {
        try {
            const res = await fetch("/api/admin/studygroups", {
                method: "PATCH",
                body: JSON.stringify({ id, status }),
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) {
                toast.success("상태가 변경되었습니다.");
                fetchGroups();
            } else {
                toast.error("상태 변경에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        }
    };

    const deleteGroup = async (id: number) => {
        if (!confirm("정말 이 스터디 그룹을 삭제하시겠습니까?")) return;

        try {
            const res = await fetch(`/api/admin/studygroups?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                toast.success("삭제되었습니다.");
                fetchGroups();
            } else {
                toast.error("삭제에 실패했습니다.");
            }
        } catch (error) {
            toast.error("오류가 발생했습니다.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">스터디 그룹 관리</h1>
                
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            <span>새 스터디 등록</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>새로운 스터디 그룹 등록</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">제목</Label>
                                <Input id="title" value={newGroup.title} className="col-span-3" 
                                    onChange={e => setNewGroup({...newGroup, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="leader" className="text-right">리더명</Label>
                                <Input id="leader" value={newGroup.leader_name} className="col-span-3" 
                                    onChange={e => setNewGroup({...newGroup, leader_name: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="max" className="text-right">최대인원</Label>
                                <Input id="max" type="number" value={newGroup.max_members} className="col-span-3" 
                                    onChange={e => setNewGroup({...newGroup, max_members: parseInt(e.target.value)})} />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="desc" className="text-right pt-2">설명</Label>
                                <Textarea id="desc" value={newGroup.description} className="col-span-3" 
                                    onChange={e => setNewGroup({...newGroup, description: e.target.value})} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>취소</Button>
                            <Button onClick={handleCreate}>등록하기</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>운영 중인 스터디 목록</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>제목</TableHead>
                                <TableHead>리더</TableHead>
                                <TableHead>최대 인원</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead>작업</TableHead>
                                <TableHead>삭제</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10">로딩 중...</TableCell>
                                </TableRow>
                            ) : groups.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">등록된 스터디가 없습니다.</TableCell>
                                </TableRow>
                            ) : (
                                groups.map((group) => (
                                    <TableRow key={group.id}>
                                        <TableCell className="font-medium">{group.title}</TableCell>
                                        <TableCell>{group.leader_name}</TableCell>
                                        <TableCell>{group.max_members}명</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                group.status === "RECRUITING" ? "default" :
                                                group.status === "IN_PROGRESS" ? "secondary" : "outline"
                                            }>
                                                {group.status === "RECRUITING" ? "모집 중" :
                                                 group.status === "IN_PROGRESS" ? "진행 중" : "종료"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Select value={group.status} onValueChange={(val) => updateStatus(group.id, val)}>
                                                <SelectTrigger className="w-32">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="RECRUITING">모집 중</SelectItem>
                                                    <SelectItem value="IN_PROGRESS">진행 중</SelectItem>
                                                    <SelectItem value="FINISHED">종료</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteGroup(group.id)}>
                                                <Trash2 className="h-4 w-4" />
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
