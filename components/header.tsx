"use client";
import { ModeToggle } from "@/components/theme/theme-toggler";
import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import logoFull from "@/public/logo/logo-full.svg";
import Image from "next/image";
import Ping from "./ui/ping";
import {
    ChevronDownIcon,
    HomeIcon,
    MenuIcon,
    ShieldAlertIcon,
    UserPenIcon,
    UserRoundIcon,
} from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

const components: { title: string; href: string }[] = [
    { title: "공지사항", href: "/notice" },
    { title: "동아리 소개", href: "/about" },
    { title: "코마 혜택", href: "/advantage" },
    { title: "부실 예약", href: "/reservation" },
];

export default function Header() {
    const { user, logout, isLoading } = useAuth();
    const [mobileDrawerControl, setMobileDrawerControl] = useState(false);
    const [scrollDown, setScrollDown] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [recruitment, setRecruitment] = useState({ is_actually_open: false, year: 2025, term: 2 });

    useEffect(() => {
        setIsMounted(true);
        
        // 모집 설정 가져오기
        fetch("/api/recruitment/settings")
            .then(res => res.json())
            .then(data => setRecruitment(data))
            .catch(err => console.error("Recruitment fetch error:", err));

        let prevPos = window.scrollY;
        const handleScroll = () => {
            const currentPos = window.scrollY;
            if (currentPos > prevPos + 10) { // 최소 10px 이상 내려갈 때만 숨김
                setScrollDown(true);
            } else if (currentPos < prevPos - 10) { // 최소 10px 이상 올라올 때만 나타남
                setScrollDown(false);
            }
            prevPos = currentPos;
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const roleLabel = (role: string, status: string) => {
        if (status === "PENDING") return "인증 대기";
        if (status === "REJECTED") return "가입 거절";
        if (role === "ADMIN") return "최고관리자";
        return "코마 부원";
    };

    return (
        <>
            <header
                className={`${
                    scrollDown ? "-translate-y-full lg:translate-y-0" : "translate-y-0"
                } transition-transform duration-500 fixed w-full top-0 lg:py-6 py-2 z-50 lg:px-16 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
                <NavigationMenu viewport={false} className="lg:flex hidden min-w-full justify-between">
                    <NavigationMenuList className="flex-row min-w-full">
                        <NavigationMenuItem className="pr-4">
                            <Link href="/">
                                <Image className="dark:invert h-8 w-fit" src={logoFull} alt="coma's logo" />
                            </Link>
                        </NavigationMenuItem>
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
                            {recruitment.is_actually_open && (
                                <>
                                    <NavigationMenuItem className="flex flex-col text-primary after:block after:content-[''] after:h-0.5 after:bg-primary after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition after:duration-300 after:origin-left">
                                        <Link
                                            href="/recruitment/apply"
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
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            {!isMounted || isLoading ? (
                                <Skeleton className="w-24 h-9 rounded-md" />
                            ) : user ? (
                                <div className="flex ml-auto items-center text-sm">
                                    <span className="border rounded-full text-xs text-muted-foreground px-3 py-0.5 mr-2 bg-background">
                                        {roleLabel(user.role, user.status)}
                                    </span>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild className="mr-4">
                                            <Button variant="ghost" className="truncate font-medium flex items-center">
                                                <span>{user.name} 님</span>
                                                <ChevronDownIcon size={16} className="ml-1" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <Link href="/dashboard">
                                                <DropdownMenuItem>
                                                    <UserPenIcon className="w-4 h-4 mr-2" />
                                                    대시보드
                                                </DropdownMenuItem>
                                            </Link>
                                            {user.role === "ADMIN" && (
                                                <Link href="/admin">
                                                    <DropdownMenuItem>
                                                        <ShieldAlertIcon className="w-4 h-4 mr-2" />
                                                        관리자 페이지
                                                    </DropdownMenuItem>
                                                </Link>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <Button size="default" onClick={logout} className="text-sm">
                                        로그아웃
                                    </Button>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <Button size="default" className="text-sm font-bold">
                                        로그인
                                    </Button>
                                </Link>
                            )}
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <ModeToggle />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
                {/* 모바일 Nav 생략 (동일한 로직 적용 가능) */}
                <nav className="flex lg:hidden min-w-full justify-center items-center">
                    <Link href="/" className="absolute">
                        <Image className="dark:invert h-6 w-fit" src={logoFull} alt="coma's logo" />
                    </Link>
                    <div className="ml-auto">
                        <ModeToggle />
                    </div>
                </nav>
            </header>
            
            {/* 모바일 하단바 */}
            <div
                className={`${
                    scrollDown ? "translate-y-full" : "translate-y-0"
                } transition-transform duration-500 fixed lg:hidden w-full bottom-0 py-4 z-50 px-5 text-center bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
            >
                <nav className="lg:hidden min-w-full">
                    <ul className="flex justify-center items-center gap-x-28">
                        <li>
                            <Drawer>
                                <DrawerTrigger asChild>
                                    <MenuIcon />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader className="hidden"><DrawerTitle /></DrawerHeader>
                                    <nav>
                                        <ul className="pl-8 py-10 space-y-6 text-xl font-semibold text-left">
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
                                            {recruitment.is_actually_open && (
                                                <li>
                                                    <Link href="/recruitment/apply" className="text-primary flex items-center gap-2">
                                                        <DrawerClose>부원 모집 중</DrawerClose>
                                                        <Ping />
                                                    </Link>
                                                </li>
                                            )}
                                        </ul>
                                    </nav>
                                    <DrawerDescription />
                                </DrawerContent>
                            </Drawer>
                        </li>
                        <li>
                            <Link href="/"><HomeIcon /></Link>
                        </li>
                        <li>
                            <Drawer open={mobileDrawerControl} onClose={() => setMobileDrawerControl(false)}>
                                <DrawerTrigger onClick={() => setMobileDrawerControl(true)}>
                                    <UserRoundIcon />
                                </DrawerTrigger>
                                <DrawerContent>
                                    <DrawerHeader className="hidden"><DrawerTitle /></DrawerHeader>
                                    <div className="px-8 py-10">
                                        {!isMounted || isLoading ? (
                                            <Skeleton className="w-full h-12" />
                                        ) : user ? (
                                            <ul className="space-y-6 text-xl font-semibold text-left">
                                                <li className="flex justify-between items-center">
                                                    <div>
                                                        <span>{user.name} 님</span>
                                                        <span className="border rounded-full text-xs text-muted-foreground px-3 py-0.5 ml-2 bg-background">
                                                            {roleLabel(user.role, user.status)}
                                                        </span>
                                                    </div>
                                                    <Button onClick={() => { logout(); setMobileDrawerControl(false); }}>
                                                        로그아웃
                                                    </Button>
                                                </li>
                                                <li><Link href="/dashboard" onClick={() => setMobileDrawerControl(false)}>대시보드</Link></li>
                                                {user.role === "ADMIN" && (
                                                    <li><Link href="/admin" onClick={() => setMobileDrawerControl(false)}>관리자 페이지</Link></li>
                                                )}
                                            </ul>
                                        ) : (
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-semibold">로그인이 필요합니다.</span>
                                                <Link href="/login" onClick={() => setMobileDrawerControl(false)}>
                                                    <Button>로그인</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                    <DrawerDescription />
                                </DrawerContent>
                            </Drawer>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
