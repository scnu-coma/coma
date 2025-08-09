import { TypographyH1 } from "@/components/typography/typography";
import { getAllPosts, getPostBySlug } from "@/lib/api";
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
            <TypographyH1>{post.title}</TypographyH1>
            <p>{post.date}</p>
            <p>{decodeURI(post.slug)}</p>
            <p>{post.content}</p>
        </>
    );
}
export async function generateStaticParams() {
    return all.map((post) => ({
        slug: post.slug,
    }));
}
