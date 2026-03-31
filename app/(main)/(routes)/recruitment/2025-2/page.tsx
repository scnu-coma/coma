"use client";

import Image from "next/image";
import title from "@/public/recruitment/title.svg";
import dividerShort from "@/public/recruitment/divider_short.svg";
import dividerLong from "@/public/recruitment/divider_long.svg";
import python from "@/public/recruitment/python.webp";
import computer from "@/public/recruitment/computer.webp";
import deco01 from "@/public/recruitment/deco_01.svg";
import deco02 from "@/public/recruitment/deco_02.svg";
import { TypographyH1, TypographyP } from "@/components/typography/typography";
import { useEffect, useRef, useState } from "react";

import pythonIcon from "@/public/logo/python.svg";
import cIcon from "@/public/logo/c.svg";
import javaIcon from "@/public/logo/java.svg";

import {
    AppWindowIcon,
    ArrowDownIcon,
    BookMarkedIcon,
    CircleQuestionMarkIcon,
    DatabaseZapIcon,
    Gamepad2Icon,
    TerminalIcon,
} from "lucide-react";
import InflearnIcon from "@/public/logo/inflearn";
import ChatGPTIcon from "@/public/logo/chatgpt";
import CanvaIcon from "@/public/logo/canva";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import comaday01 from "@/public/recruitment/comaday01.webp";
import comaday02 from "@/public/recruitment/comaday02.webp";
import comaday03 from "@/public/recruitment/comaday03.webp";
import comaday04 from "@/public/recruitment/comaday04.webp";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// 02 다채로운 스터디 그룹 (아이콘, 아이콘이름)
const icons = [
    {
        title: "파이썬",
        image: pythonIcon,
    },
    {
        title: "C언어",
        image: cIcon,
    },
    {
        title: "자바",
        image: javaIcon,
    },
    {
        title: "게임제작",
        element: <Gamepad2Icon className="invert sepia lg:w-24 w-10 lg:h-24 h-10" />,
    },
    {
        title: "백엔드",
        element: <DatabaseZapIcon className="invert sepia lg:w-24 w-10 lg:h-24 h-10" />,
    },
    {
        title: "홈페이지 제작",
        element: <AppWindowIcon className="invert sepia lg:w-24 w-10 lg:h-24 h-10" />,
    },
    {
        title: "자격증",
        element: <BookMarkedIcon className="invert sepia lg:w-24 w-10 lg:h-24 h-10" />,
    },
    {
        title: "모각코",
        element: <TerminalIcon className="invert sepia lg:w-24 w-10 lg:h-24 h-10" />,
    },
];

// 04 코마데이 사진들
const comadayImages = [
    {
        src: comaday01,
    },
    { src: comaday02 },
    { src: comaday03 },
    { src: comaday04 },
];

export default function Page() {
    // 스크롤에 따른 TOC 강조 효과
    const [isVisible, setVisible] = useState<{ [key: string]: boolean }>({
        trigger01: false,
        trigger02: false,
        trigger03: false,
        trigger04: false,
        trigger05: false,
    });
    const triggerRefs = {
        trigger01: useRef<HTMLDivElement>(null),
        trigger02: useRef<HTMLDivElement>(null),
        trigger03: useRef<HTMLDivElement>(null),
        trigger04: useRef<HTMLDivElement>(null),
        trigger05: useRef<HTMLDivElement>(null),
    };
    
    const [recruitmentDates, setRecruitmentDates] = useState({ start: "", end: "" });

    useEffect(() => {
        fetch("/api/recruitment/settings")
            .then(res => res.json())
            .then(data => {
                if (data.start_date && data.end_date) {
                    const s = new Date(data.start_date);
                    const e = new Date(data.end_date);
                    setRecruitmentDates({
                        start: `${s.getMonth() + 1}월 ${s.getDate()}일`,
                        end: `${e.getMonth() + 1}월 ${e.getDate()}일`
                    });
                }
            })
            .catch(err => console.error(err));

        const elements = ["trigger01", "trigger02", "trigger03", "trigger04", "trigger05"].map((id) =>
            document.getElementById(id)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.id;
                    setVisible((prev) => ({
                        ...prev,
                        [id]: entry.isIntersecting,
                    }));
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // 03 코마 부원 전용 혜택 카드 클릭 애니메이션
    const [position, setPosition] = useState(0);
    const handleLeftClick = () => setPosition(256);
    const handleCenterClick = () => setPosition(0);
    const handleRightClick = () => setPosition(-256);
    const handleOutsideClick = () => setPosition(0);

    return (
        <div className="relative mt-12 animate-[revealOpacity_5s_linear]" onClick={handleOutsideClick}>
            {/* 그라디언트 배경 */}
            <div className="-z-10 absolute left-0 w-full my-24 p-12 h-[800px] bg-gradient-to-br from-indigo-200/50 via-red-200/50 to-yellow-100/50 saturate-150 blur-[100px] dark:bg-gradient-to-tl dark:from-green-300/20 dark:via-blue-500/20 dark:to-purple-600/20" />
            
            {/* TOC progress bar */}
            <div className="fixed h-screen right-24 bottom-0 xl:flex hidden z-10 gap-8 text-right text-sm text-muted-foreground">
                <ul className="space-y-4 my-auto">
                    {["부원 모집대상", "스터디 그룹", "부원 전용 혜택", "코마데이", "가입 신청하기"].map((text, i) => (
                        <li key={i}>
                            <Link href={`#0${i+1}`} className="flex items-center gap-4 justify-end">
                                <span className={`${isVisible[`trigger0${i+1}`] ? `text-foreground font-bold` : ``} transition-all`}>{text}</span>
                                <span className={`${isVisible[`trigger0${i+1}`] ? `border-foreground bg-foreground scale-125` : `border-muted-foreground`} transition-all w-2 h-2 rounded-full border mt-1`} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full flex flex-col items-center text-[#0e0a23] dark:text-[#f1f5dc]">
                <Image src={title} alt="COMA 2학기 신규 부원 모집" className="w-5xl dark:invert opacity-0 animate-[revealOpacityDown_0.7s_forwards] sm:mt-16" id="01" />
                
                <div className="relative opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards] flex justify-center items-center my-14 gap-8 font-samulham text-muted-foreground">
                    <Image src={dividerShort} alt="divider" className="h-4 w-fit dark:invert opacity-50" />
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs tracking-widest">SCROLL</span>
                        <ArrowDownIcon size={20} className="animate-bounce" />
                    </div>
                    <Image src={dividerShort} alt="divider" className="h-4 w-fit dark:invert opacity-50" />
                </div>

                {/* 01 모집대상 */}
                <TypographyH1 className="mb-4 font-samulham opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards]">01</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards] text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-indigo-900 dark:from-[#f1f5dc] dark:to-orange-200">부원 모집대상</TypographyH1>
                <TypographyP className="opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards]">전공무관! 국립순천대학교에 <strong>재학 중</strong>인 모든 학생</TypographyP>
                
                <div className="w-full justify-between relative mt-10 lg:mb-10 font-dovemayo" id="trigger01" ref={triggerRefs["trigger01"]}>
                    <Image src={python} alt="python" className="xl:w-72 xl:h-72 md:w-64 md:h-64 w-32 h-32 absolute lg:-top-18 top-6 animate-[slowlyBounce_2.5s_ease-in-out_infinite]" />
                    <p className="my-12 md:w-96 w-2/3 md:mx-auto ml-28 md:scale-100 scale-75 h-24 bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tl-none opacity-0 animate-[revealOpacityDown_0.7s_ease-out_800ms_forwards]">
                        <span className="underline decoration-primary/50 underline-offset-4">비전공자</span>인데, 괜찮을까?
                    </p>
                    <p className="my-12 md:w-96 w-5/6 md:mx-auto mr-28 md:scale-100 scale-75 h-24 bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tr-none opacity-0 animate-[revealOpacityDown_0.7s_ease-out_1200ms_forwards]">
                        <span className="underline decoration-primary/50 underline-offset-4">전공 관련 활동</span>을 하고 싶은데...
                    </p>
                    <Image src={computer} alt="computer" className="md:w-80 w-40 opacity-0 animate-[slowlyBounceUp_2.5s_ease-in-out_infinite] absolute right-0 lg:top-20 top-36" />
                </div>

                <span id="02" />
                <Image src={dividerLong} alt="divider" className="h-6 my-14 dark:invert" />

                {/* 02 스터디 그룹 */}
                <TypographyH1 className="mb-4 font-samulham">02</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-blue-900 dark:from-[#f1f5dc] dark:to-orange-200">다채로운 스터디 그룹</TypographyH1>
                <TypographyP>코딩은 물론, 비개발 분야까지 함께 성장해요</TypographyP>
                
                <ul className="grid grid-cols-4 grid-rows-2 lg:w-4xl lg:gap-y-12 gap-y-4 justify-between lg:my-14 my-8" id="trigger02" ref={triggerRefs["trigger02"]}>
                    {icons.map((icon) => (
                        <li key={icon.title} className="flex flex-col items-center gap-3">
                            <div className="bg-[#0e0a23] dark:bg-[#f1f5dc] lg:p-6 p-4 lg:rounded-3xl rounded-2xl shadow-xl hover:scale-110 transition-all duration-300">
                                {icon.element}
                                {icon.image && <Image src={icon.image} alt={icon.title} className="invert sepia dark:invert-0 lg:w-24 w-10" />}
                            </div>
                            <span className="lg:text-lg font-bold">{icon.title}</span>
                        </li>
                    ))}
                </ul>

                <span id="03" />
                <Image src={dividerLong} alt="divider" className="h-6 my-14 dark:invert" />

                {/* 03 혜택 */}
                <TypographyH1 className="mb-4 font-samulham">03</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-cyan-900 dark:from-[#f1f5dc] dark:to-orange-200">코마 부원 전용 혜택</TypographyH1>
                <TypographyP>코마의 학습지원과 함께 코딩실력을 LEVEL UP</TypographyP>
                
                <div className="flex gap-8 lg:py-14 py-8 font-dovemayo lg:scale-100 scale-75 group" id="trigger03" ref={triggerRefs["trigger03"]}>
                    {/* Cards (Simplified for brevity but maintaining logic) */}
                    <div className="relative w-64 h-96 rounded-3xl text-emerald-300 bg-[#0e0a23] flex flex-col items-center p-6 border-4 border-emerald-100 transition-all duration-300 drop-shadow-emerald-400" style={{ transform: `translateX(${position}px)` }} onClick={(e) => { e.stopPropagation(); handleLeftClick(); }}>
                        <span className="text-4xl font-bold mt-4">인프런</span>
                        <InflearnIcon fill="#26cd86" className="w-32 my-auto" />
                        <div className="self-end text-sm">✨유료버전 지원</div>
                    </div>
                    <div className="relative w-64 h-96 rounded-3xl text-teal-300 bg-[#0e0a23] flex flex-col items-center p-6 border-4 border-teal-100 transition-all duration-300 drop-shadow-teal-400 z-10" style={{ transform: `translateX(${position}px)` }} onClick={(e) => { e.stopPropagation(); handleCenterClick(); }}>
                        <span className="text-4xl font-bold mt-4">챗GPT</span>
                        <ChatGPTIcon fill="oklch(77.7% 0.152 181.912)" className="w-32 my-auto" />
                        <div className="self-end text-sm">✨유료버전 지원</div>
                    </div>
                    <div className="relative w-64 h-96 rounded-3xl text-indigo-300 bg-[#0e0a23] flex flex-col items-center p-6 border-4 border-indigo-100 transition-all duration-300 drop-shadow-indigo-400" style={{ transform: `translateX(${position}px)` }} onClick={(e) => { e.stopPropagation(); handleRightClick(); }}>
                        <span className="text-4xl font-bold mt-4">캔바</span>
                        <CanvaIcon fill="oklch(67.3% 0.182 276.935)" className="w-32 my-auto" />
                        <div className="self-end text-sm">✨유료버전 지원</div>
                    </div>
                </div>

                <span id="04" />
                <Image src={dividerLong} alt="divider" className="h-6 my-14 dark:invert" />

                {/* 04 코마데이 */}
                <TypographyH1 className="mb-4 font-samulham">04</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-green-900 dark:from-[#f1f5dc] dark:to-orange-200">코마데이</TypographyH1>
                <div className="flex gap-8 lg:my-14 my-8" id="trigger04" ref={triggerRefs["trigger04"]}>
                    <Carousel className="md:w-3xl md:h-[500px] w-full h-full" opts={{ loop: true }} plugins={[Autoplay({ delay: 2000 })]}>
                        <CarouselContent>
                            {comadayImages.map((image, i) => (
                                <CarouselItem key={i}><Image src={image.src} alt="comaday" className="md:w-3xl md:h-[500px] w-full h-full object-cover rounded-3xl shadow-2xl" /></CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>

                <span id="05" />
                {/* 05 지원하기 */}
                <div className="w-full md:my-32 my-24 flex flex-col items-center justify-between" id="trigger05" ref={triggerRefs["trigger05"]}>
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tighter">
                            {recruitmentDates.start ? `신청 기간 : ${recruitmentDates.start} ~ ${recruitmentDates.end}` : "현재 부원 모집 기간입니다!"}
                        </h2>
                        <p className="text-muted-foreground font-bold">망설이지 말고 지금 바로 도전하세요.</p>
                    </div>
                    
                    <Link href="/recruitment/apply">
                        <Button className="w-80 h-20 rounded-[2.5rem] text-xl font-black hover:scale-105 transition-all shadow-2xl bg-primary text-primary-foreground">
                            코마 가입 신청하기
                        </Button>
                    </Link>

                    <Accordion type="single" collapsible className="md:w-2xl w-full pt-32">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="font-bold">코딩을 잘 몰라도 가입할 수 있나요?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">물론이죠! 코딩을 잘 몰라도 개발에 관심이 있는 모든 분을 위한 동아리입니다. 기초부터 차근차근 함께 배울 수 있는 스터디가 준비되어 있습니다.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="font-bold">모집 절차가 궁금해요.</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed">홈페이지 내 폼을 통해 지원서를 접수해주시면, 간단한 면접을 통해 최종 선발이 진행됩니다. 모든 안내는 기재해주신 연락처로 개별 통보됩니다.</AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
