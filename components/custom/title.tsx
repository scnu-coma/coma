// 각종 페이지마다 공통으로 쓰이는 제목용 배너 컴포넌트

import Image, { StaticImageData } from "next/image";
import { TypographyH2 } from "../typography/typography";

type Props = {
    image?: StaticImageData; // 배경 이미지 (선택사항)
    title: string; // 제목
    description: string; // 부가설명
};
export default function Title({ image, title, description }: Props) {
    return (
        <div className="relative flex w-full flex-col items-center justify-center h-48 sm:h-64 rounded-[2.5rem] overflow-hidden group">
            {image ? (
                <>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        className="object-cover transition-transform duration-1000 group-hover:scale-105 brightness-[0.4] grayscale-[0.2]"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/40" />
                </>
            ) : (
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-muted to-primary/5" />
            )}
            
            <div className="relative z-10 text-center px-4 space-y-3">
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {title}
                </h2>
                <p className="text-sm sm:text-lg text-white/80 font-medium max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-2 duration-1000 delay-200">
                    {description}
                </p>
            </div>
        </div>
    );
}
