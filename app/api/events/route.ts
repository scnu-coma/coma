import { NextResponse } from "next/server";
import pool from "@/lib/db";

// 누구나 볼 수 있는 행사 목록 조회
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT id, title, from_date as `from`, to_date as `to` FROM events ORDER BY from_date ASC");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "행사 조회 오류" }, { status: 500 });
    }
}
