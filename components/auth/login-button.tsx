import { Button } from "../ui/button";

type Props = {
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    className?: string | undefined;
};

export default function LoginButton({ size, className }: Props) {
    return (
        <Button size={size} className={className}>
            로그인
        </Button>
    );
}
