import Title from "@/components/custom/title";
import bg from "@/public/images/nidhin-mohan-p_wC_T2HUPk-unsplash.webp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Code, Calendar, Heart } from "lucide-react";

export default function AboutPage() {
    const activities = [
        {
            title: "알고리즘 및 PS",
            description: "매주 스터디를 통해 알고리즘 문제 해결 능력을 기르고 대회 참여를 준비합니다.",
            icon: <Code className="w-10 h-10 text-blue-500" />
        },
        {
            title: "프로젝트 및 협업",
            description: "실제 웹, 앱 서비스를 기획하고 개발하며 팀워크와 실무 기술을 익힙니다.",
            icon: <Users className="w-10 h-10 text-green-500" />
        },
        {
            title: "코딩 세미나",
            description: "최신 기술 동향이나 개발 경험을 공유하며 서로의 성장을 돕습니다.",
            icon: <Calendar className="w-10 h-10 text-purple-500" />
        },
        {
            title: "친목 도모",
            description: "코딩뿐만 아니라 다양한 활동을 통해 부원들 간의 유대를 강화합니다.",
            icon: <Heart className="w-10 h-10 text-red-500" />
        }
    ];

    return (
        <div className="space-y-16 pb-20">
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
