// 부원 모집 일정 관리

import { TypographyH4 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./date-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Schedule() {
    return (
        <div>
            <div className="mb-12">
                <TypographyH4 className="mb-6">모집 일정 설정</TypographyH4>
                <div>
                    <Label htmlFor="date-picker-title" className="px-1 mb-3">
                        제목
                    </Label>
                    <Input id="date-picker-title" className="mb-4 max-w-70" defaultValue="2026년 1학기 (겨울방학)" />
                </div>
                <div className="flex items-end mb-4 space-x-2">
                    <DatePicker title="모집 시작" />
                    <span>부터</span>
                </div>
                <div className="flex items-end mb-6 space-x-2">
                    <DatePicker title="모집 마감" />
                    <span>까지</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm">
                        부원 모집 폼이 <strong>0일</strong>간 공개됩니다.
                    </span>
                    <Button className="ml-auto">일정 저장</Button>
                </div>
            </div>
            <div>
                <TypographyH4 className="mb-6">지난 모집 일정</TypographyH4>
                <ul className="text-sm [&_li]:px-4 [&_li]:grid [&_li]:grid-cols-2 [&_li]:py-2 [&_li]:odd:bg-secondary [&_li]:even:bg-white [&_li]:not-last:border-b">
                    <li>
                        <span>2025년 2학기 (학기 중)</span>
                        <span>25.00.00 ~ 25.00.00</span>
                    </li>
                    <li>
                        <span>2025년 2학기 (여름방학)</span>
                        <span>25.00.00 ~ 25.00.00</span>
                    </li>
                    <li>
                        <span>2025년 1학기</span>
                        <span>25.00.00 ~ 25.00.00</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
