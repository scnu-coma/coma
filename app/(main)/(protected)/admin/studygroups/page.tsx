"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, BookOpen, Users, PlayCircle, CheckCircle2, Search } from "lucide-react";
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
    const [searchTerm, setSearchTerm] = useState("");
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

    const filteredGroups = groups.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()) || g.leader_name.toLowerCase().includes(searchTerm.toLowerCase()));

    const stats = {
        total: groups.length,
        recruiting: groups.filter(g => g.status === "RECRUITING").length,
        inProgress: groups.filter(g => g.status === "IN_PROGRESS").length,
        finished: groups.filter(g => g.status === "FINISHED").length,
    };

    return (
        <div className="p-6 pt-12 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-primary flex items-center gap-3">
                        <BookOpen className="w-8 h-8" /> 스터디 그룹 관리
                    </h1>
                    <p className="text-muted-foreground mt-1 text-lg">운영 중인 스터디 그룹의 현황을 파악하고 관리합니다.</p>
                </div>
                
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2 h-12 px-6 font-bold shadow-lg shadow-primary/20 rounded-xl transition-all hover:-translate-y-1">
                            <Plus className="h-5 w-5" />
                            <span>새 스터디 등록</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-3xl">
                        <DialogHeader className="p-4">
                            <DialogTitle className="text-2xl font-black">새로운 스터디 그룹 등록</DialogTitle>
                            <CardDescription>스터디의 기본 정보를 입력하여 부원들에게 공개하세요.</CardDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4 px-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-bold">스터디 제목</Label>
                                <Input id="title" value={newGroup.title} placeholder="예: React 마스터 클래스" className="h-11 rounded-xl border-2" 
                                    onChange={e => setNewGroup({...newGroup, title: e.target.value})} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="leader" className="font-bold">리더명</Label>
                                    <Input id="leader" value={newGroup.leader_name} placeholder="이름" className="h-11 rounded-xl border-2" 
                                        onChange={e => setNewGroup({...newGroup, leader_name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="max" className="font-bold">최대 인원</Label>
                                    <Input id="max" type="number" value={newGroup.max_members} className="h-11 rounded-xl border-2" 
                                        onChange={e => setNewGroup({...newGroup, max_members: parseInt(e.target.value)})} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="desc" className="font-bold">스터디 설명</Label>
                                <Textarea id="desc" value={newGroup.description} placeholder="학습 목표, 커리큘럼 등을 간단히 적어주세요." className="min-h-[120px] rounded-xl border-2 resize-none" 
                                    onChange={e => setNewGroup({...newGroup, description: e.target.value})} />
                            </div>
                        </div>
                        <DialogFooter className="p-4 bg-muted/30 rounded-b-3xl">
                            <Button variant="ghost" onClick={() => setIsCreateOpen(false)} className="font-bold">취소</Button>
                            <Button onClick={handleCreate} className="px-8 font-bold rounded-xl shadow-lg shadow-primary/20">스터디 개설하기</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* 통계 대시보드 */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="border-2 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-widest">전체 스터디</CardTitle>
                        <BookOpen className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black">{stats.total}개</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-orange-100 bg-orange-50/10 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-orange-600 uppercase tracking-widest">모집 중</CardTitle>
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-orange-700">{stats.recruiting}개</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-blue-100 bg-blue-50/10 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-blue-600 uppercase tracking-widest">진행 중</CardTitle>
                        <PlayCircle className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-blue-700">{stats.inProgress}개</div>
                    </CardContent>
                </Card>
                <Card className="border-2 border-green-100 bg-green-50/10 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-bold text-green-600 uppercase tracking-widest">종료됨</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black text-green-700">{stats.finished}개</div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-2 max-w-sm">
                    <div className="relative w-full">
                        <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                        <Input 
                            placeholder="스터디명 또는 리더 검색..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 rounded-xl border-2 shadow-sm"
                        />
                    </div>
                </div>

                <Card className="border-2 rounded-[2rem] overflow-hidden shadow-xl shadow-neutral-100 dark:shadow-none">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="font-bold py-5 px-6">스터디 그룹 정보</TableHead>
                                <TableHead className="font-bold">리더</TableHead>
                                <TableHead className="font-bold text-center">인원 설정</TableHead>
                                <TableHead className="font-bold">현재 상태</TableHead>
                                <TableHead className="font-bold">상태 변경</TableHead>
                                <TableHead className="text-right font-bold pr-6">삭제</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={6} className="text-center py-24 text-muted-foreground">목록을 불러오는 중입니다...</TableCell></TableRow>
                            ) : filteredGroups.length === 0 ? (
                                <TableRow><TableCell colSpan={6} className="text-center py-24 text-muted-foreground">검색 결과가 없습니다.</TableCell></TableRow>
                            ) : (
                                filteredGroups.map((group) => (
                                    <TableRow key={group.id} className="group hover:bg-muted/30 transition-colors">
                                        <TableCell className="py-5 px-6">
                                            <div className="space-y-1">
                                                <div className="font-black text-lg group-hover:text-primary transition-colors">{group.title}</div>
                                                <p className="text-sm text-muted-foreground line-clamp-1 max-w-xs">{group.description}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 font-bold">
                                                <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">
                                                    {group.leader_name.charAt(0)}
                                                </div>
                                                {group.leader_name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-bold">
                                            <Badge variant="outline" className="px-3 border-2">{group.max_members}명</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge className={`font-bold ${
                                                group.status === "RECRUITING" ? "bg-orange-500 hover:bg-orange-600" :
                                                group.status === "IN_PROGRESS" ? "bg-blue-500 hover:bg-blue-600" : "bg-neutral-500"
                                            }`}>
                                                {group.status === "RECRUITING" ? "모집 중" :
                                                 group.status === "IN_PROGRESS" ? "진행 중" : "종료됨"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Select value={group.status} onValueChange={(val) => updateStatus(group.id, val)}>
                                                <SelectTrigger className="w-32 h-10 font-bold border-2 rounded-lg">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="rounded-xl border-2">
                                                    <SelectItem value="RECRUITING" className="font-bold text-orange-600">모집 중</SelectItem>
                                                    <SelectItem value="IN_PROGRESS" className="font-bold text-blue-600">진행 중</SelectItem>
                                                    <SelectItem value="FINISHED" className="font-bold text-neutral-600">종료됨</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 rounded-lg" onClick={() => deleteGroup(group.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
