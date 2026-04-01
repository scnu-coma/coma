"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Post } from "@/types/post";
import PostTag from "../posts/post-tag";
import { parseDate } from "@/lib/parse-date";

export const columns: ColumnDef<Post>[] = [
    {
        accessorKey: "title",
        cell: ({ row }) => {
            return (
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-muted-foreground w-6 shrink-0">
                        {(row.index + 1).toString().padStart(2, '0')}
                    </span>
                    <PostTag>{row.original.tag}</PostTag>
                    <span className="font-semibold truncate max-w-[200px] sm:max-w-md">
                        {row.original.title}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 justify-end">
                    <span className="text-sm font-medium text-muted-foreground">
                        {row.original.author}
                    </span>
                    <span className="text-xs text-muted-foreground/60 whitespace-nowrap">
                        {parseDate(row.original.date)}
                    </span>
                </div>
            );
        },
    },
];
