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

export async function PATCH(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const { userId, role } = await req.json();

        if (!userId || !role) {
            return NextResponse.json({ message: "필수 데이터가 누락되었습니다." }, { status: 400 });
        }

        if (!["USER", "ADMIN"].includes(role)) {
            return NextResponse.json({ message: "유효하지 않은 권한입니다." }, { status: 400 });
        }

        // 본인 권한 변경 방지
        if (userId === admin.id) {
            return NextResponse.json({ message: "자신의 권한은 변경할 수 없습니다." }, { status: 400 });
        }

        await pool.query("UPDATE users SET role = ? WHERE id = ?", [role, userId]);
        return NextResponse.json({ message: "권한이 변경되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
