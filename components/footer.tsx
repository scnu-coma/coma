import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "@/public/logo/instagram.svg";
import GithubIcon from "@/public/logo/github.svg";
import { MessageCircle } from "lucide-react";

const components: { title: string; href: string }[] = [
    {
        title: "공지사항",
        href: "/notice",
    },
    {
        title: "동아리 소개",
        href: "/about",
    },
    {
        title: "문의사항",
        href: "#",
    },
];

export default function Footer() {
    return (
        <footer className="lg:pb-12 pb-24 py-3 lg:px-16 px-5 text-sm lg:grid lg:grid-cols-6 flex flex-col-reverse lg:items-center text-muted-foreground">
            <span>© 2026 | Coding Master</span>
            <ul className="lg:text-center col-span-4 flex lg:flex-row flex-col lg:gap-12 gap-6 my-6 justify-center">
                <li>
                    <Link href="/privacy/v1" className="text-primary" scroll={true}>
                        개인정보 처리방침
                    </Link>
                </li>
                {components.map((component) => (
                    <li key={component.title}>
                        <Link href={component.href} className="hover:text-primary transition-colors">
                            {component.title}
                        </Link>
                    </li>
                ))}
            </ul>
            {/* SNS 아이콘 */}
            <ul className="lg:ml-auto flex gap-8 dark:invert items-center">
                <li>
                    <Link
                        href="https://discord.gg/bqBgY8FxxH"
                        target="_blank"
                        className="opacity-50 hover:opacity-100 transition-opacity flex items-center"
                        title="Discord"
                    >
                        <MessageCircle className="w-5 h-5" />
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://www.instagram.com/scnu_coma"
                        target="_blank"
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <Image src={InstagramIcon} alt="instagram icon" />
                    </Link>
                </li>
                <li>
                    <Link
                        href="https://github.com/scnu-coma"
                        target="_blank"
                        className="opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <Image src={GithubIcon} alt="github icon" />
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
