-- 1. 데이터베이스 생성 및 선택
CREATE DATABASE IF NOT EXISTS coma CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE coma;

-- 2. 유저 테이블 (회원가입/로그인/권한/승인관리)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    student_id VARCHAR(20) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    role ENUM('USER', 'ADMIN') DEFAULT 'USER',
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 3. 초기 관리자 계정 생성 (admin@coma.com / admin1234)
-- 이미 존재하면 삭제 후 최신 정보로 갱신
DELETE FROM users WHERE email = 'admin@coma.com';
INSERT INTO users (email, password, name, student_id, department, role, status) 
VALUES (
    'admin@coma.com', 
    '$2b$10$97IWvcXWcd7W/q/Ep7LTwemoBhU1xdFaBCtKckli6PO/cwQqYfu/a', -- admin1234 해시값
    '운영진', 
    '00000000', 
    'COMA 운영국', 
    'ADMIN', 
    'APPROVED'
);

-- 4. 달력 행사 테이블 (메인 페이지 달력 관리)
CREATE TABLE IF NOT EXISTS events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 5. 혜택 관리 테이블 (코마 부원 전용 계정 정보)
CREATE TABLE IF NOT EXISTS advantages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255),
    tag VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 6. 모집 공고 설정 테이블 (사이트 전역 모집 상태 스위치)
CREATE TABLE IF NOT EXISTS recruitment_settings (
    id INT PRIMARY KEY DEFAULT 1,
    is_open BOOLEAN DEFAULT FALSE,
    start_date DATE,
    end_date DATE,
    term INT,
    year INT,
    CHECK (id = 1)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 초기 모집 설정 데이터 (기본값)
INSERT IGNORE INTO recruitment_settings (id, is_open, start_date, end_date, term, year) 
VALUES (1, FALSE, '2025-08-05', '2025-09-10', 2, 2025);

-- 7. 스터디 그룹 테이블 (스터디 관리)
CREATE TABLE IF NOT EXISTS study_groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    leader_name VARCHAR(100),
    max_members INT DEFAULT 10,
    status ENUM('RECRUITING', 'IN_PROGRESS', 'FINISHED') DEFAULT 'RECRUITING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 8. 공지사항 테이블
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT NOT NULL,
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 9. 동아리방 예약 설정 테이블
CREATE TABLE IF NOT EXISTS reservation_settings (
    id INT PRIMARY KEY DEFAULT 1,
    is_open BOOLEAN DEFAULT FALSE,
    CHECK (id = 1)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE INTO reservation_settings (id, is_open) VALUES (1, FALSE);

-- 10. 동아리방 예약 테이블
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose TEXT NOT NULL,
    status ENUM('PENDING', 'APPROVED', 'REJECTED') DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
