import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

async function verifyAdmin() {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return false;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        return decoded.role === "ADMIN";
    } catch {
        return false;
    }
}

// 혜택 조회 (공개)
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM advantages ORDER BY id DESC");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

// 혜택 추가 (관리자)
export async function POST(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "권한 없음" }, { status: 403 });
    try {
        const body = await req.json();
        const { name, email, password, tag } = body;
        await pool.query("INSERT INTO advantages (name, email, password, tag) VALUES (?, ?, ?, ?)", [name, email, password, tag]);
        return NextResponse.json({ message: "혜택이 추가되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "추가 오류" }, { status: 500 });
    }
}

// 혜택 삭제 (관리자)
export async function DELETE(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "권한 없음" }, { status: 403 });
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await pool.query("DELETE FROM advantages WHERE id = ?", [id]);
        return NextResponse.json({ message: "삭제되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "삭제 오류" }, { status: 500 });
    }
}
