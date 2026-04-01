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
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2">
                <PostTag>{tag}</PostTag>
                <span className="text-muted-foreground text-sm font-medium">{author}</span>
                <span className="text-muted-foreground text-sm">•</span>
                <span className="text-muted-foreground text-sm">{date}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight">
                {title}
            </h1>
        </div>
    );
}
