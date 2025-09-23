// 코마 혜택 페이지
"use client";
import Title from "@/components/custom/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Advantage } from "@/data/advantages";
// import { advantages } from "@/data/advantages";
import { supabase } from "@/lib/supabaseClient";
import { InfoIcon, MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const [pageLoading, setPageLoading] = useState(true);
    const [advantages, setAdvantages] = useState<Advantage[]>([]);
    const router = useRouter();

    // 부원 확인 로직
    // const isMember = true;

    const initUser = async () => {
        const session = await supabase.auth.getSession();
        const { data } = await supabase.from("users").select("*").eq("user_id", session.data.session?.user.id).single();
        if (!session.data.session?.user) {
            toast.warning("로그인이 필요합니다.");
            router.push("/");
        } else if (session && data) {
            // 로그인 된 상태에서만 role 정보를 가져올 수 있다.
            const role = data.user_role;
            // 비로그인 또는 추가정보가 등록되지 않은 계정의 경우 그냥 메인페이지로 돌려보냄
            if (role === "guest" || null) router.push("/register");
            // 추가정보 등록이 완료되었으나 정식 부원으로 승인되지 않았을 경우 경고창을 띄우고 메인페이지로 돌려보냄
            else if (role === "standby") {
                toast.warning("관리자 승인 후 서비스 이용이 가능합니다.");
                router.push("/");
                // 최고관리자, 간부진, 부원 등급일 경우 페이지 정상 표시
            } else if (role === "member" || "manager" || "admin") {
                setPageLoading(false);
            }
        } else {
            router.push("/");
        }
    };

    const getAdvantages = async () => {
        const { data } = await supabase.from("advantage").select("*");
        if (data) {
            setAdvantages(data);
        }
        console.log(advantages);
    };
    useEffect(() => {
        initUser();
        getAdvantages();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // 페이지 로딩 중
    if (pageLoading) return <></>;
    // 페이지 로딩 완료
    else
        return (
            <>
                <Title title="코마 혜택" description="코마 부원에게만 제공되는 특별한 혜택" />
                <p className="mb-1.5 flex items-center gap-1.5 text-destructive text-sm">
                    <InfoIcon size={16} className="mt-0.5" />
                    2차 인증 발생 시 <strong>회장 김연지</strong>에게 연락 주세요.
                </p>
                <p className="mb-1.5 flex items-center gap-1.5 text-sm">
                    <InfoIcon size={16} className="mt-0.5" />
                    계정 이용 시 <strong>Google로 계속하기</strong>를 클릭해서 로그인하세요.
                </p>
                <p className="mb-4 text-sm">
                    <InfoIcon size={16} className="inline mr-1.5" />
                    ChatGPT에서 채팅방 이름을{" "}
                    <strong>
                        채팅 → <MoreHorizontalIcon size={14} className="inline mx-1.5" /> → 이름 수정하기
                    </strong>
                    를 통해 자신의 본명으로 수정하세요.
                    <br />
                    <span className="ml-5.5">수정되지 않은 채팅방은 불시에 일괄 삭제됩니다.</span>
                </p>
                <ul className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2">
                    {advantages.map((advantage, index) => (
                        <li key={index}>
                            <Card className="gap-0.5 text-sm">
                                <CardHeader className="flex items-center">
                                    <h3 className="font-semibold text-base">{advantage.name}</h3>
                                    <span className="text-neutral-500">{advantage.tag}</span>
                                </CardHeader>
                                <CardContent className="[&_p]:flex [&_p]:items-center [&_p]:justify-between">
                                    <p>
                                        {/* 이메일 */}
                                        {advantage.email}
                                    </p>
                                    <p>
                                        {/* 비밀번호 */}
                                        {advantage.password}
                                    </p>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                </ul>
            </>
        );
}
