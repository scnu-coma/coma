import Image from "next/image";
import title from "@/public/recruitment/title.svg";
import dividerShort from "@/public/recruitment/divider_short.svg";
import dividerLong from "@/public/recruitment/divider_long.svg";
import python from "@/public/recruitment/python.webp";
import computer from "@/public/recruitment/computer.png";
import { TypographyH1, TypographyP } from "@/components/typography/typography";

export default function Page() {
    return (
        <div className="relative mt-12">
            {/* 그라디언트 배경 */}
            <div className="-z-10 absolute w-full m-24 p-12 h-[800px] bg-gradient-to-br from-indigo-200/50 via-red-200/50 to-yellow-100/50 saturate-150 blur-[100px]" />
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
                <Image src={dividerLong} alt="Long divider" className="h-6 my-8 dark:invert" />
            </div>
        </div>
    );
}
