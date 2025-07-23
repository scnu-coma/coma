import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
import { NavigationMenu } from "./ui/navigation-menu";

export default function Header() {
    return (
        <header className="sticky top-0 backdrop-blur py-2 z-50 bg-background/90 supports-[backdrop-filter]:bg-background/60">
            <div className="flex items-center justify-between md:w-[650px] md:mx-auto mx-4">
                {/* 로고 */}
                <h1 className="font-semibold">
                    <Link href="/">코딩마스터</Link>
                </h1>
                <NavigationMenu />
                {/* 다크 모드 / 라이트 모드 테마 전환 버튼 */}
                <ModeToggle />
            </div>
        </header>
    );
}
