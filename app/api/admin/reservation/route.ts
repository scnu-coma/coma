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

// 전체 예약 목록 및 설정 조회 (관리자용)
export async function GET() {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const [reservations] = await pool.query(`
            SELECT r.*, u.name as user_name, u.student_id, u.department
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            ORDER BY r.reservation_date DESC, r.start_time DESC
        `);
        
        const [settings] = await pool.query("SELECT is_open FROM reservation_settings WHERE id = 1");
        
        return NextResponse.json({
            reservations,
            is_open: (settings as any[])[0]?.is_open
        });
    } catch (error) {
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

// 예약 설정 변경 및 승인/거절 처리
export async function PATCH(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const { action, isOpen, reservationId, status } = await req.json();

        if (action === "toggle") {
            await pool.query("UPDATE reservation_settings SET is_open = ? WHERE id = 1", [isOpen]);
            return NextResponse.json({ message: `예약 시스템이 ${isOpen ? '활성화' : '비활성화'}되었습니다.` });
        }

        if (action === "approve") {
            await pool.query("UPDATE reservations SET status = ? WHERE id = ?", [status, reservationId]);
            return NextResponse.json({ message: "예약 상태가 변경되었습니다." });
        }

        return NextResponse.json({ message: "잘못된 요청입니다." }, { status: 400 });
    } catch (error) {
        return NextResponse.json({ message: "업데이트 오류" }, { status: 500 });
    }
}
