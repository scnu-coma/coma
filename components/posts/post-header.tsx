import { TypographyH1, TypographyMuted } from "@/components/typography/typography";
import PostTag from "./post-tag";

type Params = {
    tag: string;
    title: string;
    date: string;
    author: string;
};

export default function PostHeader({ tag, title, date, author }: Params) {
    return (
        <div className="my-6 py-6 flex flex-col justify-center items-center bg-muted rounded-3xl">
            <div className="flex items-center not-lg:gap-2">
                <PostTag>{tag}</PostTag>
                <TypographyH1 className="lg:text-2xl! text-lg! lg:mb-1">{title}</TypographyH1>
            </div>
            <span className="flex items-center gap-4">
                <TypographyMuted className="not-lg:text-xs!">{author}</TypographyMuted>
                <TypographyMuted className="not-lg:text-xs!">{date}</TypographyMuted>
            </span>
        </div>
    );
}
