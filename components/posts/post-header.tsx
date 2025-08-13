import { TypographyH1, TypographyMuted } from "@/components/typography/typography";

type Params = {
    tag: string;
    title: string;
    date: string;
    author: string;
};

export default function PostHeader({ tag, title, date, author }: Params) {
    return (
        <div className="my-12">
            <TypographyH1 className="text-3xl! mb-2">
                {"["}
                {tag}
                {"]"} {title}
            </TypographyH1>
            <span className="flex items-center gap-4">
                <TypographyMuted>{author}</TypographyMuted>
                <TypographyMuted>{date}</TypographyMuted>
            </span>
        </div>
    );
}
