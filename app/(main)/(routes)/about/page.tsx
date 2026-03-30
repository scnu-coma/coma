import Title from "@/components/custom/title";
import bg from "@/public/images/nidhin-mohan-p_wC_T2HUPk-unsplash.webp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Code, Calendar, Heart } from "lucide-react";

export default function AboutPage() {
    const activities = [
        // ... (unchanged)
    ];

    return (
        <div className="space-y-16 pb-20 animate-in fade-in duration-1000 ease-in-out">
            <Title 
                image={bg} 
                title="동아리 소개" 
                description="코딩으로 꿈을 그리는 사람들의 모임, COMA" 
            />

            {/* 소개 섹션 */}
            <section className="space-y-8">
                <div className="text-center space-y-4">
                    <h2 className="text-3xl font-bold">누구나 마스터가 될 수 있습니다</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        COMA(Coding Master)는 국립순천대학교의 IT 코딩 동아리입니다. 
                        코딩을 처음 접하는 초보자부터 심화 프로젝트를 원하는 숙련자까지, 
                        함께 공부하고 성장하는 환경을 제공합니다.
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {activities.map((act, idx) => (
                        <Card key={idx} className="hover:shadow-lg transition-shadow border-primary/10">
                            <CardHeader className="items-center pb-2">
                                <div className="p-3 bg-muted rounded-2xl mb-4">{act.icon}</div>
                                <CardTitle className="text-xl font-bold">{act.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-center text-muted-foreground">
                                {act.description}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 연혁 또는 비전 섹션 */}
            <section className="bg-muted/30 rounded-3xl p-8 md:p-16 text-center space-y-6">
                <h2 className="text-3xl font-bold">우리의 목표</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary">LEARN</div>
                        <p className="font-semibold">함께 배우는 즐거움</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary">SHARE</div>
                        <p className="font-semibold">기술을 나누는 문화</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-4xl font-black text-primary">GROW</div>
                        <p className="font-semibold">함께 성장하는 부원들</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
