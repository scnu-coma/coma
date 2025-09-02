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
                <div>
                    <span className={`text-xs text-muted-foreground mr-4 ml-auto`}>
                        {row.index + 1 < 10 ? `0${row.index + 1}` : row.index + 1}
                    </span>
                    <PostTag>{row.original.tag}</PostTag>
                    <span className="col-start-4 col-span-7 ml-4 break-all text-base">{row.original.title}</span>
                </div>
            );
        },
    },
    {
        accessorKey: "author",
        cell: ({ row }) => {
            return (
                <div className="lg:ml-auto">
                    <span className="col-start-11 text-sm lg:mr-36 mr-4 lg:ml-0 ml-8">{row.original.author}</span>
                    <span className="col-start-12 text-xs text-muted-foreground mr-4">
                        {parseDate(row.original.date)}
                    </span>
                </div>
            );
        },
    },
];
