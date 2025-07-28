"use client";
import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import LoginButton from "./auth/login-button";
import logoFull from "@/public/logo/logo-full.svg";
import Image from "next/image";
import Ping from "./ui/ping";

// 웹사이트 메뉴 목록은 이 배열을 수정하세요
// 절대로 다른 코드에서 직접 추가하지 마세요
const components: { title: string; href: string }[] = [
    { title: "공지사항", href: "/notice" },
    { title: "동아리 소개", href: "#" },
    { title: "부실 예약", href: "#" },
];

export default function Header() {
    // const { user } = useAuth();
    return (
        <header className="sticky top-0 lg:py-6 py-3 z-50 lg:px-16 px-5 items-center text-center  bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <NavigationMenu viewport={false} className="min-w-full justify-between">
                {/* 좌측 고정 메뉴 */}
                <NavigationMenuList className="flex-row-reverse md:flex-row">
                    {/* 좌측 고정 메뉴 : 로고 */}
                    <NavigationMenuItem className="pr-4">
                        <Link href="/">
                            <Image className="dark:invert lg:h-8 h-6" src={logoFull} alt="coma's logo" height={32} />
                        </Link>
                    </NavigationMenuItem>
                    {/* 좌측 고정 메뉴 : 로고가 아닌 것 */}
                    {/* 태블릿 / PC버전 */}
                    <div className="hidden lg:flex">
                        {components.map((component) => (
                            <NavigationMenuItem
                                key={component.title}
                                className="flex flex-col after:block after:content-[''] after:h-0.5 after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left"
                            >
                                <Link href={component.href} className="px-4 py-2 text-sm">
                                    {component.title}
                                </Link>
                                {/* <div className="h-0.5 bg-amber-300 w-full after:scale-x" /> */}
                            </NavigationMenuItem>
                        ))}
                        {/* '부원 모집 중' 버튼은 모집 기간에 따라 자동으로 숨김 및 비활성화 처리 로직 구현 필요 */}
                        <NavigationMenuItem className="flex flex-col text-primary after:block after:content-[''] after:h-0.5 after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left">
                            <Link href="/recruitment-2025-2" className="px-4 py-2 text-sm">
                                부원 모집 중
                            </Link>
                        </NavigationMenuItem>
                        <Ping />
                    </div>
                    {/* 모바일 버전 (구현 필요) */}
                </NavigationMenuList>
                {/* 우측 고정 메뉴 (회원가입, 로그인, 모드 전환) */}
                <NavigationMenuList className="ml-auto space-x-4">
                    <span className="truncate font-medium">홍길동 님</span>
                    <NavigationMenuItem>
                        <Tooltip open>
                            <TooltipTrigger>
                                <LoginButton size="default" />
                            </TooltipTrigger>
                            <TooltipContent className="hidden lg:block">카카오로 1초만에 로그인!</TooltipContent>
                        </Tooltip>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        {/* 다크 모드 / 라이트 모드 테마 전환 버튼 */}
                        <ModeToggle />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </header>
    );
}
