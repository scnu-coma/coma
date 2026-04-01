import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

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

// 설정 조회 (공개)
export async function GET() {
    try {
        const [rows] = await pool.query("SELECT * FROM recruitment_settings WHERE id = 1");
        const settings = (rows as any[])[0];
        
        // 현재 시간 기준으로 is_open 자동 계산 로직
        const now = new Date();
        const start = new Date(settings.start_date);
        const end = new Date(settings.end_date);
        
        // 관리자가 명시적으로 켰거나, 기간 내에 있는 경우 활성화
        const isActuallyOpen = !!settings.is_open || (now >= start && now <= end);

        return NextResponse.json({ 
            ...settings, 
            is_actually_open: isActuallyOpen,
            google_form_url: settings.google_form_url || "" 
        });
    } catch (error) {
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

// 설정 수정 (관리자)
export async function PATCH(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) return NextResponse.json({ message: "권한 없음" }, { status: 403 });
    try {
        const body = await req.json();
        const { is_open, start_date, end_date, term, year, google_form_url } = body;
        
        await pool.query(
            "UPDATE recruitment_settings SET is_open = ?, start_date = ?, end_date = ?, term = ?, year = ?, google_form_url = ? WHERE id = 1",
            [is_open, start_date, end_date, term, year, google_form_url]
        );
        
        return NextResponse.json({ message: "설정이 저장되었습니다." });
    } catch (error) {
        return NextResponse.json({ message: "저장 오류" }, { status: 500 });
    }
}
