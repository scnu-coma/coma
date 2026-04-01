"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setColumnSelection] = React.useState({});
    const router = useRouter();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setColumnSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full space-y-8">
            {/* 검색창 */}
            <div className="flex items-center">
                <Input
                    placeholder="공지사항 제목으로 검색..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                    className="max-w-sm h-11 rounded-xl border-2 focus-visible:ring-primary/20 transition-all"
                />
            </div>

            {/* 테이블 (테두리 제거, 깔끔한 리스트 형태) */}
            <div className="w-full">
                <Table>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="cursor-pointer group hover:bg-muted/30 transition-all border-b-2 last:border-0"
                                    onClick={() => router.push(`/notice/${(row.original as any).id}`)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-6 px-4 group-hover:pl-6 transition-all duration-300">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-48 text-center text-muted-foreground font-medium">
                                    등록된 공지사항이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* 페이지네이션 */}
            <Pagination className="justify-center">
                <PaginationContent className="gap-2">
                    <PaginationItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                            className="rounded-xl font-bold gap-1 hover:bg-muted"
                        >
                            <PaginationPrevious className="p-0 h-auto w-auto" />
                        </Button>
                    </PaginationItem>
                    
                    <div className="flex items-center gap-2 px-4">
                        <span className="text-sm font-black text-primary">
                            {table.getState().pagination.pageIndex + 1}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">/</span>
                        <span className="text-sm font-medium text-muted-foreground">
                            {table.getPageCount()}
                        </span>
                    </div>

                    <PaginationItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                            className="rounded-xl font-bold gap-1 hover:bg-muted"
                        >
                            <PaginationNext className="p-0 h-auto w-auto" />
                        </Button>
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
