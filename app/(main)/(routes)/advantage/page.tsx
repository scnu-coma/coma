import Link from "next/link";
import { CircleQuestionMarkIcon } from "lucide-react";
import bg from "@/public/images/laptop-2620118_1920.webp";
import { TypographyH2 } from "@/components/typography/typography";
import AdvantageCard from "@/components/advantage/advantage-card";

import InflearnIcon from "@/public/logo/inflearn";
import ChatGPTIcon from "@/public/logo/chatgpt";
import CanvaIcon from "@/public/logo/canva";

import Image from "next/image";

// 혜택 리스트
const advantage = [
    {
        icon: "",
        name : "ChatGPT",
        email: "coma.gpt@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "CANVA",
        email: "아무이메일",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "아무거나",
        email: "아무이메일",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "앱1",
        email: "scnu.coma4@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "앱2",
        email: "scnu.app2@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "인공지능",
        email: "scnu.coma3@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "백엔드1",
        email: "scnu.coma@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "백엔드2",
        email: "scnu.backend2@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "게임",
        email: "scnu.game1@gmail.com",
        password: "coma1234!"
    },
    {
        icon: "",
        name : "프론트1",
        email: "scnu.front1@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "프론트2",
        email: "scnu.front2@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "JAVA1",
        email: "scnu.java1@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "JAVA2",
        email: "scnu.java2@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "C언어1",
        email: "scnu.c1@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "AI",
        email: "scnu.coma.ai@gmail.com",
        password: "coma2025-1"
    },
    {
        icon: "",
        name : "유료강의1",
        email: "scnu.coma5@gmail.com",
        password: "zhak123!"
    },
    {
        icon: "",
        name : "유료강의2",
        email: "scnu.coma1@gmail.com",
        password: "zhak123!"
    }
]

export default function Page() {
    return (
        <>
            {/* 제목 배너 */}
            <div className="relative flex w-full justify-center md:h-42 h-24 rounded-3xl overflow-hidden mb-8">
                <Image
                    src={bg}
                    alt=""
                    className="absolute max-h-fit blur-[2px] brightness-75 grayscale-50 self-end animate-[upDown_30s_infinite] bg-black/10"
                />
                <div className="absolute text-white self-center text-center">
                    <TypographyH2 className="not-md:text-xl not-md:pb-1!">코마 혜택</TypographyH2>
                    <p className="md:text-sm text-xs md:mt-2 mt-1">코마에서 제공하고 있는 다양한 기능들 입니다.</p>
                </div>
            </div>
            <ul className="mr-auto break-keep text-xs">
            {/* 안내사항 */}
                    <li className="flex items-start gap-4 mb-8">
                        <CircleQuestionMarkIcon size={18} />
                        <p className="text-xs w-full break-keep">
                            &apos;모자이크&apos;를 누르면 게정 정보를 확인 할 수 있습니다.
                            <br /> &apos;아이콘&apos;을 누르면 해당 하이퍼링크로 연결 됩니다.
                        </p>
                    </li>
            </ul>
            {/* 혜택 목록 */}
            <div className="grid grid-cols-3 gap-5 w-full list-none">   
              {advantage.map((item, index) => (
                <li key={index} className="h-full">
                <AdvantageCard
                    icon={item.icon}
                    name={item.name}
                    email={item.email}
                    password={item.password}
                />
                </li>
            ))}
            </div>


        </>
    )
}