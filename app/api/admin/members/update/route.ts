import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

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
        const { userId, email, name, student_id, department, password, role, status } = await req.json();

        if (!userId) {
            return NextResponse.json({ message: "사용자 ID가 필요합니다." }, { status: 400 });
        }

        // 업데이트할 필드 동적 생성
        let query = "UPDATE users SET email = ?, name = ?, student_id = ?, department = ?, role = ?, status = ?";
        let params = [email, name, student_id, department, role, status];

        // 비밀번호가 입력된 경우만 해싱해서 추가
        if (password && password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(password, 10);
            query += ", password = ?";
            params.push(hashedPassword);
        }

        query += " WHERE id = ?";
        params.push(userId);

        await pool.query(query, params);
        
        return NextResponse.json({ message: "회원 정보가 성공적으로 수정되었습니다." });
    } catch (error) {
        console.error("Admin update error:", error);
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
