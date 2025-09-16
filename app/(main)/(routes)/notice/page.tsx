// 공지사항 페이지
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { getAllPosts } from "@/lib/api";
import { DataTable } from "@/components/notice/data-table";
import { columns } from "@/components/notice/columns";
import Title from "@/components/custom/title";

export default function Page() {
    const posts = getAllPosts("_notice");
    return (
        <>
            {/* 제목 배너 */}
            <Title image={bg} title="공지사항" description="코마 새소식을 가장 먼저 만나보세요" />
            {/* 검색, 게시글 목록, 페이지네이션 */}
            <DataTable columns={columns} data={posts} />
        </>
    );
}
