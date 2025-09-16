// 코마 혜택 페이지
import { TypographyH2 } from "@/components/typography/typography";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { advantages } from "@/data/advantages";

export default function Page() {
    // 부원 확인 로직
    const isMember = false;
    // 부원이라면 페이지 정상 표시
    if (isMember)
        return (
            <>
                <div className="relative flex w-full justify-center md:h-42 h-24 rounded-3xl overflow-hidden">
                    <div className="absolute self-center text-center">
                        <TypographyH2 className="not-md:text-xl not-md:pb-1!">코마 혜택</TypographyH2>
                        <p className="md:text-sm text-xs md:mt-2 mt-1">코마 부원에게만 제공되는 특별한 혜택</p>
                    </div>
                </div>
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
    // 부원이 아니라면 페이지 접근 제한
    else return <>로그인 후 이용하실 수 있습니다.</>;
}
