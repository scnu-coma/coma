import Image from "next/image";
import hero1 from "@/public/images/nidhin-mohan-p_wC_T2HUPk-unsplash.jpg";
import { TypographyH1, TypographyLarge, TypographyP } from "@/components/typography/typography";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function HeroSection() {
    return (
        <>
            <div className="w-full h-96 overflow-hidden rounded-3xl flex">
                <div className="absolute self-center text-white text-shadow-[0_0px_5px_rgb(0_0_0_/_0.75)] ml-16 lg:ml-32 flex flex-col gap-2">
                    {/* 텍스트 */}
                    <TypographyLarge>새로운 공지사항</TypographyLarge>
                    <TypographyH1>코마 웹사이트 오픈</TypographyH1>
                    <TypographyP>
                        새로운 공지사항 핵심 요약 1줄!
                        <br />
                        2번째 줄은 br 태그를 사용해서 작성합니다.
                    </TypographyP>
                    {/* 진행도 */}
                    <div className="flex gap-2 mt-4 text-muted-foreground bg-accent/90 w-fit rounded-3xl px-1 py-0.5 text-shadow-none">
                        <button className="rounded-3xl w-fit transition-colors hover:bg-primary/25">
                            <ChevronLeftIcon size={20} />
                        </button>
                        <small className="text-primary">1</small>
                        <small>/</small>
                        <small>4</small>
                        <button className="rounded-3xl w-fit transition-colors hover:bg-primary/25">
                            <ChevronRightIcon size={20} />
                        </button>
                    </div>
                </div>
                {/* 배너 이미지 */}
                <Image className="h-full object-cover" src={hero1} alt="Photo by Nidhin" priority />
            </div>
            <ul className="self-center w-3/4 h-20 -mt-10 backdrop-blur bg-muted/90 supports-[backdrop-filter]:bg-muted/60 rounded-3xl items-center grid lg:grid-cols-4 grid-cols-1 text-center text-muted-foreground">
                <li className="text-primary">코마 웹사이트 오픈</li>
                <li>신규 부원 모집 중</li>
                <li>신규 스터디 &apos;모각코&apos; 개설</li>
                <li>2학기 운영계획 안내</li>
            </ul>
        </>
    );
}
