import Image from "next/image";
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { TypographyH2 } from "@/components/typography/typography";
import { getAllPosts } from "@/lib/api";
import { DataTable } from "@/components/notice/data-table";
import { columns } from "@/components/notice/columns";

export default function Page() {
    const posts = getAllPosts("_notice");
    return (
        <>
            {/* 제목 배너 */}
            <div className="relative flex w-full justify-center md:h-42 h-24 rounded-3xl overflow-hidden">
                <Image
                    src={bg}
                    alt=""
                    className="absolute max-h-fit blur-[2px] brightness-75 grayscale-50 self-end animate-[upDown_30s_infinite] bg-black/10"
                />
                <div className="absolute text-white self-center text-center">
                    <TypographyH2 className="not-md:text-xl not-md:pb-1!">공지사항</TypographyH2>
                    <p className="md:text-sm text-xs md:mt-2 mt-1">코마 새소식을 가장 먼저 만나보세요</p>
                </div>
            </div>
            <DataTable columns={columns} data={posts} />
        </>
    );
}
