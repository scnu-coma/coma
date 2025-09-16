// 코마 혜택 페이지
import Title from "@/components/custom/title";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { advantages } from "@/data/advantages";

export default function Page() {
    // 부원 확인 로직
    const isMember = false;
    // 최고관리자, 간부진, 부원 등급이 아닐 경우 (인증 대기, 비로그인일 경우)
    if (!isMember) return <>부원 인증 후 이용하실 수 있습니다.</>;
    // 최고관리자, 간부진, 부원 등급일 경우 페이지 정상 표시
    else
        return (
            <>
                <Title title="코마 혜택" description="코마 부원에게만 제공되는 특별한 혜택" />
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
