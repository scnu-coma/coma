"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
    id: number;
    email: string;
    name: string;
    role: "USER" | "ADMIN";
    status: "PENDING" | "APPROVED" | "REJECTED";
    student_id: string;
    department: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const route = useRouter();

    // 초기 세션 로드 (현재 유저 확인)
    const checkUser = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                toast.success(`${data.user.name}님, 환영합니다!`);
                route.push("/");
            } else {
                toast.error(data.message || "로그인에 실패했습니다.");
            }
        } catch (error) {
            toast.error("서버와 통신 중 오류가 발생했습니다.");
        }
    };

    const register = async (formData: any) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" },
            });

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                route.push("/login");
            } else {
                toast.error(data.message || "회원가입에 실패했습니다.");
            }
        } catch (error) {
            toast.error("서버와 통신 중 오류가 발생했습니다.");
        }
    };

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
            toast.info("로그아웃되었습니다.");
            route.push("/");
        } catch (error) {
            toast.error("로그아웃 도중 에러가 발생했습니다.");
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
