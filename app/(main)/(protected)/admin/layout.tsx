import Sidebar from "@/components/admin/sidebar";
import { notFound } from "next/navigation";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // 관리자 여부 확인 로직
    const isAdmin = false;
    // 관리자가 아니라면 원래 페이지 대신 404 에러 페이지를 반환합니다.
    if (!isAdmin) {
        notFound();
    }
    return <Sidebar>{children}</Sidebar>;
}
