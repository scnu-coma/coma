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
            url: "/admin/members",
            items: [
                {
                    title: "회원정보",
                    url: "/admin/members",
                    isActive: true,
                },
            ],
        },
        {
            title: "폼 관리",
            url: "/admin/recruitment",
            items: [
                {
                    title: "부원 모집",
                    url: "/admin/recruitment",
                    isActive: false,
                },
                {
                    title: "스터디그룹 & 모각코",
                    url: "/admin/study",
                    isActive: false,
                },
            ],
        },
        {
            title: "홈페이지 관리",
            url: "/admin/hero",
            items: [
                {
                    title: "메인 배너",
                    url: "/admin/hero",
                    isActive: false,
                },
                {
                    title: "학사일정",
                    url: "/admin/schedule",
                    isActive: false,
                },
                {
                    title: "코마 혜택",
                    url: "/admin/advantage",
                    isActive: false,
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <span className="font-medium ml-2 mt-4 text-sm">관리자 페이지</span>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {data.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link href={item.url} className="font-medium">
                                        {item.title}
                                    </Link>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <SidebarMenuSub>
                                        {item.items.map((item) => (
                                            <SidebarMenuSubItem key={item.title}>
                                                <SidebarMenuSubButton asChild isActive={item.isActive}>
                                                    <Link href={item.url}>{item.title}</Link>
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
