import PostHeader from "@/components/posts/post-header";
import { Button } from "@/components/ui/button";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import MarkdownRenderer from "@/lib/markdown-renderer";
import { parseDate } from "@/lib/parse-date";
import Link from "next/link";
import { notFound } from "next/navigation";

const all = getAllPosts("_notice");

type Slugs = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function Page({ params }: Slugs) {
    const post = getPostBySlug("_notice", (await params).slug);
    if (!post) return notFound();
    return (
        <>
            <PostHeader tag={post.tag} title={post.title} date={parseDate(post.date)} author={post.author} />
            <MarkdownRenderer post={post.content} />
            <div className="w-full flex my-12">
                <Link href="/notice" className="mx-auto">
                    <Button className="w-36 h-12 rounded-3xl hover:cursor-pointer">목록으로</Button>
                </Link>
            </div>
        </>
    );
}
export async function generateStaticParams() {
    return all.map((post) => ({
        slug: post.slug,
    }));
}
