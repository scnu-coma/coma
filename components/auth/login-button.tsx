import { Button } from "../ui/button";
import { supabase } from "@/lib/supabaseClient";

type Props = {
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    className?: string | undefined;
};

export default function LoginButton({ size, className }: Props) {
    const handleKakaoLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "kakao",
            options: {
                redirectTo: window.location.origin,
            },
        });
    };
    return (
        <Button size={size} className={className} onClick={handleKakaoLogin}>
            카카오로 로그인
        </Button>
    );
}
