"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AdminRecruitmentPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [term, setTerm] = useState(1);
    const [year, setYear] = useState(2025);

    useEffect(() => {
        const fetchSettings = async () => {
            const res = await fetch("/api/recruitment/settings");
            if (res.ok) {
                const data = await res.json();
                setIsOpen(data.is_open);
                setStartDate(data.start_date.split('T')[0]);
                setEndDate(data.end_date.split('T')[0]);
                setTerm(data.term);
                setYear(data.year);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async () => {
        const res = await fetch("/api/recruitment/settings", {
            method: "PATCH",
            body: JSON.stringify({ is_open: isOpen, start_date: startDate, end_date: endDate, term, year }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            toast.success("모집 설정이 저장되었습니다.");
        } else {
            toast.error("저장 실패");
        }
    };

    return (
        <div className="p-6 space-y-8 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>부원 모집 통합 관리</CardTitle>
                    <CardDescription>사이트 전반의 모집 상태와 기간을 제어합니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="space-y-0.5">
                            <Label className="text-lg font-bold">모집 상태 스위치</Label>
                            <p className="text-sm text-muted-foreground">이 스위치를 켜야만 사이트의 모집 버튼들이 활성화됩니다.</p>
                        </div>
                        <Switch checked={isOpen} onCheckedChange={setIsOpen} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>모집 시작일</Label>
                            <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>모집 종료일</Label>
                            <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>학기</Label>
                            <Input type="number" value={term} onChange={e => setTerm(Number(e.target.value))} min={1} max={2} />
                        </div>
                        <div className="space-y-2">
                            <Label>연도</Label>
                            <Input type="number" value={year} onChange={e => setYear(Number(e.target.value))} />
                        </div>
                    </div>

                    <Button className="w-full h-12 text-lg font-bold" onClick={handleSave}>설정 저장하기</Button>
                </CardContent>
            </Card>
        </div>
    );
}
