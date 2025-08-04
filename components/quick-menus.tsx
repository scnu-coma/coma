import { CakeIcon, ChevronRightIcon, ClockIcon, KeyIcon } from "lucide-react";
import CalendarWithEventSlots from "./calendar-with-event-slots";
import { Button } from "./ui/button";
import { TypographyH4 } from "./typography/typography";
import Link from "next/link";
import { recruitmentTerm, recruitmentYear } from "@/data/recruitment";

export default function QuickMenus() {
    return (
        <div className="grid lg:w-full lg:grid-cols-6 lg:grid-rows-6 grid-cols-1 lg:gap-2 gap-12 mt-6 mx-auto">
            {/* 좌측 일정표(달력) */}
            <div className="lg:col-span-3 lg:col-start-2 lg:row-span-6 flex flex-col gap-2">
                <TypographyH4 className="mb-2">이번 학기 행사</TypographyH4>
                <CalendarWithEventSlots />
            </div>
            {/* 우측 바로가기 버튼들 */}
            <div className="lg:col-span-1 lg:row-span-3 flex flex-col gap-2">
                <TypographyH4 className="mb-2">서비스 바로가기</TypographyH4>
                {/* 코마 혜택 */}
                <Link href="#" className="h-full">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex gap-6 justify-start w-full h-full hover:cursor-pointer"
                    >
                        <KeyIcon />
                        <span>코마 혜택</span>
                        <ChevronRightIcon className="ml-auto" />
                    </Button>
                </Link>
                {/* 부실 예약 */}
                <Link href="#" className="h-full">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex gap-6 justify-start w-full h-full hover:cursor-pointer"
                    >
                        <ClockIcon />
                        <span>부실 예약</span>
                        <ChevronRightIcon className="ml-auto" />
                    </Button>
                </Link>
                {/* 부원 모집안내 */}
                <Link href={`/recruitment/${recruitmentYear}-${recruitmentTerm}`} className="h-full">
                    <Button
                        variant="outline"
                        size="lg"
                        className="flex gap-6 justify-start w-full h-full hover:cursor-pointer"
                    >
                        <CakeIcon />
                        <span>부원 모집안내</span>
                        <ChevronRightIcon className="ml-auto" />
                    </Button>
                </Link>
                <div className="h-36 lg:hidden" />
            </div>
        </div>
    );
}
