"use client";
import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import logoFull from "@/public/logo/logo-full.svg";
import Image from "next/image";
import Ping from "./ui/ping";
import { HomeIcon, MenuIcon, UserRoundIcon } from "lucide-react";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { recruitmentOpen, recruitmentTerm, recruitmentYear } from "@/data/recruitment";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";

// 웹사이트 메뉴 목록은 이 배열을 수정하세요
// 절대로 다른 코드에서 직접 추가하지 마세요
const components: { title: string; href: string }[] = [
    { title: "공지사항", href: "/notice" },
    { title: "동아리 소개", href: "#" },
    { title: "코마 혜택", href: "#" },
    { title: "부실 예약", href: "#" },
];

export default function Header() {
    const { user, login, logout } = useAuth();

    // 모바일 버전에서
    // 아래로 스크롤 시 최상단 header와 최하단 메뉴바가 사라지고
    // 위로 스크롤 시 다시 나타나는 효과
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
                } transition-transform duration-500 fixed w-full top-0 lg:py-6 py-2 z-50 lg:px-16 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
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
                                    {component.href === "#" ? (
                                        <Dialog>
                                            <DialogTrigger className="px-4 py-2 text-sm">
                                                {component.title}
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>안내</DialogTitle>
                                                <DialogDescription>준비중입니다.</DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                    ) : (
                                        <Link href={component.href} className="px-4 py-2 text-sm">
                                            {component.title}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                            {recruitmentOpen() && (
                                <>
                                    <NavigationMenuItem className="flex flex-col text-primary after:block after:content-[''] after:h-0.5 after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left">
                                        <Link
                                            href={`/recruitment/${recruitmentYear}-${recruitmentTerm}`}
                                            className="px-4 py-2 text-sm"
                                        >
                                            부원 모집 중
                                        </Link>
                                    </NavigationMenuItem>
                                    <Ping />
                                </>
                            )}
                        </div>
                    </NavigationMenuList>
                    {/* 우측 메뉴 (회원가입, 로그인, 모드 전환) */}
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            {user && user ? (
                                <div className="flex ml-auto items-center">
                                    {/* 권한 수준에 따라 수정할 것 */}
                                    {/* 인증 대기 / 코마 부원 / 운영진 / 관리자 */}
                                    <span className="border rounded-full text-sm text-muted-foreground px-3 py-0.5 mr-2 bg-background">
                                        인증 대기
                                    </span>
                                    <span className="truncate font-medium mr-4">{user.user_metadata.name} 님</span>
                                    <Button size="default" onClick={logout}>
                                        로그아웃
                                    </Button>
                                </div>
                            ) : (
                                <Tooltip open>
                                    <TooltipTrigger asChild>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="default">로그인</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>안내</DialogTitle>
                                                <DialogDescription>준비중입니다.</DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                        {/* 로그인 기능 정식 오픈 시 교체할 것 */}
                                        {/* <Button size="default" onClick={login}>
                                            로그인
                                        </Button> */}
                                    </TooltipTrigger>
                                    <TooltipContent
                                        className={`${
                                            scrollDown ? "opacity-0 lg:opacity-100" : "opacity-100"
                                        } transition-opacity duration-300 lg:block hidden`}
                                    >
                                        카카오로 1초만에 로그인!
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            {/* 다크 모드 / 라이트 모드 테마 전환 버튼 */}
                            <ModeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* 모바일 버전 */}
                <nav>
                    <ul className="flex lg:hidden min-w-full justify-center items-center">
                        <li className="absolute">
                            {/* 코마 로고 */}
                            <Link href="/">
                                <Image className="dark:invert h-6 w-fit" src={logoFull} alt="coma's logo" />
                            </Link>
                        </li>
                        <li className="ml-auto">
                            {/* 다크 모드 / 라이트 모드 테마 전환 버튼 */}
                            <ModeToggle />
                        </li>
                    </ul>
                </nav>
            </header>
            {/* 모바일 버전 하단 메뉴 */}
            <div
                className={`${
                    scrollDown ? "translate-y-full" : "translate-y-0"
                } transition-transform duration-500 fixed lg:hidden w-full bottom-0 py-4 z-50 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
                <nav className="lg:hidden min-w-full">
                    <ul className="flex justify-center items-center gap-x-28">
                        {/* (모바일 버전) 메뉴 버튼 */}
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
                                                    {component.href === "#" ? (
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <DrawerClose>{component.title}</DrawerClose>
                                                            </DialogTrigger>
                                                            <DialogContent>
                                                                <DialogTitle>안내</DialogTitle>
                                                                <DialogDescription>준비중입니다.</DialogDescription>
                                                            </DialogContent>
                                                        </Dialog>
                                                    ) : (
                                                        <Link href={component.href}>
                                                            <DrawerClose>{component.title}</DrawerClose>
                                                        </Link>
                                                    )}
                                                </li>
                                            ))}
                                            {recruitmentOpen() && (
                                                <li>
                                                    <Link href={`/recruitment/${recruitmentYear}-${recruitmentTerm}`}>
                                                        <DrawerClose>부원 모집 중</DrawerClose>
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                </DrawerContent>
                            </Drawer>
                        </li>
                        {/* (모바일 버전) 홈 버튼 */}
                        <li>
                            <Link href="/">
                                <HomeIcon />
                            </Link>
                        </li>
                        {/* (모바일 버전) 유저 버튼 */}
                        <li>
                            {user && user ? (
                                <Drawer>
                                    <DrawerTrigger>
                                        <UserRoundIcon />
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <ul className="px-8 py-10 space-y-6 text-xl font-semibold flex justify-between">
                                            <li>
                                                {user && user.user_metadata.name} 님{/* 권한 수준에 따라 수정할 것 */}
                                                {/* 인증 대기 / 코마 부원 / 운영진 / 관리자 */}
                                                <span className="border rounded-full text-sm text-muted-foreground px-3 py-0.5 ml-2 bg-background">
                                                    인증 대기
                                                </span>
                                            </li>
                                            <li>
                                                <Button onClick={logout}>로그아웃</Button>
                                            </li>
                                        </ul>
                                    </DrawerContent>
                                </Drawer>
                            ) : (
                                <Dialog>
                                    <DialogTrigger>
                                        <UserRoundIcon />
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>안내</DialogTitle>
                                        <DialogDescription>준비중입니다.</DialogDescription>
                                    </DialogContent>
                                </Dialog>
                                /* 로그인 기능 정식 오픈 시 교체할 것 */
                                // <span onClick={login}>
                                //     <UserRoundIcon />
                                // </span>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
