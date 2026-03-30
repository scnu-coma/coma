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

// 공지사항 목록 조회
export async function GET() {
    try {
        const [rows] = await pool.query(`
            SELECT n.id, n.title, n.author_id, u.name as author_name, n.created_at, n.updated_at
            FROM notices n
            LEFT JOIN users u ON n.author_id = u.id
            ORDER BY n.created_at DESC
        `);
        return NextResponse.json(rows);
    } catch (error) {
        console.error("Notice fetch error:", error);
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

import { noticeSchema } from "@/lib/validations";
import sanitizeHtml from "sanitize-html";

// ... verifyAdmin function ...

// 공지사항 등록 (관리자 전용)
export async function POST(req: Request) {
    const admin = await verifyAdmin();
    if (!admin) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    try {
        const body = await req.json();
        const validation = noticeSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json({ message: "유효하지 않은 데이터입니다." }, { status: 400 });
        }

        const { title, content } = validation.data;
        
        // Server-side sanitization
        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'u']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['style', 'class'],
                'img': ['src', 'alt', 'width', 'height']
            }
        });

        const [result] = await pool.query(
            "INSERT INTO notices (title, content, author_id) VALUES (?, ?, ?)",
            [title, sanitizedContent, admin.id]
        );

        return NextResponse.json({ message: "공지사항이 등록되었습니다.", id: (result as any).insertId }, { status: 201 });
    } catch (error) {
        console.error("Notice create error:", error);
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
