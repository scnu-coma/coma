import { supabase } from './supabaseClient';
import { UserProfile, CreateUserProfileData, UserRole } from '@/types/user';

// 사용자 프로필 생성 (최초 로그인 시)
export async function createUserProfile(userId: string, data: CreateUserProfileData): Promise<UserProfile | null> {
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .insert({
        user_id: userId,
        ...data,
        role: 'guest', // 기본값: 게스트 권한
        is_approved: false // 기본값: 승인 대기
      })
      .select()
      .single();

    if (error) {
      console.error('프로필 생성 오류:', error);
      return null;
    }

    return profile;
  } catch (error) {
    console.error('프로필 생성 중 예외:', error);
    return null;
  }
}

// 사용자 프로필 조회
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // 프로필이 없는 경우
        return null;
      }
      console.error('프로필 조회 오류:', error);
      return null;
    }

    return profile;
  } catch (error) {
    console.error('프로필 조회 중 예외:', error);
    return null;
  }
}

// 게스트 사용자 목록 조회 (admin)
export async function getGuestUsers(): Promise<UserProfile[]> {
  try {
    const { data: profiles, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('role', 'guest')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('게스트 사용자 조회 오류:', error);
      return [];
    }

    return profiles || [];
  } catch (error) {
    console.error('게스트 사용자 조회 중 예외:', error);
    return [];
  }
}

// 사용자 권한 승인 (guest → member)
export async function approveUser(userId: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        role: 'member',
        is_approved: true,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('사용자 승인 오류:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('사용자 승인 중 예외:', error);
    return false;
  }
}

// 사용자 권한 변경
export async function updateUserRole(userId: string, role: UserRole): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .update({
        role,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) {
      console.error('권한 변경 오류:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('권한 변경 중 예외:', error);
    return false;
  }
}
