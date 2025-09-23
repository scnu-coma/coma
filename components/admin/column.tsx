"use client";
import { ArrowUpDown, BadgeXIcon, LockIcon, MoreHorizontal, PencilLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./data-table";

export const columns: ColumnDef<Member>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "user_role",
        header: () => "권한",
        cell: ({ row }) => {
            return <div>{row.getValue("user_role")}</div>;
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    이름
                    <ArrowUpDown />
                </Button>
            );
        },
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "student_id",
        header: "학번",
        cell: ({ row }) => <div>{row.getValue("student_id")}</div>,
    },
    {
        accessorKey: "major",
        header: "학과",
        cell: ({ row }) => <div>{row.getValue("major")}</div>,
    },
    {
        accessorKey: "grade",
        header: "학년",
        cell: ({ row }) => <div>{row.getValue("grade")}</div>,
    },
    {
        accessorKey: "phone",
        header: "전화번호",
        cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">메뉴 열기</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{row.getValue("name")}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <PencilLineIcon /> 정보 수정
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LockIcon /> 권한 변경
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <BadgeXIcon /> 회원 삭제
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
