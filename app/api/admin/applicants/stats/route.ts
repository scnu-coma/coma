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
        return (rows as any[])[0] || null;
    } catch {
        return null;
    }
}

export async function GET() {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        const [total] = await pool.query("SELECT COUNT(*) as count FROM applicants");
        const [byStatus] = await pool.query("SELECT status, COUNT(*) as count FROM applicants GROUP BY status");
        const [byDept] = await pool.query("SELECT department, COUNT(*) as count FROM applicants GROUP BY department ORDER BY count DESC LIMIT 5");
        const [allStudyGroups] = await pool.query("SELECT study_groups FROM applicants");

        const groupCounts: { [key: string]: number } = {};
        (allStudyGroups as any[]).forEach(row => {
            if (row.study_groups) {
                row.study_groups.split(',').forEach((g: string) => {
                    groupCounts[g] = (groupCounts[g] || 0) + 1;
                });
            }
        });

        return NextResponse.json({
            total: (total as any)[0].count,
            byStatus,
            byDept,
            byStudyGroup: groupCounts
        });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
