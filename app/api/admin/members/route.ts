import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { adminActionSchema } from "@/lib/validations";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

async function verifyAdmin() {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        
        // 교체 검증: DB에서 실제 role과 status 확인
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

// 승인/거절 처리
export async function PATCH(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const body = await req.json();
        const validation = adminActionSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json({ message: "유효하지 않은 요청입니다." }, { status: 400 });
        }

        const { userId, status } = validation.data;

        // 본인 계정 상태 변경 방지 보안 로직
        if (userId === admin.id) {
            return NextResponse.json({ message: "자신의 상태는 변경할 수 없습니다." }, { status: 400 });
        }

        await pool.query("UPDATE users SET status = ? WHERE id = ?", [status, userId]);
        return NextResponse.json({ message: "성공적으로 업데이트되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}

// 승인 대기 목록 조회
export async function GET() {
    if (!(await verifyAdmin())) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const [rows] = await pool.query(
            "SELECT id, email, name, student_id, department, status, created_at FROM users WHERE status = 'PENDING' ORDER BY created_at DESC"
        );
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}
