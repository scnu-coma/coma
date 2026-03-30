import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

async function verifyAdmin() {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const [rows] = await pool.query(
            "SELECT id, role, status FROM users WHERE id = ? AND role = 'ADMIN' AND status = 'APPROVED'", 
            [decoded.id]
        );
        const admin = (rows as any[])[0];
        return admin || null;
    } catch {
        return null;
    }
}

export async function GET() {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const [rows] = await pool.query(
            "SELECT * FROM study_groups ORDER BY created_at DESC"
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const { title, description, leader_name, max_members } = await req.json();

        if (!title || !leader_name) {
            return NextResponse.json({ message: "제목과 리더 이름은 필수입니다." }, { status: 400 });
        }

        await pool.query(
            "INSERT INTO study_groups (title, description, leader_name, max_members) VALUES (?, ?, ?, ?)",
            [title, description, leader_name, max_members || 10]
        );

        return NextResponse.json({ message: "스터디 그룹이 생성되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ message: "필수 데이터가 누락되었습니다." }, { status: 400 });
        }

        await pool.query("UPDATE study_groups SET status = ? WHERE id = ?", [status, id]);
        return NextResponse.json({ message: "성공적으로 업데이트되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ message: "ID가 필요합니다." }, { status: 400 });
        }

        await pool.query("DELETE FROM study_groups WHERE id = ?", [id]);
        return NextResponse.json({ message: "삭제되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
