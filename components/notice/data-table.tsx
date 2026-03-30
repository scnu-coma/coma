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
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const router = useRouter();
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState({
        pageIndex: 0, //initial page index
        pageSize: 10, //default page size
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // 자동으로 10개 항목마다 페이지네이션을 추가함
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div className="md:my-16 my-12">
            {/* 필터링 */}
            <Input
                placeholder={`🔍 제목으로 검색`}
                value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("title")?.setFilterValue(event.target.value)}
                className="lg:max-w-sm w-full ml-auto mb-4 not-lg:text-sm"
            />
            <Table>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table
                            .getRowModel()
                            .rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="w-full grid lg:grid-rows-1 grid-rows-2 lg:grid-cols-2 grid-cols-1 justify-between not-lg: py-4 cursor-pointer hover:bg-muted/50"
                                    onClick={() => router.push(`/notice/${(row.original as any).id}`)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="lg:h-24 h-10 flex items-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                            .reverse()
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                결과가 없습니다.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* 페이지네이션 */}
            <Pagination className="mb-16">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            size="sm"
                            onClick={() => table.previousPage()}
                            aria-disabled={!table.getCanPreviousPage()}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink>{table.getState().pagination.pageIndex + 1}</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext
                            size="sm"
                            onClick={() => table.nextPage()}
                            aria-disabled={!table.getCanNextPage()}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
