"use client";
import Sidebar from "@/components/admin/sidebar";
import { supabase } from "@/lib/supabaseClient";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [pageLoading, setPageLoading] = useState(true);

    // 부원 확인 로직
    const initUser = async () => {
        const session = await supabase.auth.getSession();
        const { data } = await supabase.from("users").select("*").eq("user_id", session.data.session?.user.id).single();
        if (session && data) {
            // 로그인 된 상태에서만 role 정보를 가져올 수 있다.
            const role = data.user_role;
            // 최고관리자, 간부진 등급일 경우 페이지 정상 표시
            if (role === "manager") {
                setPageLoading(false);
                toast.success("간부진 인증되었습니다.");
            } else if (role === "admin") {
                setPageLoading(false);
                toast.success("관리자 인증되었습니다.");
            } else notFound();
        } else {
            notFound();
        }
    };

    useEffect(() => {
        initUser();
    }, []);
    // 로딩 중 페이지
    if (pageLoading)
        return (
            <>
                <div className="flex items-center justify-center h-svh -mt-[56px] font-[system-ui]">
                    <h1 className="inline-block mr-5 m-0 pr-[23px] p-0 text-2xl font-medium align-top leading-[49px] border-r border-white/30">
                        404
                    </h1>
                    <h2 className="text-sm font-normal leading-[49px] m-0">This page could not be found.</h2>
                </div>
            </>
        );
    // 인증 완료 페이지
    else if (!pageLoading) return <Sidebar>{children}</Sidebar>;
}
