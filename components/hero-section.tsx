"use client";
import Image from "next/image";
import { TypographyH1, TypographyLarge, TypographyP } from "@/components/typography/typography";
import { notices } from "@/data/index-notices";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    useEffect(() => {
        if (!api) {
            return;
        }
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);
    return (
        <>
            <div className="w-full overflow-hidden rounded-3xl relative">
                {/* 배너 이미지 */}
                <Carousel
                    setApi={setApi}
                    opts={{
                        loop: true,
                    }}
                    plugins={[
                        Autoplay({
                            delay: 3000,
                        }),
                    ]}
                    className="flex"
                >
                    <CarouselContent>
                        {notices.map((notice, index) => (
                            <CarouselItem key={index} className="relative justify-center items-center pl-0">
                                <div className="absolute text-white lg:ml-36 md:ml-32 ml-20 h-full flex flex-col justify-center md:bottom-6">
                                    {/* 부제목 */}
                                    <TypographyLarge className="text-sm lg:text-lg mb-2">
                                        {notice.subtitle}
                                    </TypographyLarge>
                                    {/* 제목 */}
                                    <TypographyH1 className="text-xl md:text-3xl lg:text-4xl">
                                        {notice.title}
                                    </TypographyH1>
                                    {/* 문장 */}
                                    <TypographyP className="hidden md:block">
                                        {notice.content}
                                        <br />
                                        {notice.content2}
                                    </TypographyP>
                                </div>
                                <Link href={notice.href}>
                                    <Image
                                        className="object-cover lg:h-96 md:h-80 h-42"
                                        src={notice.image}
                                        alt="image of hero section"
                                        priority
                                    />
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {/* 진행도 */}
                    <div className="absolute lg:ml-32 md:ml-26 ml-16 text-neutral-400 border border-neutral-400 rounded-full px-8 py-0.5 lg:bottom-22 bottom-18 not-md:hidden">
                        <CarouselPrevious variant="ghost" className="w-fit h-fit p-0.5 left-1" />
                        <span className="flex gap-2">
                            <small className="text-white">{current}</small>
                            <small>/</small>
                            <small>{notices.length}</small>
                        </span>
                        <CarouselNext variant="ghost" className="w-fit h-fit p-0.5 right-1" />
                    </div>
                </Carousel>
            </div>
            {/* 페이지네이션 */}
            {/* <div className="self-center xl:w-6xl w-full h-20 -mt-14 px-14">
                <ul className="w-full h-full backdrop-blur bg-muted/90 supports-[backdrop-filter]:bg-muted/60 rounded-3xl items-center text-center text-muted-foreground md:grid hidden xl:grid-cols-4 overflow-hidden"> */}
            {/* PC버전 (모두 표시) */}
            {/* {notices.map((notice, index) => (
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
                    ))} */}
            {/* 태블릿 버전 (1개만 표시) */}
            {/* <li className="text-primary xl:hidden w-full h-full">
                        <Link href={notices[number].href} className="w-full h-full flex justify-center items-center">
                            <span className="text-primary break-keep">{notices[number].title}</span>
                            <div className="absolute bottom-0 h-1 w-full bg-muted">
                                <div
                                    className={`absolute bottom-0 h-1 w-full bg-primary animate-[progress_3s_infinite_ease-out]`}
                                />
                            </div>
                        </Link>
                    </li> */}
            {/* 모바일 버전은 미표시 */}
            {/* </ul>
            </div> */}
        </>
    );
}
