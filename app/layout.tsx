import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AuthProvider } from "@/context/AuthContext";

const notoSansKR = Noto_Sans_KR({
    variable: "--font-noto-sans-kr",
    subsets: ["latin"],
});

// 도메인 구입하고 나면 metadataBase를 설정하세요
// openGraph 이미지도 설정하세요
// 중요!! favicon.ico 적용되지 않습니다. icon.ico로 적용하세요 공식문서에 안 나와있습니다
export const metadata: Metadata = {
    title: "코딩마스터",
    description: "국립순천대학교 코딩 동아리 코딩마스터",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${notoSansKR.className} antialiased lg:mt-[86px] mt-14`}>
                {/* 다크 모드 / 라이트 모드 테마 전역 관리 + 인증 전역 관리 */}
                <AuthProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <Header />
                        {children}
                        <Footer />
                    </ThemeProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
