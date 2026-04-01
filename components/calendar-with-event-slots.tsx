"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ko } from "date-fns/locale";

interface Event {
    id: number;
    title: string;
    from: string;
    to: string;
}

const today = new Date();
const dateTimeFormat = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export default function CalendarWithEventSlots() {
    const [events, setEvents] = React.useState<Event[]>([]);
    const [selectedDates, setSelectedDates] = React.useState<Date[]>([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/events");
                if (res.ok) {
                    const data = await res.json();
                    setEvents(data);
                    setSelectedDates(data.map((e: Event) => new Date(e.from)));
                }
            } catch (error) {
                console.error("Failed to fetch events", error);
            }
        };
        fetchEvents();
    }, []);

    return (
        <Card className="w-full py-4 flex xl:flex-row xl:h-120 border-primary/10 shadow-sm">
            <CardContent className="px-4 self-center mb-auto">
                <Calendar
                    defaultMonth={today}
                    mode="multiple"
                    selected={selectedDates}
                    className="[--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                    locale={ko}
                />
            </CardContent>
            <CardFooter className="w-full flex flex-col items-start gap-3 xl:border-l px-4 !pt-4">
                <div className="flex w-full items-center justify-between px-1">
                    <div className="text-sm font-semibold text-primary">
                        {today.getFullYear()}년 {today.getMonth() + 1 < 7 ? 1 : 2}학기 주요 일정
                    </div>
                </div>
                <div className="flex w-full flex-col gap-2 xl:h-full h-48 overflow-y-auto pr-1 scrollbar-hide">
                    {events.length === 0 ? (
                        <div className="text-sm text-muted-foreground p-4 text-center w-full">등록된 일정이 없습니다.</div>
                    ) : (
                        events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-muted/50 hover:bg-muted transition-colors relative rounded-md p-2 pl-6 text-sm after:absolute after:inset-y-2 after:left-2 after:w-1 after:bg-primary after:rounded-full"
                            >
                                <div className="font-bold text-foreground">{event.title}</div>
                                <div className="text-muted-foreground text-xs mt-1">
                                    {dateTimeFormat.format(new Date(event.from))}
                                    {event.from.split('T')[0] !== event.to.split('T')[0] && ` ~ ${dateTimeFormat.format(new Date(event.to))}`}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardFooter>
        </Card>
    );
}

// useEffect를 위해 React에서 꺼내오기
import { useEffect } from "react";
