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
        <div className="relative flex w-full justify-center md:h-42 h-24 rounded-3xl overflow-hidden">
            {image && (
                <Image
                    src={image}
                    alt={title}
                    className={`absolute max-h-fit blur-[2px] brightness-75 grayscale-50 self-end animate-[upDown_30s_infinite] bg-black/10`}
                />
            )}
            {/* 배경사진이 있다면 텍스트 색상은 흰색으로 고정 */}
            <div className={`${image && "text-white"} absolute self-center text-center`}>
                <TypographyH2 className="not-md:text-xl not-md:pb-1!">{title}</TypographyH2>
                <p className="md:text-sm text-xs md:mt-2 mt-1">{description}</p>
            </div>
        </div>
    );
}
