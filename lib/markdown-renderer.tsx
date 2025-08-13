"use client";
import {
    BlockquoteHTMLAttributes,
    ImgHTMLAttributes,
    LiHTMLAttributes,
    TableHTMLAttributes,
    TdHTMLAttributes,
    ThHTMLAttributes,
    HTMLAttributes,
    useEffect,
    InputHTMLAttributes,
    useMemo,
} from "react";
import useRemark from "@/hooks/use-remark";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "./utils";
import MarkdownImage from "@/components/posts/markdown-image";
import {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyP,
    TypographyTable,
    TypographyTd,
    TypographyTh,
    TypographyTr,
    TypographyUnlisted,
} from "@/components/typography/typography";
import { Skeleton } from "@/components/ui/skeleton";

const MarkdownRenderer = ({ post }: { post: string }) => {
    const rehypeReactOptions = useMemo(
        () => ({
            components: {
                p: function ParagraphComponent({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
                    return <TypographyP {...props}>{children}</TypographyP>;
                },
                a: function AnchorComponent({ children, ...props }: HTMLAttributes<HTMLAnchorElement>) {
                    return (
                        <a
                            {...props}
                            className="underline hover:text-accent hover:bg-accent-foreground transition-colors duration-100 rounded-xs"
                        >
                            {children}
                        </a>
                    );
                },
                h1: function H1Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH1 {...props} className="text-3xl!">
                            {children}
                        </TypographyH1>
                    );
                },
                h2: function H2Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH2 {...props} className="text-2xl!">
                            {children}
                        </TypographyH2>
                    );
                },
                h3: function H3Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH3 {...props} className="text-xl!">
                            {children}
                        </TypographyH3>
                    );
                },
                blockquote: function BlockquoteComponent({
                    children,
                    ...props
                }: BlockquoteHTMLAttributes<HTMLQuoteElement>) {
                    return <TypographyBlockquote {...props}>{children}</TypographyBlockquote>;
                },
                img: function ImageComponent({ src, alt, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
                    return <MarkdownImage src={src} alt={alt} {...props} />;
                },
                ul: function UnlistedComponent({ children, className, ...props }: LiHTMLAttributes<HTMLElement>) {
                    if (className?.includes("contains-task-list")) {
                        return <ul {...props}>{children}</ul>;
                    }
                    return <TypographyUnlisted {...props}>{children}</TypographyUnlisted>;
                },
                li: function TaskListItemComponent({ children, className, ...props }: LiHTMLAttributes<HTMLElement>) {
                    // 체크박스와 라벨 정렬
                    if (className?.includes("task-list-item")) {
                        return (
                            <li className="flex items-center my-1" {...props}>
                                {children}
                            </li>
                        );
                    }
                    return <li {...props}>{children}</li>;
                },
                input: function InputComponent({ type, checked, ...props }: InputHTMLAttributes<HTMLButtonElement>) {
                    if (type === "checkbox") {
                        return (
                            <Checkbox
                                checked={checked}
                                className={cn("mr-2 disabled:cursor-default! disabled:opacity-100!")}
                                {...props}
                            />
                        );
                    }
                },
                em: function EmComponent({ children, ...props }: HTMLAttributes<HTMLElement>) {
                    return <span {...props}>{children}</span>;
                },
                table: function TableComponent({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) {
                    return <TypographyTable {...props}>{children}</TypographyTable>;
                },
                tr: function TrComponent({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
                    return <TypographyTr {...props}>{children}</TypographyTr>;
                },
                td: function TdComponent({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
                    return <TypographyTd {...props}>{children}</TypographyTd>;
                },
                th: function ThComponent({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
                    return <TypographyTh {...props}>{children}</TypographyTh>;
                },
            },
        }),
        []
    );

    const [markdown, setMarkdown] = useRemark({
        rehypeReactOptions,
    });

    useEffect(() => {
        if (post) {
            setMarkdown(post);
        }
    }, [post, setMarkdown]);

    if (markdown == null) {
        return <Skeleton />;
    }

    return markdown;
};

export default MarkdownRenderer;
