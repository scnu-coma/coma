import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";
import { registerSchema } from "@/lib/validations";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        
        // 1. 파라미터 검증 (XSS 방지 및 타입 체크)
        const validation = registerSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ 
                message: "입력값이 올바르지 않습니다.", 
                errors: validation.error.flatten().fieldErrors 
            }, { status: 400 });
        }

        const { email, password, name, student_id, department } = validation.data;

        // 2. SQL Injection 방지 (Parameterized Query)
        const [existing] = await pool.query(
            "SELECT id FROM users WHERE email = ? OR student_id = ?", 
            [email, student_id]
        );
        
        if ((existing as any[]).length > 0) {
            return NextResponse.json({ message: "이미 가입된 이메일 또는 학번입니다." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            "INSERT INTO users (email, password, name, student_id, department, status) VALUES (?, ?, ?, ?, ?, 'PENDING')",
            [email, hashedPassword, name, student_id, department]
        );

        return NextResponse.json({ message: "회원가입 신청이 완료되었습니다." }, { status: 201 });
    } catch (error) {
        console.error("Secure Register Error:", error);
        return NextResponse.json({ message: "서버 내부 오류가 발생했습니다." }, { status: 500 });
    }
}
