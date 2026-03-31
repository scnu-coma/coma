import * as React from "react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
    navMain: [
        {
            title: "회원 관리",
            url: "members",
            items: [
                {
                    title: "회원정보",
                    url: "members",
                    isActive: true,
                },
            ],
        },
        {
            title: "커뮤니티 관리",
            url: "notice",
            items: [
                {
                    title: "공지사항",
                    url: "notice",
                    isActive: false,
                },
            ],
        },
        {
            title: "시설 관리",
            url: "reservation",
            items: [
                {
                    title: "동아리방 예약",
                    url: "reservation",
                    isActive: false,
                },
            ],
        },
        {
            title: "모집 관리",
            url: "recruitment",
            items: [
                {
                    title: "모집 통합 관리",
                    url: "recruitment",
                    isActive: false,
                },
            ],
        },
        {
            title: "스터디 관리",
            url: "studygroups",
            items: [
                {
                    title: "스터디그룹 관리",
                    url: "studygroups",
                    isActive: false,
                },
            ],
        },
        {
            title: "홈페이지 관리",
            url: "events",
            items: [
                {
                    title: "주요 일정",
                    url: "events",
                    isActive: false,
                },
                {
                    title: "코마 혜택",
                    url: "advantage",
                    isActive: false,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props} className="pt-22">
            <SidebarHeader>
                <span className="font-medium mt-4 text-sm">관리자 페이지</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={`/admin/${item.url}`} className="font-medium">
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild isActive={item.isActive}>
                                                    <Link href={`/admin/${item.url}`}>{item.title}</Link>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
