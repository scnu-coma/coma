import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// 로그아웃
export async function POST() {
    (await cookies()).delete("auth_token");
    return NextResponse.json({ message: "로그아웃 되었습니다." });
}
