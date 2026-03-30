type Props = {
    children: string | React.ReactNode;
    className?: string;
};

export function TypographyH1({ children, className }: Props) {
    return (
        <h1 className={`font-extrabold scroll-m-20 text-4xl tracking-tight text-balance ${className}`}>{children}</h1>
    );
}

export function TypographyH2({ children, className }: Props) {
    return (
        <h2 className={`${className} scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`}>
            {children}
        </h2>
    );
}

export function TypographyH3({ children, className }: Props) {
    return <h3 className={`${className} scroll-m-20 text-2xl font-semibold tracking-tight`}>{children}</h3>;
}

export function TypographyH4({ children, className }: Props) {
    return <h4 className={`${className} scroll-m-20 text-xl font-semibold tracking-tight`}>{children}</h4>;
}

export function TypographyP({ children, className }: Props) {
    return <p className={`${className} leading-7 [&:not(:first-child)]:mt-6`}>{children}</p>;
}

export function TypographyBlockquote({ children, className }: Props) {
    return <blockquote className={`${className} mt-6 border-l-2 pl-6 italic`}>{children}</blockquote>;
}

// 입력 요소가 여러 개 필요한 Table, List는 나중에 완성합시다.

export function TypographyTable({ children, className }: Props) {
    return (
        <div className={`${className} my-6 w-full overflow-y-auto`}>
            <table className={`w-full`}>{children}</table>
        </div>
    );
}

export function TypographyTr({ children, className }: Props) {
    return <tr className={`${className} even:bg-muted m-0 border-t p-0`}>{children}</tr>;
}
export function TypographyTh({ children, className }: Props) {
    return (
        <th
            className={`${className} border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right`}
        >
            {children}
        </th>
    );
}
export function TypographyTd({ children, className }: Props) {
    return (
        <td
            className={`${className} border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right`}
        >
            {children}
        </td>
    );
}

export function TypographyUnlisted({ children, className }: Props) {
    return <ul className={`${className} my-6 ml-6 list-disc [&>li]:mt-2`}>{children}</ul>;
}

export function TypographyInlineCode({ children, className }: Props) {
    return (
        <code
            className={`${className} bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
        >
            {children}
        </code>
    );
}

export function TypographyLead({ children, className }: Props) {
    return <p className={`${className} text-muted-foreground text-xl`}>{children}</p>;
}

export function TypographyLarge({ children, className }: Props) {
    return <div className={`${className} text-lg font-semibold`}>{children}</div>;
}

export function TypographySmall({ children, className }: Props) {
    return <small className={`${className} text-sm leading-none font-medium`}>{children}</small>;
}

export function TypographyMuted({ children, className }: Props) {
    return <p className={`${className} text-muted-foreground text-sm`}>{children}</p>;
}
