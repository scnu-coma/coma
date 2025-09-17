// AuthProvider 컴포넌트 구현하기
// useAuth() 구현하기
"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface AuthContextType {
    user: User | null;
    session: Session | null;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const route = useRouter();

    useEffect(() => {
        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        // 초기 세션 로드
        try {
            supabase.auth.getSession().then(async ({ data }) => {
                const uuid = await supabase
                    .from("users")
                    .select("user_id")
                    .eq("user_id", data.session?.user.id)
                    .single();
                setSession(data.session);
                setUser(data.session?.user ?? null);
                // 로그인이 완료되었으나, supabase의 users 테이블 중 uuid 열에서 현재 접속자의 uuid가 존재하지 않는다면 추가정보 입력이 되지 않은 상태로 간주하며 register 페이지로 이동시킨다.
                // 사용자가 정보를 입력하지 않고 다른 페이지로 이동한다고 해서 강제로 재이동시키지는 않으나, 로그인 또는 새로고침을 할 때마다(세션을 확인할 때마다) register 페이지로 다시 이동될 것이다.
                // supabase의 users 테이블에 아무런 데이터도 존재하지 않는다면 이 로직은 아무 데이터도 가져오지 못해 에러가 발생하며 정상적으로 작동하지 않는다.
                // 반드시 하나 이상의 row가 존재해야만 정상적으로 작동한다.
                if (data.session && !uuid.data?.user_id) {
                    toast.info("부원 인증을 위한 계정 설정이 필요합니다.");
                    route.push("/register");
                }
            });
            return () => {
                listener.subscription.unsubscribe();
            };
        } catch (error: unknown) {
            toast.error(`인증 에러가 발생했습니다. ${(error as Error).message}`);
        }
    }, [route]);

    const login = async () => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: "kakao",
            });
        } catch (error: unknown) {
            toast.error(`로그인 에러: ${(error as Error).message}`);
        }
    };

    const logout = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
            setSession(null);
            toast.info("로그아웃이 완료되었습니다.");
        } catch (error) {
            toast.error(`로그아웃 도중 에러가 발생했습니다. ${(error as Error).message}`);
        } finally {
            route.push("/");
        }
    };

    return <AuthContext.Provider value={{ user, session, login, logout }}>{children}</AuthContext.Provider>;
}
