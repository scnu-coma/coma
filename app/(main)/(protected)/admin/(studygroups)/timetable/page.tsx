"use client";
import { Timetable } from "@/components/admin/timetable/timetable";
import { TypographyH3 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const days = ["월", "화", "수", "목", "금"];
const hours = [
    "오전 9시",
    "오전 10시",
    "오전 11시",
    "오후 12시",
    "오후 1시",
    "오후 2시",
    "오후 3시",
    "오후 4시",
    "오후 5시",
    "오후 6시",
    "오후 7시",
    "오후 8시",
    "오후 9시",
];
const studygroupList = ["자격증", "파이썬", "자바", "앱 개발", "보안", "백엔드", "모각코 1", "모각코 2", "모각코 3"];

export default function Page() {
    const [day, setDay] = useState<string>("월");
    const [meridiem, setMeridiem] = useState<string>("오전");
    const [time, setTime] = useState<number>(9);
    const [studygroup, setStudygroup] = useState<string>(studygroupList[0]);
    return (
        <div>
            <div className="space-y-1 mb-6">
                <TypographyH3>시간표 관리</TypographyH3>
                <p className="text-muted-foreground text-xs ml-0.5">
                    스터디그룹 시간표를 관리하세요. 홈페이지 메인화면에 표시됩니다.
                </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {/* 시간표 */}
                <div className="rounded-lg overflow-clip border">
                    <Timetable days={days} hours={hours} />
                </div>
                <div className="mx-auto my-auto flex flex-col gap-4">
                    {/* 드롭다운 */}
                    <div className="flex gap-2 items-end">
                        {/* 요일 */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-2xl font-semibold w-36 h-16">
                                    {day}요일
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" sideOffset={8} align="end">
                                {days.map((day, index) => (
                                    <DropdownMenuItem key={index} onClick={() => setDay(day)}>
                                        {day}요일
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* 오전/오후 */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-2xl font-semibold w-30 h-16">
                                    {meridiem}
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" sideOffset={8} align="end">
                                <DropdownMenuItem
                                    onClick={() => {
                                        setMeridiem("오전");
                                        setTime(9);
                                    }}
                                >
                                    오전
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setMeridiem("오후");
                                        setTime(12);
                                    }}
                                >
                                    오후
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {/* 시간 */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-2xl font-semibold w-30 h-16">
                                    {time}시
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" sideOffset={8} align="end">
                                {meridiem === "오전"
                                    ? Array.from({ length: 3 }).map((_, index) => (
                                          <DropdownMenuItem key={index} onClick={() => setTime(index + 9)}>
                                              {index + 9}시
                                          </DropdownMenuItem>
                                      ))
                                    : Array.from({ length: 10 }).map((_, index) => (
                                          <DropdownMenuItem
                                              key={index}
                                              onClick={() => setTime(index + 12 < 13 ? index + 12 : index)}
                                          >
                                              {index + 12 < 13 ? index + 12 : index}시
                                          </DropdownMenuItem>
                                      ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="font-semibold text-xl mb-2">에는</span>
                    </div>

                    <div className="flex gap-2 items-center">
                        {/* 스터디그룹 목록 */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="text-2xl font-semibold w-48 h-16">
                                    {studygroup}
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent side="bottom" sideOffset={8} align="end">
                                {studygroupList.map((studygroup, index) => (
                                    <DropdownMenuItem key={index} onClick={() => setStudygroup(studygroup)}>
                                        {studygroup}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="font-semibold text-xl">
                            팀이 동아리방을
                            <br />
                            사용합니다.
                        </span>
                    </div>
                    <Button className="h-10 mt-6">저장</Button>
                </div>
            </div>
        </div>
    );
}
