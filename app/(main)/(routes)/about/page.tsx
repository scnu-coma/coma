import Title from "@/components/custom/title";
import bg from "@/public/images/nidhin-mohan-p_wC_T2HUPk-unsplash.webp";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Code, Calendar, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
    const activities = [
        {
            title: "정기 스터디",
            description: "매 학기 웹, 앱, 알고리즘 등 관심 분야별로 소규모 스터디를 운영하여 함께 성장합니다.",
            icon: <Code className="w-8 h-8 text-primary" />,
        },
        {
            title: "팀 프로젝트",
            description: "기획부터 개발, 배포까지 실제 서비스를 만들어보는 실무 중심의 프로젝트를 진행합니다.",
            icon: <Users className="w-8 h-8 text-primary" />,
        },
        {
            title: "네트워킹",
            description: "현업 선배님들과의 멘토링, 타 동아리와의 교류를 통해 넓은 시야를 갖습니다.",
            icon: <Heart className="w-8 h-8 text-primary" />,
        },
        {
            title: "해커톤 & 공모전",
            description: "교내외 다양한 대회에 참여하여 실력을 검증하고 팀워크를 다집니다.",
            icon: <Calendar className="w-8 h-8 text-primary" />,
        },
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

                <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
                    {activities.map((act, idx) => (
                        <div key={idx} className="flex gap-6 p-8 rounded-[2rem] bg-card border border-primary/10 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group cursor-default">
                            <div className="p-4 bg-primary/5 rounded-2xl text-primary h-fit group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300 shrink-0">
                                {act.icon}
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">{act.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {act.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 연혁 섹션 */}
            <section className="space-y-12">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">우리의 발자취</h2>
                    <p className="text-muted-foreground mt-2">COMA가 걸어온 길입니다.</p>
                </div>
                
                <div className="max-w-3xl mx-auto space-y-8">
                    <div className="flex gap-6 items-start relative pb-8 after:content-[''] after:absolute after:left-[11px] after:top-[30px] after:bottom-0 after:w-[2px] after:bg-muted">
                        <div className="w-6 h-6 rounded-full bg-primary shrink-0 z-10 mt-1" />
                        <div>
                            <div className="text-sm font-bold text-primary">2025 - 현재</div>
                            <h3 className="text-lg font-bold">디지털 혁신 및 프로젝트 중심 활동</h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                실제 서비스 개발 및 배포를 목표로 하는 다양한 프로젝트를 진행하고 있습니다. 
                                자체 웹사이트 개발 등 실무 중심의 기술 스택을 공부합니다.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-6 items-start relative pb-8 after:content-[''] after:absolute after:left-[11px] after:top-[30px] after:bottom-0 after:w-[2px] after:bg-muted">
                        <div className="w-6 h-6 rounded-full bg-muted-foreground/30 shrink-0 z-10 mt-1" />
                        <div>
                            {/*<div className="text-sm font-bold text-muted-foreground">2025</div>*/}
                            <h3 className="text-lg font-bold">스터디 문화 정착 및 대외 활동 확장</h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                알고리즘, 웹 개발, 모바일 앱 등 분야별 소규모 스터디를 활성화하여 
                                부원들의 기초 역량을 강화하였습니다.
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start">
                        <div className="w-6 h-6 rounded-full bg-muted-foreground/30 shrink-0 z-10 mt-1" />
                        <div>
                            <div className="text-sm font-bold text-muted-foreground">Established</div>
                            <h3 className="text-lg font-bold">COMA 동아리 창설</h3>
                            <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                                국립순천대학교 컴퓨터공학과를 중심으로 코딩에 열정을 가진 
                                학생들이 모여 'Coding Master'의 약자인 COMA를 창설하였습니다.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 오시는 길 섹션 */}
            <section className="space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold">오시는 길</h2>
                    <p className="text-muted-foreground mt-2">동아리방에서 만나요!</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="bg-muted aspect-video rounded-3xl flex items-center justify-center overflow-hidden border">
                        {/* 실제 지도를 넣을 수 있는 자리 (iframe 등) */}
                        <div className="text-center p-8">
                            <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                            <p className="font-bold">국립순천대학교 학생회관 (E1)</p>
                            <p className="text-sm text-muted-foreground mt-1">4층 403호 (코마)</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">운영 시간</h3>
                            <p className="text-muted-foreground">학기 중: 평일 09:00 - 21:00</p>
                            <p className="text-muted-foreground">방학 중: 유동적 운영</p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">연락처</h3>
                            <p className="text-muted-foreground">이메일: admin@scnucoma.com</p>
                            <p className="text-muted-foreground">인스타그램: @scnu_coma</p>
                        </div>
                        <Button className="w-full h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
                            지금 바로 참여하기
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
