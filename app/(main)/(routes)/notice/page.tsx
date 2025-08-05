import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import bg from "@/public/images/vishnu-mohanan-pfR18JNEMv8-unsplash.webp";
import { TypographyH2 } from "@/components/typography/typography";
import Link from "next/link";

const posts = [
    {
        tag: "공지",
        title: "1번째 공지사항",
        author: "운영진",
        date: "2025-05-01",
        postId: 1,
    },
    {
        tag: "공지",
        title: "한 페이지당 10개까지만 표시됨",
        author: "운영진",
        date: "2025-06-01",
        postId: 2,
    },
    {
        tag: "행사",
        title: "3번째 공지사항",
        author: "운영진",
        date: "2025-07-01",
        postId: 3,
    },
    {
        tag: "공지",
        title: "코마 웹사이트 오픈",
        author: "운영진",
        date: "2025-08-01",
        postId: 4,
    },
    {
        tag: "행사",
        title: "2025년 2학기 신규 부원 모집안내",
        author: "운영진",
        date: "2025-09-01",
        postId: 5,
    },
    {
        tag: "행사",
        title: "공지사항",
        author: "운영진",
        date: "2025-10-01",
        postId: 6,
    },
    {
        tag: "행사",
        title: "공지사항",
        author: "운영진",
        date: "2025-11-01",
        postId: 7,
    },
    {
        tag: "행사",
        title: "공지사항",
        author: "운영진",
        date: "2025-12-01",
        postId: 8,
    },
    {
        tag: "행사",
        title: "공지사항",
        author: "운영진",
        date: "2026-01-01",
        postId: 9,
    },
    {
        tag: "행사",
        title: "공지사항공지사항공지사항공지사항공지사항공지사항공지사항",
        author: "운영진",
        date: "2026-02-01",
        postId: 10,
    },
    {
        tag: "행사",
        title: "11번째 공지사항",
        author: "운영진",
        date: "2026-03-01",
        postId: 11,
    },
];

export default function Page() {
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
            <Table className="md:my-16 my-12">
                <TableBody>
                    {posts
                        .map((post) => (
                            <TableRow key={post.postId} className="w-full block">
                                <Link
                                    href={`/notice/${post.postId}`}
                                    className="w-full flex lg:flex-row flex-col h-24 lg:items-center lg:justify-between justify-center text-base"
                                >
                                    <div>
                                        <TableCell>
                                            <span className="font-medium text-center text-sm text-primary border border-accent w-fit lg:mx-4 lg:px-6 px-4 py-1 bg-background rounded-3xl">
                                                {post.tag}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="lg:ml-2 min-w-20 break-all">{post.title}</span>
                                        </TableCell>
                                    </div>
                                    <div>
                                        <TableCell>
                                            <span className="text-sm ml-auto xl:mr-36 lg:mr-24 mr-2 not-lg:ml-2.5">
                                                {post.author}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground mr-4">{post.date}</span>
                                        </TableCell>
                                    </div>
                                </Link>
                            </TableRow>
                        ))
                        .slice(-10)
                        .reverse()}
                </TableBody>
            </Table>
            {/* 페이지네이션 */}
            <Pagination className="mb-16">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    );
}
