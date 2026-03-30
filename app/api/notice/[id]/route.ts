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

// 개별 공지사항 조회
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const [rows] = await pool.query(`
            SELECT n.id, n.title, n.content, n.author_id, u.name as author_name, n.created_at, n.updated_at
            FROM notices n
            LEFT JOIN users u ON n.author_id = u.id
            WHERE n.id = ?
        `, [id]);
        
        const notice = (rows as any[])[0];
        if (!notice) {
            return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
        }
        
        return NextResponse.json(notice);
    } catch (error) {
        console.error("Notice fetch by ID error:", error);
        return NextResponse.json({ message: "조회 오류" }, { status: 500 });
    }
}

import { noticeSchema } from "@/lib/validations";
import sanitizeHtml from "sanitize-html";

// ... other functions ...

// 공지사항 수정
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await verifyUser();
    if (!user) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    const { id } = await params;

    try {
        const body = await req.json();
        const validation = noticeSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json({ message: "유효하지 않은 데이터입니다." }, { status: 400 });
        }

        const { title, content } = validation.data;

        // 작성자 본인 또는 관리자 확인
        const [existing] = await pool.query("SELECT author_id FROM notices WHERE id = ?", [id]);
        const notice = (existing as any[])[0];
        if (!notice) {
            return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
        }

        if (notice.author_id !== user.id && user.role !== 'ADMIN') {
            return NextResponse.json({ message: "작성자 본인만 수정 가능합니다." }, { status: 403 });
        }

        // Server-side sanitization
        const sanitizedContent = sanitizeHtml(content, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'span', 'u']),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                '*': ['style', 'class'],
                'img': ['src', 'alt', 'width', 'height']
            }
        });

        await pool.query(
            "UPDATE notices SET title = ?, content = ? WHERE id = ?",
            [title, sanitizedContent, id]
        );

        return NextResponse.json({ message: "공지사항이 수정되었습니다." });
    } catch (error) {
        console.error("Notice update error:", error);
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}

// 공지사항 삭제
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await verifyUser();
    if (!user) {
        return NextResponse.json({ message: "권한이 없습니다." }, { status: 403 });
    }

    const { id } = await params;

    try {
        // 작성자 본인 또는 관리자 확인
        const [existing] = await pool.query("SELECT author_id FROM notices WHERE id = ?", [id]);
        const notice = (existing as any[])[0];
        if (!notice) {
            return NextResponse.json({ message: "게시글을 찾을 수 없습니다." }, { status: 404 });
        }

        if (notice.author_id !== user.id && user.role !== 'ADMIN') {
            return NextResponse.json({ message: "작성자 본인만 삭제 가능합니다." }, { status: 403 });
        }

        await pool.query("DELETE FROM notices WHERE id = ?", [id]);

        return NextResponse.json({ message: "공지사항이 삭제되었습니다." });
    } catch (error) {
        console.error("Notice delete error:", error);
        return NextResponse.json({ message: "데이터베이스 오류" }, { status: 500 });
    }
}
