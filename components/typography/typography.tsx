type Props = {
    children: string | React.ReactNode;
    className?: string;
};

export function TypographyH1({ children, className }: Props) {
    return (
        <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ${className}`}>{children}</h1>
    );
}

export function TypographyH2({ children }: Props) {
    return <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>;
}

export function TypographyH3({ children }: Props) {
    return <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">{children}</h3>;
}

export function TypographyH4({ children }: Props) {
    return <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{children}</h4>;
}

export function TypographyP({ children }: Props) {
    return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }: Props) {
    return <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>;
}

// 입력 요소가 여러 개 필요한 Table, List는 나중에 완성합시다.

// export function TypographyTable({ children }: Props) {
//   return (
//     <div className="my-6 w-full overflow-y-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="even:bg-muted m-0 border-t p-0">
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               King's Treasury
//             </th>
//             <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
//               People's happiness
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr className="even:bg-muted m-0 border-t p-0">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Empty
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Overflowing
//             </td>
//           </tr>
//           <tr className="even:bg-muted m-0 border-t p-0">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Modest
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Satisfied
//             </td>
//           </tr>
//           <tr className="even:bg-muted m-0 border-t p-0">
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Full
//             </td>
//             <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
//               Ecstatic
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export function TypographyList({ children }: Props) {
//   return (
//     <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
//       <li>1st level of puns: 5 gold coins</li>
//       <li>2nd level of jokes: 10 gold coins</li>
//       <li>3rd level of one-liners : 20 gold coins</li>
//     </ul>
//   )
// }

export function TypographyInlineCode({ children }: Props) {
    return (
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
            {children}
        </code>
    );
}

export function TypographyLead({ children }: Props) {
    return <p className="text-muted-foreground text-xl">{children}</p>;
}

export function TypographyLarge({ children }: Props) {
    return <div className="text-lg font-semibold">{children}</div>;
}

export function TypographySmall({ children }: Props) {
    return <small className="text-sm leading-none font-medium">{children}</small>;
}

export function TypographyMuted({ children }: Props) {
    return <p className="text-muted-foreground text-sm">{children}</p>;
}
