"use client";
import { ArrowUpDown, BadgeXIcon, KeyIcon, LockIcon, MoreHorizontal, PencilLineIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { Member } from "./data-table";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { toast } from "sonner";

export const columns: ColumnDef<Member>[] = [
    {
        // role이 admin(최고관리자)인 회원은 체크박스로 선택할 수 없다.
        id: "select",
        header: ({ table }) => {
            const allSelectableRows = table.getRowModel().rows.filter((row) => row.getValue("user_role") !== "admin");
            const allSelected = allSelectableRows.every((row) => row.getIsSelected());
            const someSelected = allSelectableRows.some((row) => row.getIsSelected());
            return (
                <Checkbox
                    checked={allSelected || (someSelected && "indeterminate")}
                    onCheckedChange={(value) => {
                        allSelectableRows.forEach((row) => row.toggleSelected(!!value));
                    }}
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row }) => {
            if (row.getValue("user_role") !== "admin")
                return (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                );
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "user_role",
        header: () => "권한",
        cell: ({ row }) => {
            const roleValue = row.getValue("user_role");
            let roleName = "";
            if (roleValue === "admin") {
                roleName = "최고관리자";
            } else if (roleValue === "manager") {
                roleName = "간부진";
            } else if (roleValue === "member") {
                roleName = "코마 부원";
            } else if (roleValue === "standby") {
                roleName = "인증 대기";
            } else if (roleValue === "guest") {
                roleName = "미인증";
            } else {
                roleName = "정보 없음";
            }
            return <div>{roleName}</div>;
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
            if (row.getValue("user_role") == "admin") {
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
                            <DropdownMenuItem disabled>
                                <LockIcon /> 선택할 수 없습니다.
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            } else
                return (
                    <Dialog>
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
                                <DropdownMenuItem onClick={() => toast.error("아직 구현되지 않은 기능입니다.")}>
                                    <PencilLineIcon /> 정보 수정
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <KeyIcon className="mr-2.5 text-neutral-600 dark:text-neutral-400" size={14} />
                                        권한 변경
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem
                                                disabled={row.getValue("user_role") === "manager" ? true : false}
                                                onClick={() => toast.error("아직 구현되지 않은 기능입니다.")}
                                            >
                                                간부진
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                disabled={row.getValue("user_role") === "member" ? true : false}
                                                onClick={() => toast.error("아직 구현되지 않은 기능입니다.")}
                                            >
                                                코마 부원
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                disabled={row.getValue("user_role") === "guest" ? true : false}
                                                onClick={() => toast.error("아직 구현되지 않은 기능입니다.")}
                                            >
                                                미인증
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuItem asChild>
                                    <DialogTrigger className="flex items-center w-full cursor-pointer">
                                        <BadgeXIcon /> 회원 삭제
                                    </DialogTrigger>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>회원 삭제</DialogTitle>
                            </DialogHeader>
                            <span>
                                <strong>
                                    {row.getValue("major")} {row.getValue("name")}
                                </strong>{" "}
                                회원을 정말로 삭제하시겠습니까?
                            </span>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="secondary">취소</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        variant="destructive"
                                        onClick={() => toast.error("아직 구현되지 않은 기능입니다.")}
                                    >
                                        삭제
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                );
        },
    },
];
