import { CakeIcon, ChevronRightIcon, ClockIcon, KeyIcon } from "lucide-react";
import CalendarWithEventSlots from "./calendar-with-event-slots";
import { Button } from "./ui/button";
import { TypographyH4 } from "./typography/typography";
import Link from "next/link";
import { recruitmentTerm, recruitmentYear } from "@/data/recruitment";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import Image from "next/image";
import event from "@/public/images/event.webp";

export default function QuickMenus() {
    return (
        <div className="xl:w-6xl grid xl:grid-cols-3 grid-cols-1 xl:grid-rows-1 xl:gap-2 mx-auto">
            {/* 좌측 일정표(달력) */}
            <div className="xl:col-span-2 xl:row-span-1 flex flex-col mt-6 gap-2">
                <TypographyH4 className="mb-2">이번 학기 행사</TypographyH4>
                <CalendarWithEventSlots />
            </div>
            {/* 우측 바로가기 버튼들 */}
            <div className="xl:col-span-1 xl:row-span-1 row-span-1 mt-6 grid grid-rows-2 grid-cols-1 gap-2">
                <div className="row-span-1 col-span-1 flex flex-col gap-2">
                    <TypographyH4 className="mb-2">서비스 바로가기</TypographyH4>
                    {/* 코마 혜택 */}
                    <Dialog>
                        <DialogTrigger className="h-full" asChild>
                            {/* <Link href="#" className="h-full"> */}
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex gap-6 justify-start w-full h-full hover:cursor-pointer rounded-xl"
                            >
                                <KeyIcon />
                                <span>코마 혜택</span>
                                <ChevronRightIcon className="ml-auto" />
                            </Button>
                            {/* </Link> */}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>안내</DialogTitle>
                            <DialogDescription>준비중입니다.</DialogDescription>
                        </DialogContent>
                    </Dialog>
                    {/* 부실 예약 */}
                    <Dialog>
                        <DialogTrigger className="h-full" asChild>
                            {/* <Link href="#" className="h-full"> */}
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex gap-6 justify-start w-full h-full hover:cursor-pointer rounded-xl"
                            >
                                <ClockIcon />
                                <span>부실 예약</span>
                                <ChevronRightIcon className="ml-auto" />
                            </Button>
                            {/* </Link> */}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle>안내</DialogTitle>
                            <DialogDescription>준비중입니다.</DialogDescription>
                        </DialogContent>
                    </Dialog>

                    {/* 부원 모집안내 */}
                    <Link href={`/recruitment/${recruitmentYear}-${recruitmentTerm}`} className="h-full">
                        <Button
                            variant="outline"
                            size="lg"
                            className="flex gap-6 justify-start w-full h-full hover:cursor-pointer rounded-xl"
                        >
                            <CakeIcon />
                            <span>부원 모집안내</span>
                            <ChevronRightIcon className="ml-auto" />
                        </Button>
                    </Link>
                </div>
                <div className="row-span-1 col-span-1 border overflow-hidden rounded-xl xl:w-95 max-w-99 max-h-64 h-fit flex items-center shadow-sm">
                    <Image
                        src={event}
                        alt="코미와 콤마"
                        className="row-span-1 col-span-1 object-contain scale-110 hover:scale-120 transition-all duration-500"
                    />
                </div>
            </div>
        </div>
    );
}
