"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";
import { 
    Users, 
    UserCheck, 
    Clock, 
    Search, 
    FileText, 
    Trash2,
    BarChart3,
    CheckCircle2,
    XCircle,
    MessageSquare,
    Settings2,
    ClipboardList,
    LayoutDashboard,
    Link as LinkIcon
} from "lucide-react";

interface Applicant {
    id: number;
    name: string;
    student_id: string;
    phone: string;
    department: string;
    motive: string;
    introduction: string;
    study_groups: string;
    status: 'PENDING' | 'INTERVIEW' | 'APPROVED' | 'REJECTED';
    created_at: string;
}

interface Stats {
    total: number;
    byStatus: { status: string, count: number }[];
    byDept: { department: string, count: number }[];
    byStudyGroup: { [key: string]: number };
}

export default function IntegratedRecruitmentAdminPage() {
    // Settings State
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [term, setTerm] = useState(1);
    const [year, setYear] = useState(2026);
    const [googleFormUrl, setGoogleFormUrl] = useState("");

    // Data State
    const [applicants, setApplicants] = useState<Applicant[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [settingsRes, appRes, statsRes] = await Promise.all([
                fetch("/api/recruitment/settings"),
                fetch("/api/admin/applicants"),
                fetch("/api/admin/applicants/stats")
            ]);
            
            if (settingsRes.ok) {
                const data = await settingsRes.json();
                setIsOpen(data.is_open);
                setStartDate(data.start_date.split('T')[0]);
                setEndDate(data.end_date.split('T')[0]);
                setTerm(data.term);
                setYear(data.year);
                setGoogleFormUrl(data.google_form_url || "");
            }
            if (appRes.ok) setApplicants(await appRes.json());
            if (statsRes.ok) setStats(await statsRes.json());
        } catch (error) {
            toast.error("데이터를 불러오는데 실패했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleSaveSettings = async () => {
        const res = await fetch("/api/recruitment/settings", {
            method: "PATCH",
            body: JSON.stringify({ 
                is_open: isOpen, 
                start_date: startDate, 
                end_date: endDate, 
                term, 
                year,
                google_form_url: googleFormUrl
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("모집 설정이 저장되었습니다.");
        } else {
            toast.error("저장 실패");
        }
    };

    const handleUpdateStatus = async (id: number, newStatus: string) => {
        try {
            const res = await fetch("/api/admin/applicants", {
                method: "PATCH",
                body: JSON.stringify({ id, status: newStatus }),
                headers: { "Content-Type": "application/json" }
            });
            if (res.ok) {
                toast.success("상태가 변경되었습니다.");
                if (selectedApplicant?.id === id) {
                    setSelectedApplicant(prev => prev ? { ...prev, status: newStatus as any } : null);
                }
                fetchData();
            }
        } catch (error) {
            toast.error("변경 실패");
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm("정말 이 지원서를 삭제하시겠습니까?")) return;
        try {
            const res = await fetch(`/api/admin/applicants?id=${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("삭제되었습니다.");
                setIsDetailOpen(false);
                fetchData();
            }
        } catch (error) {
            toast.error("삭제 실패");
        }
    };

    const openDetail = async (id: number) => {
        try {
            const res = await fetch(`/api/admin/applicants?id=${id}`);
            if (res.ok) {
                setSelectedApplicant(await res.json());
                setIsDetailOpen(true);
            }
        } catch (error) {
            toast.error("상세 정보를 가져오는데 실패했습니다.");
        }
    };

    const filteredApplicants = applicants.filter(a => 
        a.name.includes(searchTerm) || 
        a.student_id.includes(searchTerm) || 
        a.department.includes(searchTerm)
    );

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'PENDING': return <Badge variant="secondary">대기중</Badge>;
            case 'INTERVIEW': return <Badge variant="default" className="bg-blue-500">면접예정</Badge>;
            case 'APPROVED': return <Badge variant="default" className="bg-green-600">합격</Badge>;
            case 'REJECTED': return <Badge variant="destructive">불합격</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-primary">부원 모집 관리 센터</h1>
                <p className="text-muted-foreground mt-1">모집 설정부터 지원자 관리, 통계까지 한 곳에서 제어하세요.</p>
            </div>

            <Tabs defaultValue="dashboard" className="w-full">
                <TabsList className="grid w-full grid-cols-3 h-14 p-1 bg-muted/50 rounded-2xl mb-8">
                    <TabsTrigger value="dashboard" className="rounded-xl gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <LayoutDashboard className="w-4 h-4" /> 지원 현황
                    </TabsTrigger>
                    <TabsTrigger value="applicants" className="rounded-xl gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <ClipboardList className="w-4 h-4" /> 지원자 명단
                    </TabsTrigger>
                    <TabsTrigger value="settings" className="rounded-xl gap-2 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Settings2 className="w-4 h-4" /> 모집 설정
                    </TabsTrigger>
                </TabsList>

                {/* 1. 지원 현황 (대시보드) */}
                <TabsContent value="dashboard" className="space-y-6">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card className="border-2">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-bold text-muted-foreground">전체 지원자</CardTitle>
                                <Users className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black">{stats?.total || 0}</div>
                                <p className="text-xs text-muted-foreground mt-1">이번 학기 누적 지원</p>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-orange-100 bg-orange-50/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-bold text-orange-600">검토 대기</CardTitle>
                                <Clock className="h-4 w-4 text-orange-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-orange-700">
                                    {stats?.byStatus.find(s => s.status === 'PENDING')?.count || 0}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-blue-100 bg-blue-50/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-bold text-blue-600">면접 예정</CardTitle>
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-blue-700">
                                    {stats?.byStatus.find(s => s.status === 'INTERVIEW')?.count || 0}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-2 border-green-100 bg-green-50/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-bold text-green-600">최종 합격</CardTitle>
                                <UserCheck className="h-4 w-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-3xl font-black text-green-700">
                                    {stats?.byStatus.find(s => s.status === 'APPROVED')?.count || 0}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-2">
                            <CardHeader><CardTitle className="text-lg">학과별 분포 (Top 5)</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {stats?.byDept.map((d, i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{d.department}</span>
                                            <span className="font-black">{d.count}명</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-3">
                                            <div 
                                                className="bg-primary h-3 rounded-full transition-all duration-1000" 
                                                style={{ width: `${(d.count / (stats.total || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!stats || stats.byDept.length === 0) && <p className="text-center text-muted-foreground py-10">데이터가 없습니다.</p>}
                            </CardContent>
                        </Card>

                        <Card className="border-2">
                            <CardHeader><CardTitle className="text-lg">관심 스터디 그룹</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {stats && Object.entries(stats.byStudyGroup).map(([group, count], i) => (
                                    <div key={i} className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium">{group}</span>
                                            <span className="font-black text-blue-600">{count}명</span>
                                        </div>
                                        <div className="w-full bg-muted rounded-full h-3">
                                            <div 
                                                className="bg-blue-500 h-3 rounded-full transition-all duration-1000" 
                                                style={{ width: `${(count / (stats.total || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {(!stats || Object.keys(stats.byStudyGroup).length === 0) && <p className="text-center text-muted-foreground py-10">데이터가 없습니다.</p>}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* 2. 지원자 명단 */}
                <TabsContent value="applicants" className="space-y-4">
                    <div className="flex items-center gap-2 max-w-sm mb-4">
                        <Search className="w-4 h-4 text-muted-foreground ml-3 absolute" />
                        <Input 
                            placeholder="이름, 학번, 학과 검색..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 h-11 rounded-xl border-2"
                        />
                    </div>

                    <Card className="border-2 rounded-2xl overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="font-bold">이름</TableHead>
                                    <TableHead className="font-bold">학번</TableHead>
                                    <TableHead className="font-bold">학과</TableHead>
                                    <TableHead className="font-bold">상태</TableHead>
                                    <TableHead className="font-bold">지원일시</TableHead>
                                    <TableHead className="text-right font-bold">상세보기</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {isLoading ? (
                                    <TableRow><TableCell colSpan={6} className="text-center py-20">로딩 중...</TableCell></TableRow>
                                ) : filteredApplicants.length === 0 ? (
                                    <TableRow><TableCell colSpan={6} className="text-center py-20">지원자가 없습니다.</TableCell></TableRow>
                                ) : (
                                    filteredApplicants.map((app) => (
                                        <TableRow key={app.id} className="cursor-pointer hover:bg-muted/30 group" onClick={() => openDetail(app.id)}>
                                            <TableCell className="font-bold group-hover:text-primary transition-colors">{app.name}</TableCell>
                                            <TableCell>{app.student_id}</TableCell>
                                            <TableCell>{app.department}</TableCell>
                                            <TableCell>{getStatusBadge(app.status)}</TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {new Date(app.created_at).toLocaleString()}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" className="rounded-lg">보기</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                {/* 3. 모집 설정 */}
                <TabsContent value="settings">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="border-2">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Settings2 className="w-5 h-5 text-primary" /> 핵심 설정</CardTitle>
                                <CardDescription>모집 기간과 연도/학기를 설정합니다.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between p-5 bg-primary/5 border border-primary/10 rounded-2xl">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-bold">모집 상태 스위치</Label>
                                        <p className="text-sm text-muted-foreground">ON 상태에서는 기간에 상관없이 모집 버튼이 활성화됩니다.</p>
                                    </div>
                                    <Switch checked={isOpen} onCheckedChange={setIsOpen} />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold">모집 시작일</Label>
                                        <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="h-11 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold">모집 종료일</Label>
                                        <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="h-11 rounded-xl" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="font-bold">학기</Label>
                                        <Input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} min={1} max={2} className="h-11 rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="font-bold">연도</Label>
                                        <Input type="number" value={year} onChange={e => setYear(Number(e.target.value))} className="h-11 rounded-xl" />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t p-6">
                                <Button className="w-full h-12 text-lg font-bold rounded-xl" onClick={handleSaveSettings}>설정 저장하기</Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-2 border-dashed border-muted-foreground/20">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><LinkIcon className="w-5 h-5 text-muted-foreground" /> 외부 폼 연동 (선택)</CardTitle>
                                <CardDescription>내부 폼 대신 구글 폼 등을 사용하고 싶을 때 입력하세요.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="font-bold">지원 폼 링크</Label>
                                    <Input 
                                        placeholder="https://forms.gle/..." 
                                        value={googleFormUrl} 
                                        onChange={e => setGoogleFormUrl(e.target.value)} 
                                        className="h-11 rounded-xl"
                                    />
                                    <p className="text-xs text-muted-foreground">현재는 내부 지원 시스템 사용을 권장합니다.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* 지원서 상세 다이얼로그 (이전과 동일) */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-0">
                    {selectedApplicant && (
                        <>
                            <DialogHeader className="p-8 border-b bg-muted/30">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <DialogTitle className="text-3xl font-black">{selectedApplicant.name} 부원 지원서</DialogTitle>
                                        <DialogDescription className="mt-2">
                                            지원 일시: {new Date(selectedApplicant.created_at).toLocaleString()}
                                        </DialogDescription>
                                    </div>
                                    <Button variant="outline" size="icon" className="text-destructive border-destructive/20 hover:bg-destructive/10" onClick={() => handleDelete(selectedApplicant.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </DialogHeader>

                            <div className="p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-xs font-bold text-primary uppercase tracking-widest">학적 정보</Label>
                                            <p className="font-black text-xl mt-1">{selectedApplicant.department} / {selectedApplicant.student_id}</p>
                                        </div>
                                        <div>
                                            <Label className="text-xs font-bold text-primary uppercase tracking-widest">연락처</Label>
                                            <p className="font-bold text-lg mt-1">{selectedApplicant.phone}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-xs font-bold text-primary uppercase tracking-widest">현재 처리 상태</Label>
                                            <div className="mt-2">{getStatusBadge(selectedApplicant.status)}</div>
                                        </div>
                                        <div>
                                            <Label className="text-xs font-bold text-primary uppercase tracking-widest">관심 스터디 분야</Label>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedApplicant.study_groups.split(',').map((g, i) => (
                                                    <Badge key={i} variant="outline" className="px-3 py-1 font-bold border-2">{g}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t">
                                    <div className="space-y-3">
                                        <Label className="font-black text-primary text-lg">Q. 자기소개</Label>
                                        <div className="p-6 bg-muted rounded-2xl text-base leading-relaxed whitespace-pre-wrap border-2 border-muted">
                                            {selectedApplicant.introduction}
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="font-black text-primary text-lg">Q. 지원 동기 및 포부</Label>
                                        <div className="p-6 bg-muted rounded-2xl text-base leading-relaxed whitespace-pre-wrap border-2 border-muted">
                                            {selectedApplicant.motive}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <DialogFooter className="p-8 border-t bg-muted/30 flex flex-wrap gap-2 sm:justify-center">
                                <Button variant="secondary" className="font-bold h-11 px-6 rounded-xl" onClick={() => handleUpdateStatus(selectedApplicant.id, 'PENDING')}>대기</Button>
                                <Button variant="outline" className="font-bold h-11 px-6 rounded-xl border-blue-200 text-blue-700 hover:bg-blue-50" onClick={() => handleUpdateStatus(selectedApplicant.id, 'INTERVIEW')}>면접 선정</Button>
                                <Button className="font-bold h-11 px-8 rounded-xl bg-green-600 hover:bg-green-700 text-white" onClick={() => handleUpdateStatus(selectedApplicant.id, 'APPROVED')}>최종 합격 승인</Button>
                                <Button variant="destructive" className="font-bold h-11 px-6 rounded-xl" onClick={() => handleUpdateStatus(selectedApplicant.id, 'REJECTED')}>거절</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
