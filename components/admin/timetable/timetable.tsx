"use client";

import { useState } from "react";

type Props = {
    days: string[];
    hours: string[];
};

export function Timetable({ days, hours }: Props) {
    const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
    const [hoveredRow, setHoveredRow] = useState<number | null>(null);

    return (
        <div>
            {/* 헤더(요일) */}
            <div className="grid grid-cols-[120px_repeat(5,1fr)] border-b border-border bg-neutral-100">
                <div />
                {days.map((day, dayIndex) => (
                    <div
                        key={day}
                        className={`p-4 text-center font-medium text-sm border-l border-border transition-colors ${
                            hoveredColumn === dayIndex ? "bg-neutral-200" : ""
                        }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* 본문(시간) */}
            {hours.map((hour, hourIndex) => (
                <div key={hour} className={`grid grid-cols-[120px_repeat(5,1fr)] not-last:border-b transition-colors`}>
                    <div className="flex justify-center items-center text-sm text-neutral-500 bg-neutral-50">
                        {hour}
                    </div>
                    {days.map((day, dayIndex) => (
                        <div
                            key={`${day}-${hour}`}
                            onMouseEnter={() => {
                                setHoveredColumn(dayIndex);
                                setHoveredRow(hourIndex);
                            }}
                            onMouseLeave={() => {
                                setHoveredColumn(null);
                                setHoveredRow(null);
                            }}
                            className={`border-l h-10 cursor-pointer transition-colors ${
                                hoveredColumn === dayIndex && hoveredRow === hourIndex ? "bg-neutral-300" : ""
                            } ${hoveredColumn === dayIndex || hoveredRow === hourIndex ? "bg-neutral-100" : ""}`}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
