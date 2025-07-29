"use client";

import Image from "next/image";
import title from "@/public/recruitment/title.svg";
import dividerShort from "@/public/recruitment/divider_short.svg";
import dividerLong from "@/public/recruitment/divider_long.svg";
import python from "@/public/recruitment/python.webp";
import computer from "@/public/recruitment/computer.png";
import { TypographyH1, TypographyP } from "@/components/typography/typography";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

import pythonIcon from "@/public/logo/python.svg";
import cIcon from "@/public/logo/c.svg";
import javaIcon from "@/public/logo/java.svg";
import { AppWindowIcon, BookMarkedIcon, DatabaseZapIcon, Gamepad2Icon, TerminalIcon } from "lucide-react";

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
        // image: unityIcon,
        element: <Gamepad2Icon className="invert sepia w-24 h-24" />,
    },
    {
        title: "백엔드",
        element: <DatabaseZapIcon className="invert sepia w-24 h-24" />,
    },
    {
        title: "홈페이지 제작",
        element: <AppWindowIcon className="invert sepia w-24 h-24" />,
    },
    {
        title: "자격증",
        element: <BookMarkedIcon className="invert sepia w-24 h-24" />,
    },
    {
        title: "모각코",
        element: <TerminalIcon className="invert sepia w-24 h-24" />,
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

    return (
        <div className="relative mt-12">
            {/* 그라디언트 배경 */}
            <div className="-z-10 absolute left-0 w-6xl my-24 p-12 h-[800px] bg-gradient-to-br from-indigo-200/50 via-red-200/50 to-yellow-100/50 saturate-150 blur-[100px] dark:bg-gradient-to-tl dark:from-green-300/20 dark:via-blue-500/20 dark:to-purple-600/20" />
            {/* TOC progress bar */}
            <div className="fixed flex z-10 right-24 bottom-24 gap-8">
                {/* left */}
                <Progress value={progress} className="rotate-90 w-[350px] h-1 origin-left mt-3 -mr-84" />
                {/* right */}
                <ul className="space-y-16">
                    <li>모집 대상 알아보기</li>
                    <li>스터디 알아보기</li>
                    <li>전용 혜택 알아보기</li>
                    <li>코마데이 알아보기</li>
                    <li>코마 가입 신청하기</li>
                </ul>
            </div>
            <div className="w-full flex flex-col items-center text-[#0e0a23] dark:text-[#f1f5dc] px-8">
                <Image
                    src={title}
                    alt="국립순천대학교 코딩동아리 코마 2학기 신규 부원 모집"
                    className="w-5xl dark:invert"
                />
                <Image src={dividerShort} alt="short divider" className="h-6 my-8 dark:invert" />
                {/* 01 모집대상 */}
                <TypographyH1 className="mb-4">01</TypographyH1>
                <TypographyH1>부원 모집대상</TypographyH1>
                <TypographyP>
                    전공무관! 국립순천대학교에 <strong>재학 중</strong>인 모든 학생
                </TypographyP>
                <div className="w-full justify-between relative mb-24">
                    <div>
                        <Image
                            src={python}
                            alt="python 3d icon"
                            className="lg:w-72 lg:h-72 w-32 h-32 animate-slowlyBounce absolute lg:-top-18 top-6"
                        />
                        <p className="my-12 w-96 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl flex items-center justify-center rounded-3xl rounded-tl-none">
                            <span className="underline">비전공자</span>인데, 괜찮을까?
                        </p>
                    </div>
                    <div>
                        <p className="my-12 w-96 h-24 mx-auto bg-[#0e0a23] dark:bg-[#f1f5dc] text-[#f1f5dc] dark:text-[#0e0a23] text-xl  flex items-center justify-center rounded-3xl rounded-tr-none">
                            <span className="underline">전공 관련 활동</span>을 하고 싶은데...
                        </p>
                        <Image
                            src={computer}
                            alt="computer 3d icon"
                            className="lg:w-96 w-44 animate-slowlyBounce absolute -right-4 lg:top-20 top-32"
                        />
                    </div>
                </div>
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
                {/* 02 다채로운 스터디 그룹 */}
                <TypographyH1 className="mb-4">02</TypographyH1>
                <TypographyH1>다채로운 스터디 그룹</TypographyH1>
                <TypographyP>코딩은 물론, 비개발 분야까지 함께 성장해요</TypographyP>
                {/* 스터디 그룹 아이콘들 */}
                <ul className="grid grid-cols-4 grid-rows-2 justify-center my-14 gap-20">
                    {icons.map((icon) => (
                        <li key={icon.title} className="flex flex-col items-center gap-3">
                            <div className="bg-[#0e0a23] dark:bg-[#f1f5dc] p-6 rounded-3xl shadow-[0_0_20px_#0e0a23]/30 dark:shadow-[0_0_20px_#f1f5dc]/50 hover:scale-110 transition-transform duration-300">
                                {icon.element && icon.element}
                                {icon.image && (
                                    <Image
                                        src={icon.image}
                                        alt={`${icon.title} icon`}
                                        className="invert sepia dark:invert-0 w-24"
                                    />
                                )}
                            </div>
                            <span className="text-lg">{icon.title}</span>
                        </li>
                    ))}
                </ul>
                {/* 주의사항 */}
                <ul className="mr-auto mt-8">
                    <li className="mb-6">
                        <p>주의사항</p>
                    </li>
                    <li className="flex items-start gap-4 mb-3">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-7 h-5 p-0.5 rounded-sm" />
                        <p className="mb-0.5 text-sm">스터디 구성은 수요조사에 따라 변경될 수 있습니다.</p>
                    </li>
                    <li className="flex items-start gap-4 mb-2">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-7 h-5 p-0.5 rounded-sm" />
                        <p className="mb-0.5 text-sm">
                            모각코 또는 나머지 스터디 중 1개 이상의 그룹에 반드시 참여해야 합니다.
                        </p>
                    </li>
                    <li className="flex items-start gap-4">
                        <TerminalIcon className="invert dark:bg-[#0e0a23] bg-[#f1f5dc] w-7 h-5 p-0.5 rounded-sm opacity-0" />
                        <div>
                            <small>예시 1 &#41; &apos;파이썬&apos; 만 참여</small>
                            <br />
                            <small>예시 2 &#41; &apos;모각코&apos; 만 참여</small>
                            <br />
                            <small>예시 3 &#41; &apos;자격증&apos;, &apos;모각코&apos; 모두 참여</small>
                        </div>
                    </li>
                </ul>
                <Image src={dividerLong} alt="Long divider" className="h-6 my-14 dark:invert" />
            </div>
        </div>
    );
}
