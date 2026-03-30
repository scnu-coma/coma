type Props = {
    fill?: string;
    color?: string;
    strokeWidth?: number;
    strokeLinecap?: "round" | "butt" | "square" | "inherit" | undefined;
    strokeLinejoin?: "round" | "inherit" | "miter" | "bevel" | undefined;
};
export default function TextInitial({ fill, color, strokeWidth, strokeLinecap, strokeLinejoin }: Props) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill={fill ?? "none"}
            stroke={color ?? "currentColor"}
            strokeWidth={strokeWidth ?? 2}
            strokeLinecap={strokeLinecap ?? "round"}
            strokeLinejoin={strokeLinejoin ?? "round"}
            className="lucide lucide-text-initial-icon lucide-text-initial"
        >
            <path d="M15 5h6" />
            <path d="M15 12h6" />
            <path d="M3 19h18" />
            <path d="m3 12 3.553-7.724a.5.5 0 0 1 .894 0L11 12" />
            <path d="M3.92 10h6.16" />
        </svg>
    );
}
