import { z } from "zod";

// 회원가입 검증 스키마
export const registerSchema = z.object({
    email: z.string().email().max(255),
    password: z.string().min(6).max(100),
    name: z.string().min(2).max(50).regex(/^[가-힣a-zA-Z\s]+$/, "이름은 한글 또는 영문만 가능합니다."),
    student_id: z.string().length(8).regex(/^\d+$/, "학번은 숫자 8자리여야 합니다."),
    department: z.string().min(2).max(100),
});

// 로그인 검증 스키마
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

// 관리자 액션 검증 스키마
export const adminActionSchema = z.object({
    userId: z.number().int().positive(),
    status: z.enum(["APPROVED", "REJECTED", "PENDING"]),
});

// 공지사항 검증 스키마
export const noticeSchema = z.object({
    title: z.string().min(1).max(255).trim(),
    content: z.string().min(1)
});

// 예약 신청 검증 스키마
export const reservationSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "날짜 형식이 올바르지 않습니다."),
    startTime: z.string().regex(/^\d{2}:\d{2}$/, "시간 형식이 올바르지 않습니다."),
    endTime: z.string().regex(/^\d{2}:\d{2}$/, "시간 형식이 올바르지 않습니다."),
    purpose: z.string().min(1).max(1000).trim()
});
