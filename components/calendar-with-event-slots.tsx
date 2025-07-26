"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { events } from "@/data/index-events";
import { ko } from "date-fns/locale";

const today = new Date();
const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    // weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
});
// const dates = ;

// 원본
// https://ui.shadcn.com/blocks/calendar
// calendar31 (With event slots)
export default function CalendarWithEventSlots() {
    // '단일 날짜' 단위를 여러 개 표시할 수는 있지만, '기간' 단위를 여러 개 표시하는 기능은 없습니다.
    // 따라서 행사의 시작일만 표시하도록 작성했습니다.
    // 가능하면 개선 바랍니다...
    const [dates, setDates] = React.useState<Date[]>(events.map((event) => new Date(event.from)));
    return (
        <Card className="w-full py-4 flex lg:flex-row">
            <CardContent className="px-4 self-center">
                <Calendar
                    defaultMonth={today}
                    mode="multiple"
                    selected={dates}
                    onSelect={setDates}
                    required
                    className="[--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                    locale={ko}
                />
            </CardContent>
            {/* 20xx년 x학기 행사, 행사 목록(텍스트) */}
            <CardFooter className="w-full flex flex-col items-start gap-3 border-l px-4 !pt-4">
                <div className="flex w-full items-center justify-between px-1">
                    <div className="text-sm font-medium">
                        {/* 현재 날짜가 1 ~ 6월일 경우 1학기, 7 ~ 12월일 경우 2학기로 표시 */}
                        {today.toLocaleDateString("ko-KR", {
                            year: "numeric",
                        })}{" "}
                        {today.getMonth() + 1 < 7 ? 1 : 2}
                        학기 행사
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                    {events.map(
                        (event) =>
                            (new Date(event.from) >= today || (event.to && new Date(event.to) >= today)) && (
                                <div
                                    key={event.title}
                                    className="bg-muted after:bg-primary/70 relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:rounded-full"
                                >
                                    <div className="font-medium">{event.title}</div>
                                    <div className="text-muted-foreground text-xs">
                                        {dateTimeFormat.format(new Date(event.from))}
                                        {event.to && " ~ " + dateTimeFormat.format(new Date(event.to))}
                                    </div>
                                </div>
                            )
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}
