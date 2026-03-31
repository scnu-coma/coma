import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { z } from "zod";
import { sendDiscordMessage } from "@/lib/discord";

const applicantSchema = z.object({
    name: z.string().min(2),
    student_id: z.string().min(5),
    phone: z.string().min(10),
    department: z.string().min(2),
    motive: z.string().min(10),
    introduction: z.string().min(10),
    study_groups: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = applicantSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ message: "필수 항목을 모두 입력해주세요." }, { status: 400 });
        }

        const { name, student_id, phone, department, motive, introduction, study_groups } = validation.data;
        const studyGroupsStr = study_groups ? study_groups.join(",") : "";

        await pool.query(
            "INSERT INTO applicants (name, student_id, phone, department, motive, introduction, study_groups) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [name, student_id, phone, department, motive, introduction, studyGroupsStr]
        );

        // Discord 알림 발송
        await sendDiscordMessage([
            {
                title: "📝 새 부원 가입 신청서 접수",
                color: 0x3498db,
                fields: [
                    { name: "이름", value: name, inline: true },
                    { name: "학과", value: department, inline: true },
                    { name: "학번", value: student_id, inline: true },
                    { name: "연락처", value: phone, inline: true },
                    { name: "관심 스터디", value: studyGroupsStr || "없음", inline: false },
                ],
                timestamp: new Date().toISOString(),
                footer: { text: "COMA 부원 모집 시스템" }
            }
        ]);

        return NextResponse.json({ message: "지원이 완료되었습니다!" }, { status: 201 });
    } catch (error) {
        console.error("Applicant submission error:", error);
        return NextResponse.json({ message: "데이터베이스 오류가 발생했습니다." }, { status: 500 });
    }
}
