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
    // 관찰 대상에 id, ref 부여, 애니메이션 대상에 isVisible['id'] 부여
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
    useEffect(() => {
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

    // 03 코마 부원 전용 혜택 카드 클릭 시 카드 그룹이 이동하는 애니메이션
    const [position, setPosition] = useState(0);
    const handleLeftClick = () => {
        setPosition(256);
    };
    const handleCenterClick = () => {
        setPosition(0);
    };
    const handleRightClick = () => {
        setPosition(-256);
    };
    const handleOutsideClick = () => {
        setPosition(0);
    };

    return (
        <div className="relative mt-12 animate-[revealOpacity_5s_linear]" onClick={handleOutsideClick}>
            {/* 그라디언트 배경 */}
            <div className="-z-10 absolute left-0 w-full my-24 p-12 h-[800px] bg-gradient-to-br from-indigo-200/50 via-red-200/50 to-yellow-100/50 saturate-150 blur-[100px] dark:bg-gradient-to-tl dark:from-green-300/20 dark:via-blue-500/20 dark:to-purple-600/20" />
            {/* TOC progress bar */}
            <div
                className={`fixed h-screen right-24 bottom-0 xl:flex hidden z-10 gap-8 text-right text-sm text-muted-foreground`}
            >
                <ul className="space-y-4 my-auto">
                    <li>
                        <Link href="#01" className="flex items-center gap-4 justify-end">
                            <span
                                className={`${
                                    isVisible["trigger01"] ? `text-foreground` : ``
                                } transition-all origin-center`}
                            >
                                부원 모집대상
                            </span>
                            <span
                                className={`${
                                    isVisible["trigger01"]
                                        ? `border-foreground bg-foreground `
                                        : `border-muted-foreground bg-none `
                                } transition-colors w-2 h-2 rounded-full border mt-1`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#02" className="flex items-center gap-4 justify-end">
                            <span
                                className={`${
                                    isVisible["trigger02"] ? `text-foreground` : ``
                                } transition-all origin-center`}
                            >
                                스터디 그룹
                            </span>
                            <span
                                className={`${
                                    isVisible["trigger02"]
                                        ? `border-foreground bg-foreground `
                                        : `border-muted-foreground bg-none `
                                } transition-colors w-2 h-2 rounded-full border mt-1`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#03" className="flex items-center gap-4 justify-end">
                            <span
                                className={`${
                                    isVisible["trigger03"] ? `text-foreground` : ``
                                } transition-all origin-center`}
                            >
                                부원 전용 혜택
                            </span>
                            <span
                                className={`${
                                    isVisible["trigger03"]
                                        ? `border-foreground bg-foreground `
                                        : `border-muted-foreground bg-none `
                                } transition-colors w-2 h-2 rounded-full border mt-1`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#04" className="flex items-center gap-4 justify-end">
                            <span
                                className={`${
                                    isVisible["trigger04"] ? `text-foreground` : ``
                                } transition-all origin-center`}
                            >
                                코마데이
                            </span>
                            <span
                                className={`${
                                    isVisible["trigger04"]
                                        ? `border-foreground bg-foreground `
                                        : `border-muted-foreground bg-none `
                                } transition-colors w-2 h-2 rounded-full border mt-1`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link href="#05" className="flex items-center gap-4 justify-end">
                            <span
                                className={`${
                                    isVisible["trigger05"] ? `text-foreground` : ``
                                } transition-all origin-center`}
                            >
                                가입 신청하기
                            </span>
                            <span
                                className={`${
                                    isVisible["trigger05"]
                                        ? `border-foreground bg-foreground `
                                        : `border-muted-foreground bg-none `
                                } transition-colors w-2 h-2 rounded-full border mt-1`}
                            />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-col items-center text-[#0e0a23] dark:text-[#f1f5dc]">
                <Image
                    src={title}
                    alt="국립순천대학교 코딩동아리 코마 2학기 신규 부원 모집"
                    className="w-5xl dark:invert opacity-0 animate-[revealOpacityDown_0.7s_forwards] sm:mt-16"
                    id="01"
                />
                <div className="relative opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards] flex justify-center items-center my-14 gap-8 font-samulham">
                    <Image src={dividerShort} alt="short divider" className="h-4 w-fit my-8 dark:invert" />
                    <div className="flex flex-col items-center gap-2">
                        <span>SCROLL</span>
                        <ArrowDownIcon size={28} className="animate-bounce" />
                    </div>
                    <Image src={dividerShort} alt="short divider" className="h-4 w-fit my-8 dark:invert" />
                </div>
                {/* 01 모집대상 */}
                <TypographyH1 className="mb-4 font-samulham opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards]">
                    01
                </TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards] text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-indigo-900 dark:from-[#f1f5dc] dark:to-orange-200">
                    부원 모집대상
                </TypographyH1>
                <TypographyP className="opacity-0 animate-[revealOpacityDown_0.7s_ease-out_400ms_forwards]">
                    전공무관! 국립순천대학교에 <strong>재학 중</strong>인 모든 학생
                </TypographyP>
                <div className="w-full justify-between relative mt-10 lg:mb-10 font-dovemayo">
                    <div id="trigger01" ref={triggerRefs["trigger01"]}>
                        <Image
                            src={python}
                            alt="python 3d icon"
                            className="xl:w-72 xl:h-72 md:w-64 md:h-64 w-32 h-32 absolute lg:-top-18 top-6 animate-[slowlyBounce_2.5s_ease-in-out_infinite]"
                        />
                        <Image
                            src={deco01}
                            alt="반짝이는 별 그림"
                            className="absolute w-10 h-fit -translate-y-56 translate-x-64 animate-[twinkle_5s_infinite] sepia dark:invert"
                        />
                        <p className="my-12 md:w-96 w-2/3 md:mx-auto ml-28 md:scale-100 scale-75 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tl-none opacity-0 animate-[revealOpacityDown_0.7s_ease-out_800ms_forwards]">
                            <span className="underline">비전공자</span>인데, 괜찮을까?
                        </p>
                    </div>
                    <div>
                        <Image
                            src={deco02}
                            alt="반짝이는 별 그림"
                            className="absolute sepia dark:invert w-6 h-fit right-0 -translate-x-64 -translate-y-56 animate-[twinkle_6s_infinite_400ms] opacity-0"
                        />
                        <p className="my-12 md:w-96 w-5/6 md:mx-auto mr-28 md:scale-100 scale-75 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tr-none opacity-0 animate-[revealOpacityDown_0.7s_ease-out_1200ms_forwards]">
                            <span className="underline">전공 관련 활동</span>을 하고 싶은데...
                        </p>
                        <Image
                            src={computer}
                            alt="computer 3d icon"
                            className="md:w-80 w-40 opacity-0 animate-[slowlyBounceUp_2.5s_ease-in-out_infinite] transition-opacity absolute right-0 lg:top-20 top-36"
                        />
                    </div>
                </div>
                <span id="02" />
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
                {/* 02 다채로운 스터디 그룹 */}
                <TypographyH1 className="mb-4 font-samulham">02</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-blue-900 dark:from-[#f1f5dc] dark:to-orange-200">
                    다채로운 스터디 그룹
                </TypographyH1>
                <TypographyP>코딩은 물론, 비개발 분야까지 함께 성장해요</TypographyP>
                {/* 스터디 그룹 아이콘들 */}
                <ul className="grid grid-cols-4 grid-rows-2 lg:w-4xl lg:gap-y-12 gap-y-4 justify-between lg:my-14 my-8">
                    {icons.map((icon) => (
                        <li key={icon.title} className="flex flex-col items-center gap-3">
                            <div
                                className="bg-[#0e0a23] dark:bg-[#f1f5dc] lg:p-6 p-4 lg:rounded-3xl rounded-2xl shadow-[0_0_20px_#0e0a23]/30 dark:shadow-[0_0_20px_#f1f5dc]/50 hover:scale-110 transition-transform duration-300"
                                id="trigger02"
                                ref={triggerRefs["trigger02"]}
                            >
                                {icon.element && icon.element}
                                {icon.image && (
                                    <Image
                                        src={icon.image}
                                        alt={`${icon.title} icon`}
                                        className="invert sepia dark:invert-0 lg:w-24 w-10"
                                    />
                                )}
                            </div>
                            <span className="lg:text-lg break-keep text-center">{icon.title}</span>
                        </li>
                    ))}
                </ul>
                <ul className="mr-auto break-keep text-xs">
                    {/* 모각코란? */}
                    <li className="flex items-start gap-4 mb-8">
                        <CircleQuestionMarkIcon size={18} />
                        <p className="text-xs w-full break-keep">
                            모각코란? &apos;모여서 각자 코딩하기&apos;를 뜻합니다.
                            <br /> 각자 원하는 목표와 난이도의 학습을 수행할 수 있습니다.
                        </p>
                    </li>
                    {/* 주의사항 */}
                    <li className="mb-2 text-sm">
                        <p>주의사항</p>
                    </li>
                    <li className="flex items-start gap-4 mb-1">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-5 h-4 p-0.5 rounded-sm" />
                        <p className="mb-0.5 w-full">스터디 구성은 수요조사에 따라 변경될 수 있습니다.</p>
                    </li>
                    <li className="flex items-start gap-4 mb-1">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-5 h-4 p-0.5 rounded-sm" />
                        <p className="mb-0.5 w-full">
                            모각코 또는 나머지 스터디 중 1개 이상의 그룹에 반드시 참여해야 합니다.
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-7 h-5 p-0.5 rounded-sm opacity-0" />
                        <div className="flex flex-col gap-1 mt-1">
                            <small>예시 1 &#41; &apos;파이썬&apos; 만 참여</small>
                            <small>예시 2 &#41; &apos;모각코&apos; 만 참여</small>
                            <small>예시 3 &#41; &apos;자격증&apos;, &apos;모각코&apos; 모두 참여</small>
                        </div>
                    </li>
                </ul>
                <span id="03" />
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
                {/* 03 코마 부원 전용 혜택 */}
                <TypographyH1 className="mb-4 font-samulham">03</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-cyan-900 dark:from-[#f1f5dc] dark:to-orange-200">
                    코마 부원 전용 혜택
                </TypographyH1>
                <TypographyP>코마의 학습지원과 함께 코딩실력을 LEVEL UP</TypographyP>
                <div
                    className="flex gap-8 lg:py-14 py-8 font-dovemayo lg:scale-100 scale-75 group"
                    id="trigger03"
                    ref={triggerRefs["trigger03"]}
                >
                    {/* 인프런 카드 */}
                    <div
                        className=" sm:translate-x-12 group-hover:translate-0 group-hover:-rotate-5 group-hover:translate-y-5 relative w-64 h-96 rounded-3xl text-emerald-300 bg-[#0e0a23] bg-gradient-to-br from-emerald-950/80 via-emerald-800/20 to-gray-950/50 flex flex-col items-center mt-3 p-6 outline-2 -outline-offset-10 outline-emerald-400 -rotate-3 transition-all duration-300 border-4 border-emerald-100 dark:border-emerald-200 drop-shadow-[0_0_16px_] drop-shadow-emerald-400"
                        style={{ transform: `translateX(${position}px)` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLeftClick();
                        }}
                    >
                        <div className="flex flex-col self-start items-start">
                            <span>인터넷 강의</span>
                            <span className="text-4xl font-bold">인프런</span>
                        </div>
                        {/* svg에 fill을 적용하려면 svg 자체를 가져오든지, 컴포넌트로 만들어 prop을 전달하든지 해야 한다. drop shadow만 사용하는 것과 같이 색깔을 적용하지 않을 거라면 static import를 사용해도 상관없다. */}
                        <InflearnIcon
                            fill="#26cd86"
                            className="w-32 my-auto drop-shadow-[0_0_4px_] drop-shadow-emerald-400"
                        />
                        <div className="self-end">✨유료버전 지원</div>
                    </div>
                    {/* chatGPT 카드 */}
                    <div
                        className=" group-hover:-translate-y-3 relative w-64 h-96 rounded-3xl text-teal-300 bg-[#0e0a23] bg-gradient-to-br from-teal-950/80 via-teal-800/20 to-gray-950/50 flex flex-col items-center p-6 outline-2 -outline-offset-10 outline-teal-400 transition-transform duration-300 border-4 border-teal-100 dark:border-teal-200 drop-shadow-[0_0_16px_] drop-shadow-teal-400 z-10"
                        style={{ transform: `translateX(${position}px)` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCenterClick();
                        }}
                    >
                        <div className="flex flex-col self-start items-start">
                            <span>생성형 AI</span>
                            <span className="text-4xl font-bold">챗GPT</span>
                        </div>
                        <ChatGPTIcon
                            fill="oklch(77.7% 0.152 181.912)"
                            className="w-32 my-auto drop-shadow-[0_0_4px_] drop-shadow-teal-400"
                        />
                        <div className="self-end">✨유료버전 지원</div>
                    </div>
                    {/* 캔바 카드 */}
                    <div
                        className="sm:-translate-x-12 group-hover:translate-0 group-hover:rotate-5 group-hover:translate-y-3 relative w-64 h-96 rounded-3xl text-indigo-300 bg-[#0e0a23] bg-gradient-to-br from-indigo-950/80 via-indigo-800/20 to-gray-950/50 flex flex-col items-center mt-3 p-6 outline-2 -outline-offset-10 outline-indigo-400 rotate-3 transition-transform duration-300 border-4 border-indigo-100 dark:border-indigo-200 drop-shadow-[0_0_16px_] drop-shadow-indigo-400"
                        style={{ transform: `translateX(${position}px)` }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRightClick();
                        }}
                    >
                        <div className="flex flex-col self-start items-start">
                            <span>PPT 생성기</span>
                            <span className="text-4xl font-bold">캔바</span>
                        </div>
                        <CanvaIcon
                            fill="oklch(67.3% 0.182 276.935)"
                            className="w-32 my-auto drop-shadow-[0_0_4px_] drop-shadow-indigo-400"
                        />
                        <div className="self-end">✨유료버전 지원</div>
                    </div>
                </div>
                {/* 주의사항 */}
                <ul className="mr-auto break-keep text-xs">
                    <li className="mb-2 text-sm">
                        <p>주의사항</p>
                    </li>
                    <li className="flex items-start gap-4 mb-1">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-5 h-4 p-0.5 rounded-sm" />
                        <p className="mb-0.5 w-full">혜택 구성은 추후 변경될 수 있습니다.</p>
                    </li>
                </ul>
                <span id="04" />
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
                {/* 04 코마데이 */}
                <TypographyH1 className="mb-4 font-samulham">04</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham text-transparent bg-clip-text bg-gradient-to-b from-[#0e0a23] to-green-900 dark:from-[#f1f5dc] dark:to-orange-200">
                    코마데이
                </TypographyH1>
                <TypographyP className="text-center">
                    코딩은 잊고 특별한 하루를 보내자!
                    <br />
                    {/* 일정은 예시, 나중에 변경할 것 */}
                    <strong>매월 첫째주 월요일</strong> 코마와 함께 다양한 활동을 즐겨보세요
                </TypographyP>
                <div className="flex gap-8 lg:my-14 my-8" id="trigger04" ref={triggerRefs["trigger04"]}>
                    <Carousel
                        className="md:w-3xl md:h-[500px] w-full h-full"
                        opts={{ loop: true }}
                        plugins={[
                            Autoplay({
                                delay: 2000,
                            }),
                        ]}
                    >
                        <CarouselContent>
                            {comadayImages.map((image, index) => (
                                <CarouselItem key={index}>
                                    <Image
                                        src={image.src}
                                        alt="comaday image"
                                        key={index}
                                        className="md:w-3xl md:h-[500px] w-full h-full overflow-hidden flex items-center object-cover rounded-3xl"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="not-md:hidden" />
                        <CarouselNext className="not-md:hidden" />
                    </Carousel>
                </div>
                <span id="05" />
                <div
                    className="w-full md:my-32 my-24 flex flex-col items-center justify-between gap-y-32"
                    id="trigger05"
                    ref={triggerRefs["trigger05"]}
                >
                    {/* 지원하기 */}
                    <Link href="#" target="_blank">
                        <Button className="w-64 h-18 rounded-3xl text-base hover:cursor-pointer drop-shadow-[0_0_4px_] drop-shadow-[#0e0a23] dark:drop-shadow-[#f1f5dc] bg-[#0e0a23] dark:bg-gradient-to-b dark:from-white dark:via-amber-100 dark:to-[#f1f5dc] dark:hover:via-amber-200 dark:hover:to-yellow-100">
                            코마 가입 신청하기
                        </Button>
                    </Link>
                    {/* FAQ */}
                    <Accordion type="single" collapsible className="md:w-2xl w-full break-keep">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>코딩을 잘 몰라도 가입할 수 있나요?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>물론이죠! 코딩을 잘 몰라도 개발에 관심이 있는 모든 분을 위한 동아리입니다.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>관련 학과가 아니어도 가입할 수 있나요?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>네! 사범대학, 예체능분야 등 관련 학과가 아닌 분들도 동아리에 많이 계십니다.</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>모집 절차가 궁금해요.</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    모집은 X월 X일 X시부터 X월 X일 X시까지 홈페이지 내 폼을 통해 지원 접수가 진행되며,
                                    이후 X월 X일부터 간단한 면접을 통해 최종 모집이 완료됩니다.
                                </p>
                                <p>면접 이전, 이후에는 순차적으로 문자메시지를 통해 연락을 드릴 예정입니다.</p>
                                <p>면접에서는 코딩에 관한 흥미와 뭘 물어본다고 간단히 설명</p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>코마에서는 어떤 활동을 하나요?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    코마의 주 활동은 주 1회 그룹 스터디 및 모각코(모여서 각자 코딩)입니다.
                                    <br />
                                    동아리 박람회, 코마데이, 개강/종강총회 등 매월 즐길 수 있는 다양한 행사도
                                    진행됩니다.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>회비는 얼마인가요?</AccordionTrigger>
                            <AccordionContent className="flex flex-col gap-4 text-balance">
                                <p>
                                    회비는 학기 당 2만 원으로 부원들을 위한 강의 구매, 챗GPT 등 다양한 혜택을 위해
                                    사용됩니다.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}
