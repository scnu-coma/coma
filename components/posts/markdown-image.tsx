import { Card } from "@/components/ui/card";
import { TypographyMuted } from "../typography/typography";
import { useState } from "react";
import { ImageOffIcon } from "lucide-react";

export default function MarkdownImage({ src, alt, title, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
    const [loaded, setLoaded] = useState(false);
    const handleImageLoad = () => {
        setLoaded(true);
    };
    const imageSrc = typeof src === "string" ? src.replace("@/_posts/images", "/images") : src || "";

    return (
        <>
            {/* eslint-disable @next/next/no-img-element */}
            <img onLoad={handleImageLoad} src={imageSrc} alt={alt} className={`hidden`} />
            {loaded ? (
                <Card className="overflow-hidden py-0 mt-6 md:w-lg w-full">
                    {/* eslint-disable @next/next/no-img-element */}
                    <img
                        onLoad={handleImageLoad}
                        {...props}
                        src={imageSrc}
                        alt={alt}
                        title={title}
                        className={`object-cover`}
                    />
                </Card>
            ) : (
                <Card className="overflow-hidden py-0 mt-6 md:w-lg w-full h-56 border-dashed flex items-center justify-center">
                    <ImageOffIcon size={36} className="opacity-50" />
                </Card>
            )}
            <TypographyMuted className="mt-1 mb-6 text-center md:w-lg w-full">
                {loaded ? alt : "이미지 로딩에 실패했습니다."}
            </TypographyMuted>
        </>
    );
}
