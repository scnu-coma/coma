import { NextResponse } from "next/server";
import pool from "@/lib/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

export async function GET() {
    const token = (await cookies()).get("auth_token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        if (decoded.role !== "ADMIN") return NextResponse.json({ message: "Forbidden" }, { status: 403 });

        // 통계 쿼리
        const [totalRows] = await pool.query("SELECT COUNT(*) as count FROM users");
        const [pendingRows] = await pool.query("SELECT COUNT(*) as count FROM users WHERE status = 'PENDING'");

        return NextResponse.json({
            totalMembers: (totalRows as any)[0].count,
            pendingMembers: (pendingRows as any)[0].count,
        });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
