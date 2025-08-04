"use client";
import Image from "next/image";
import { TypographyH1, TypographyLarge, TypographyP } from "@/components/typography/typography";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { notices } from "@/data/index-notices";
import { useState } from "react";
import Link from "next/link";

export default function HeroSection() {
    const [number, setNumber] = useState<number>(0);
    // tailwind v4부터 동적 클래스를 지원하지 않기 때문에 progress bar 애니메이션과는 연동되지 않으므로 화면 크기를 마구 조절하면 애니메이션이 어긋날 수 있음
    const ms = 3000;

    setInterval(() => {
        if (number < notices.length - 1) {
            setNumber(number + 1);
            // 범위를 명확히 정해주지 않으면 후루룩 넘어가는 듯한 현상이 발생한다
        } else if (number >= notices.length - 1) {
            setNumber(0);
        }
    }, ms);
    return (
        <>
            <div className="w-full lg:h-96 md:h-80 h-42 overflow-hidden rounded-3xl flex">
                <div className="absolute self-center text-white text-shadow-[0_0px_5px_rgb(0_0_0_/_0.75)] lg:ml-32 md:ml-26 ml-16 flex flex-col lg:gap-2">
                    {/* 부제목 */}
                    <TypographyLarge className="text-sm lg:text-lg animate-[revealOpacity_3s_infinite_ease-in-out]">
                        {notices[number].subtitle}
                    </TypographyLarge>
                    {/* 제목 */}
                    <TypographyH1 className="text-xl md:text-3xl lg:text-4xl animate-[revealOpacity_3s_infinite_ease-in-out]">
                        {notices[number].title}
                    </TypographyH1>
                    {/* 문장 */}
                    <TypographyP className="hidden md:block animate-[revealOpacity_3s_infinite_ease-in-out]">
                        {notices[number].content}
                        <br />
                        {notices[number].content2}
                    </TypographyP>
                    {/* 진행도 */}
                    <div className="flex gap-2 mt-4 text-muted-foreground bg-accent/90 w-fit rounded-3xl px-1 py-0.5 text-shadow-none">
                        <button className="rounded-3xl w-fit transition-colors hover:bg-primary/25">
                            <ChevronLeftIcon size={20} />
                        </button>
                        <small className="text-primary">{number + 1}</small>
                        <small>/</small>
                        <small>{notices.length}</small>
                        <button className="rounded-3xl w-fit transition-colors hover:bg-primary/25">
                            <ChevronRightIcon size={20} />
                        </button>
                    </div>
                </div>
                {/* 배너 이미지 */}
                <Link href={notices[number].href}>
                    <Image
                        className="h-full object-cover"
                        src={notices[number].image}
                        alt="image of hero section"
                        priority
                    />
                </Link>
            </div>
            {/* 페이지네이션 */}
            <div className="self-center xl:w-6xl w-full h-20 -mt-14 px-14">
                <ul className="w-full h-full backdrop-blur bg-muted/90 supports-[backdrop-filter]:bg-muted/60 rounded-3xl items-center text-center text-muted-foreground md:grid hidden xl:grid-cols-4 overflow-hidden">
                    {/* PC버전 (모두 표시) */}
                    {notices.map((notice, index) => (
                        <li key={index} className="not-xl:hidden relative h-full">
                            <Link href={notice.href} className="h-full flex items-center justify-center">
                                <span className="text-primary break-keep text-sm">{notice.title}</span>
                                <div className="absolute bottom-0 h-1 w-full bg-muted">
                                    {index === number && (
                                        <div
                                            className={`absolute bottom-0 h-1 w-full bg-primary animate-[progress_3s_infinite_ease-out]`}
                                        />
                                    )}
                                </div>
                            </Link>
                        </li>
                    ))}
                    {/* 태블릿 버전 (1개만 표시) */}
                    <li className="text-primary xl:hidden w-full h-full">
                        <Link href={notices[number].href} className="w-full h-full flex justify-center items-center">
                            <span className="text-primary break-keep">{notices[number].title}</span>
                            <div className="absolute bottom-0 h-1 w-full bg-muted">
                                <div
                                    className={`absolute bottom-0 h-1 w-full bg-primary animate-[progress_3s_infinite_ease-out]`}
                                />
                            </div>
                        </Link>
                    </li>
                    {/* 모바일 버전은 미표시 */}
                </ul>
            </div>
        </>
    );
}
