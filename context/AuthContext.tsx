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
            supabase.auth.getSession().then(({ data }) => {
                setSession(data.session);
                setUser(data.session?.user ?? null);
                if (data.session && data.session?.user.user_metadata.is_approved !== true) {
                    toast.info("부원 인증을 위한 계정 설정이 필요합니다.");
                    route.push("/register");
                } else if (data.session && data.session?.user.user_metadata.is_approved === true) {
                    toast.info(`${data.session.user.user_metadata.name}님, 안녕하세요.`);
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
