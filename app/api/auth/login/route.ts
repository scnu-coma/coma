import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "@/lib/db";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// 로그인
export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        const user = (rows as any[])[0];

        if (!user) {
            return NextResponse.json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." }, { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." }, { status: 401 });
        }

        // 승인 상태 확인
        if (user.status !== "APPROVED") {
            const message = user.status === "PENDING" ? "아직 승인 대기 중입니다." : "가입 거절된 계정입니다.";
            return NextResponse.json({ message }, { status: 403 });
        }

        // JWT 발급
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name, role: user.role },
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 쿠키에 토큰 저장
        const response = NextResponse.json({ 
            user: { id: user.id, email: user.email, name: user.name, role: user.role } 
        });
        
        // Next.js 13+ App Router 에서 쿠키 설정
        (await cookies()).set("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7일
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ message: "서버 오류가 발생했습니다." }, { status: 500 });
    }
}
