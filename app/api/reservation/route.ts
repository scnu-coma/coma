import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

async function verifyUser() {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return null;

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const [rows] = await pool.query(
            "SELECT id, role, status FROM users WHERE id = ? AND status = 'APPROVED'", 
            [decoded.id]
        );
        const user = (rows as any[])[0];
        return user || null;
    } catch {
        return null;
    }
}

// 부실 예약 조회 (승인된 목록만)
export async function GET() {
    try {
        const [reservations] = await pool.query(`
            SELECT r.reservation_date, r.start_time, r.end_time, u.name as user_name, r.purpose
            FROM reservations r
            JOIN users u ON r.user_id = u.id
            WHERE r.status = 'APPROVED'
            ORDER BY r.reservation_date ASC, r.start_time ASC
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

import { reservationSchema } from "@/lib/validations";

// ... verifyUser function ...

// 부실 예약 신청
export async function POST(req: Request) {
    const user = await verifyUser();
    if (!user) {
        return NextResponse.json({ message: "로그인이 필요합니다." }, { status: 401 });
    }

    try {
        const [settings] = await pool.query("SELECT is_open FROM reservation_settings WHERE id = 1");
        if (!(settings as any[])[0]?.is_open) {
            return NextResponse.json({ message: "현재 부실 예약 신청 기간이 아닙니다." }, { status: 403 });
        }

        const body = await req.json();
        const validation = reservationSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ 
                message: "입력값이 올바르지 않습니다.",
                errors: validation.error.flatten().fieldErrors 
            }, { status: 400 });
        }

        const { date, startTime, endTime, purpose } = validation.data;

        await pool.query(
            "INSERT INTO reservations (user_id, reservation_date, start_time, end_time, purpose) VALUES (?, ?, ?, ?, ?)",
            [user.id, date, startTime, endTime, purpose]
        );

        return NextResponse.json({ message: "예약 신청이 완료되었습니다. 관리자 승인 후 확정됩니다." }, { status: 201 });
    } catch (error) {
        console.error("Reservation Error:", error);
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
