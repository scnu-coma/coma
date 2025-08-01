"use client";
import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import LoginButton from "./auth/login-button";
import logoFull from "@/public/logo/logo-full.svg";
import Image from "next/image";
import Ping from "./ui/ping";
import { HomeIcon, MenuIcon, UserRoundIcon } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";

// 웹사이트 메뉴 목록은 이 배열을 수정하세요
// 절대로 다른 코드에서 직접 추가하지 마세요
const components: { title: string; href: string }[] = [
    { title: "공지사항", href: "/notice" },
    { title: "동아리 소개", href: "#" },
    { title: "부실 예약", href: "#" },
];

export default function Header() {
    // const { user } = useAuth();

    const [scrollDown, setScrollDown] = useState(false);
    useEffect(() => {
        let prevPos = window.scrollY;
        window.addEventListener("scroll", () => {
            const currentPos = window.scrollY;
            if (currentPos > prevPos) {
                setScrollDown(true);
            } else if (currentPos < prevPos) {
                setScrollDown(false);
            }
            prevPos = currentPos;
        });
    }, []);
    return (
        <>
            <header
                className={`${
                    scrollDown ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
                } transition-transform duration-500 fixed w-full top-0 lg:py-6 py-4 z-50 lg:px-16 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
                {/* PC버전 */}
                <NavigationMenu viewport={false} className="lg:flex hidden min-w-full justify-between">
                    {/* 좌측 메뉴 */}
                    <NavigationMenuList className="flex-row min-w-full">
                        {/* 코마 로고 */}
                        <NavigationMenuItem className="pr-4">
                            <Link href="/">
                                <Image className="dark:invert h-8 w-fit" src={logoFull} alt="coma's logo" />
                            </Link>
                        </NavigationMenuItem>
                        {/* 로고가 아닌 것 (게시판들) */}
                        <div className="flex">
                            {components.map((component) => (
                                <NavigationMenuItem
                                    key={component.title}
                                    className="flex flex-col after:block after:content-[''] after:h-0.5 after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left"
                                >
                                    <Link href={component.href} className="px-4 py-2 text-sm">
                                        {component.title}
                                    </Link>
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
                    </NavigationMenuList>
                    {/* 우측 메뉴 (회원가입, 로그인, 모드 전환) */}
                    <NavigationMenuList className="flex ml-auto space-x-4">
                        <span className="truncate font-medium">홍길동 님</span>
                        <NavigationMenuItem>
                            <Tooltip open>
                                <TooltipTrigger>
                                    {/* 기능이 완성되면 Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription 컴포넌트를 삭제할 수 있습니다 */}
                                    <Dialog>
                                        <DialogTrigger>
                                            {/* 로그인 버튼 */}
                                            <LoginButton size="default" />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>안내</DialogTitle>
                                            <DialogDescription>준비중입니다.</DialogDescription>
                                        </DialogContent>
                                    </Dialog>
                                </TooltipTrigger>
                                <TooltipContent
                                    className={`${
                                        scrollDown ? "opacity-0 lg:opacity-100" : "opacity-100"
                                    } transition-opacity duration-300 lg:block hidden`}
                                >
                                    카카오로 1초만에 로그인!
                                </TooltipContent>
                            </Tooltip>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            {/* 다크 모드 / 라이트 모드 테마 전환 버튼 */}
                            <ModeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* 모바일 버전 */}
                <NavigationMenu viewport={false} className="flex lg:hidden min-w-full justify-center">
                    {/* 코마 로고 */}
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                                <Image className="dark:invert h-6 w-fit" src={logoFull} alt="coma's logo" />
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
            {/* 모바일 버전 하단 메뉴 */}
            <div
                className={`${
                    scrollDown ? "translate-y-full" : "translate-y-0"
                } transition-transform duration-500 fixed lg:hidden w-full bottom-0 py-5 z-50 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
                <nav className="lg:hidden min-w-full">
                    {/* 좌측 메뉴 (게시판 관련) */}
                    <ul className="flex justify-center items-center gap-x-28">
                        <li>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <MenuIcon />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <nav>
                                        <ul className="pl-8 py-10 space-y-6 text-xl font-semibold">
                                            {components.map((component) => (
                                                <li key={component.title}>
                                                    <Link href={component.href}>
                                                        <DrawerClose>{component.title}</DrawerClose>
                                                    </Link>
                                                </li>
                                            ))}
                                            <li>
                                                <Link href="/recruitment-2025-2">
                                                    <DrawerClose>부원 모집 중</DrawerClose>
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </DrawerContent>
                            </Drawer>
                        </li>
                        <li>
                            <Link href="/">
                                <HomeIcon />
                            </Link>
                        </li>
                        <li>
                            <Dialog>
                                {/* DialogTrigger 컴포넌트에 의해 의문의 여백 5px이 발생했다... 로그인 기능이 완성되면 해결될 문제 */}
                                <DialogTrigger>
                                    <UserRoundIcon />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>안내</DialogTitle>
                                    <DialogDescription>준비중입니다.</DialogDescription>
                                </DialogContent>
                            </Dialog>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
