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

export async function GET(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const [rows] = await pool.query("SELECT * FROM applicants WHERE id = ?", [id]);
            return NextResponse.json((rows as any[])[0]);
        }

        const [rows] = await pool.query("SELECT id, name, student_id, department, status, created_at FROM applicants ORDER BY created_at DESC");
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        const { id, status } = await req.json();
        await pool.query("UPDATE applicants SET status = ? WHERE id = ?", [status, id]);
        return NextResponse.json({ message: "Status updated" });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!(await verifyAdmin())) return NextResponse.json({ message: "Forbidden" }, { status: 403 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        await pool.query("DELETE FROM applicants WHERE id = ?", [id]);
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Error" }, { status: 500 });
    }
}
