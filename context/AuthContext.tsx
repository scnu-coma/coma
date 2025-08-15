// AuthProvider 컴포넌트 구현하기
// useAuth() 구현하기
"use client";

import React, { createContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import { UserProfile } from "@/types/user";
import { getUserProfile } from "@/lib/userService";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 사용자 프로필 로드
  const loadUserProfile = async (userId: string) => {
    try {
      const profile = await getUserProfile(userId);
      setUserProfile(profile);
      return profile;
    } catch (error) {
      console.error('프로필 로드 오류:', error);
      setUserProfile(null);
      return null;
    }
  };

  // 프로필 새로고침
  const refreshProfile = async () => {
    if (user) {
      await loadUserProfile(user.id);
    }
  };

  // 자동 리다이렉트 로직
  useEffect(() => {
    if (!isLoading && user && !userProfile && pathname !== '/register') {
      router.push('/register');
    }
  }, [user, userProfile, isLoading, router, pathname]);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await loadUserProfile(session.user.id);
      } else {
        setUserProfile(null);
      }
      
      setIsLoading(false);
    });

    // 초기 세션 로드
    const initializeAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        setUser(data.session?.user ?? null);
        
        if (data.session?.user) {
          await loadUserProfile(data.session.user.id);
        }
      } catch (error) {
        console.error('초기 인증 로드 오류:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: { redirectTo: window.location.origin },
    });
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      userProfile, 
      isLoading, 
      login, 
      logout, 
      refreshProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
}