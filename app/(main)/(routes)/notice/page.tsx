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
import { getAllPosts } from "@/lib/api";

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
            <Table className="md:my-16 my-12">
                <TableBody>
                    {posts
                        .map((post) => (
                            <TableRow key={post.slug} className="w-full block">
                                <Link
                                    href={`/notice/${post.slug}`}
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
                                                {post.author.name}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-xs text-muted-foreground mr-4">{post.date}</span>
                                        </TableCell>
                                    </div>
                                </Link>
                            </TableRow>
                        ))
                        .slice(-10)}
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
