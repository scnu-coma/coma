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
    TypographyStrong,
    TypographyTable,
    TypographyTd,
    TypographyTh,
    TypographyTr,
    TypographyUnlisted,
    TypographyInlineCode,
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
                            className="text-primary font-medium underline underline-offset-4 hover:text-primary/80 transition-colors"
                        >
                            {children}
                        </a>
                    );
                },
                h1: function H1Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH1 {...props} className="text-3xl! mt-10 mb-6">
                            {children}
                        </TypographyH1>
                    );
                },
                h2: function H2Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH2 {...props} className="text-2xl! mt-8 mb-4 border-b pb-2">
                            {children}
                        </TypographyH2>
                    );
                },
                h3: function H3Component({ children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
                    return (
                        <TypographyH3 {...props} className="text-xl! mt-6 mb-3">
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
                        return <ul {...props} className="my-6 space-y-2">{children}</ul>;
                    }
                    return <TypographyUnlisted {...props}>{children}</TypographyUnlisted>;
                },
                li: function TaskListItemComponent({ children, className, ...props }: LiHTMLAttributes<HTMLElement>) {
                    if (className?.includes("task-list-item")) {
                        return (
                            <li className="flex items-start gap-2 my-1" {...props}>
                                {children}
                            </li>
                        );
                    }
                    return <li {...props} className="leading-7">{children}</li>;
                },
                input: function InputComponent({ type, checked, ...props }: InputHTMLAttributes<HTMLButtonElement>) {
                    if (type === "checkbox") {
                        return (
                            <Checkbox
                                checked={checked}
                                className={cn("mt-1.5 shrink-0 disabled:cursor-default! disabled:opacity-100!")}
                                {...props}
                            />
                        );
                    }
                },
                em: function EmComponent({ children, ...props }: HTMLAttributes<HTMLElement>) {
                    return <span {...props} className="italic text-muted-foreground">{children}</span>;
                },
                strong: function StrongComponent({ children, ...props }: HTMLAttributes<HTMLElement>) {
                    return <TypographyStrong {...props}>{children}</TypographyStrong>;
                },
                code: function CodeComponent({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
                    return <TypographyInlineCode {...props} className={className}>{children}</TypographyInlineCode>;
                },
                pre: function PreComponent({ children, ...props }: HTMLAttributes<HTMLPreElement>) {
                    return (
                        <pre {...props} className="my-6 overflow-x-auto rounded-lg bg-muted p-4 border border-border">
                            {children}
                        </pre>
                    );
                },
                table: function TableComponent({ children, ...props }: TableHTMLAttributes<HTMLTableElement>) {
                    return <TypographyTable {...props}>{children}</TypographyTable>;
                },
                thead: function TheadComponent({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
                    return (
                        <thead {...props} className={cn("bg-muted/50", props.className)}>
                            {children}
                        </thead>
                    );
                },
                tbody: function TbodyComponent({ children, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
                    return <tbody {...props}>{children}</tbody>;
                },
                tr: function TrComponent({ children, ...props }: HTMLAttributes<HTMLTableRowElement>) {
                    return (
                        <TypographyTr {...props} className={props.className}>
                            {children}
                        </TypographyTr>
                    );
                },
                td: function TdComponent({ children, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
                    return (
                        <TypographyTd {...props} className={props.className}>
                            {children}
                        </TypographyTd>
                    );
                },
                th: function ThComponent({ children, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
                    return (
                        <TypographyTh {...props} className={props.className}>
                            {children}
                        </TypographyTh>
                    );
                },
                caption: function CaptionComponent({ children, ...props }: HTMLAttributes<HTMLElement>) {
                    return (
                        <caption {...props} className={cn("text-sm text-muted-foreground mt-2", props.className)}>
                            {children}
                        </caption>
                    );
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
