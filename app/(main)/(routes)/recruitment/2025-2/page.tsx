"use client";

import Image from "next/image";
import title from "@/public/recruitment/title.svg";
import dividerShort from "@/public/recruitment/divider_short.svg";
import dividerLong from "@/public/recruitment/divider_long.svg";
import python from "@/public/recruitment/python.webp";
import computer from "@/public/recruitment/computer.webp";
import { TypographyH1, TypographyP } from "@/components/typography/typography";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

import pythonIcon from "@/public/logo/python.svg";
import cIcon from "@/public/logo/c.svg";
import javaIcon from "@/public/logo/java.svg";

import {
    AppWindowIcon,
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

export default function Page() {
    // 우측 TOC progress bar (미완성)
    const [progress, setProgress] = useState(10);
    // const h1 = document.querySelectorAll("h1");
    // const scroll = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth",
    //     });
    // };
    useEffect(() => {
        const timer = setTimeout(() => setProgress(66), 200);
        return () => clearTimeout(timer);
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
        <div className="relative mt-12" onClick={handleOutsideClick}>
            {/* 그라디언트 배경 */}
            <div className="-z-10 absolute left-0 w-full my-24 p-12 h-[800px] bg-gradient-to-br from-indigo-200/50 via-red-200/50 to-yellow-100/50 saturate-150 blur-[100px] dark:bg-gradient-to-tl dark:from-green-300/20 dark:via-blue-500/20 dark:to-purple-600/20" />
            {/* TOC progress bar */}
            <div className="fixed xl:flex hidden z-10 right-24 bottom-24 gap-8">
                {/* left */}
                <Progress value={progress} className="rotate-90 w-[350px] h-1 origin-left mt-3 -mr-84" />
                {/* right */}
                <ul className="space-y-16">
                    <li>
                        <Link href="#01">모집 대상 알아보기</Link>
                    </li>
                    <li>
                        <Link href="#02">스터디 알아보기</Link>
                    </li>
                    <li>
                        <Link href="#03">전용 혜택 알아보기</Link>
                    </li>
                    <li>
                        <Link href="#04">코마데이 알아보기</Link>
                    </li>
                    <li>
                        <Link href="#05">코마 가입 신청하기</Link>
                    </li>
                </ul>
            </div>
            <div className="w-full flex flex-col items-center text-[#0e0a23] dark:text-[#f1f5dc]">
                <Image
                    src={title}
                    alt="국립순천대학교 코딩동아리 코마 2학기 신규 부원 모집"
                    className="w-5xl dark:invert"
                    id="01"
                />
                <Image src={dividerShort} alt="short divider" className="sm:h-6 h-4 my-8 dark:invert" />
                {/* 01 모집대상 */}
                <TypographyH1 className="mb-4 font-samulham">01</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham">부원 모집대상</TypographyH1>
                <TypographyP>
                    전공무관! 국립순천대학교에 <strong>재학 중</strong>인 모든 학생
                </TypographyP>
                <div className="w-full justify-between relative mt-10 lg:mb-10 font-dovemayo">
                    <div>
                        <Image
                            src={python}
                            alt="python 3d icon"
                            className="xl:w-72 xl:h-72 md:w-64 md:h-64 w-32 h-32 animate-slowlyBounce absolute lg:-top-18 top-6"
                        />
                        <p className="my-12 md:w-96 w-2/3 md:mx-auto ml-28 md:scale-100 scale-75 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tl-none">
                            <span className="underline">비전공자</span>인데, 괜찮을까?
                        </p>
                    </div>
                    <div>
                        <p className="my-12 md:w-96 w-5/6 md:mx-auto mr-28 md:scale-100 scale-75 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tr-none">
                            <span className="underline">전공 관련 활동</span>을 하고 싶은데...
                        </p>
                        <Image
                            src={computer}
                            alt="computer 3d icon"
                            className="md:w-80 w-40 animate-slowlyBounce absolute right-0 lg:top-20 top-36"
                        />
                    </div>
                </div>
                <span id="02" />
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
                {/* 02 다채로운 스터디 그룹 */}
                <TypographyH1 className="mb-4 font-samulham">02</TypographyH1>
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham">다채로운 스터디 그룹</TypographyH1>
                <TypographyP>코딩은 물론, 비개발 분야까지 함께 성장해요</TypographyP>
                {/* 스터디 그룹 아이콘들 */}
                <ul className="grid grid-cols-4 grid-rows-2 lg:w-4xl lg:gap-y-12 gap-y-4 justify-between lg:my-14 my-8">
                    {icons.map((icon) => (
                        <li key={icon.title} className="flex flex-col items-center gap-3">
                            <div className="bg-[#0e0a23] dark:bg-[#f1f5dc] lg:p-6 p-4 lg:rounded-3xl rounded-2xl shadow-[0_0_20px_#0e0a23]/30 dark:shadow-[0_0_20px_#f1f5dc]/50 hover:scale-110 transition-transform duration-300">
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
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham">코마 부원 전용 혜택</TypographyH1>
                <TypographyP>코마의 학습지원과 함께 코딩실력을 LEVEL UP</TypographyP>
                <div className="flex gap-8 lg:my-14 my-8 font-dovemayo lg:scale-100 scale-75 group">
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
                <TypographyH1 className="lg:scale-100 scale-75 font-samulham">코마데이</TypographyH1>
                <TypographyP>공부만 하나요? 놀기도 해야죠!</TypographyP>
                <div className="flex gap-8 lg:my-14 my-8">코마데이</div>
            </div>
        </div>
    );
}
