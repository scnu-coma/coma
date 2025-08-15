// 사용자 권한 타입입
export type UserRole = 'guest' | 'member' | 'admin';

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  department: string;
  student_id: string;
  grade: string;
  phone: string;
  role: UserRole;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserProfileData {
  name: string;
  department: string;
  student_id: string;
  grade: string;
  phone: string;
}
