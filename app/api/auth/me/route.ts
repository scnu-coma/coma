import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import pool from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// 현재 접속 유저 정보 확인
export async function GET() {
    try {
        const token = (await cookies()).get("auth_token")?.value;
        if (!token) {
            return NextResponse.json({ message: "인증되지 않은 사용자입니다." }, { status: 401 });
        }

        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        const [rows] = await pool.query("SELECT id, email, name, role, status, student_id, department FROM users WHERE id = ?", [decoded.id]);
        const user = (rows as any[])[0];

        if (!user) {
            return NextResponse.json({ message: "존재하지 않는 사용자입니다." }, { status: 404 });
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ message: "세션이 만료되었습니다." }, { status: 401 });
    }
}
