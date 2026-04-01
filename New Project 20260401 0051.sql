-- MySQL Administrator dump 1.4
--
-- ------------------------------------------------------
-- Server version	5.5.5-10.6.3-MariaDB


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


--
-- Create schema coma
--

CREATE DATABASE IF NOT EXISTS coma;
USE coma;

--
-- Definition of table `advantages`
--

DROP TABLE IF EXISTS `advantages`;
CREATE TABLE `advantages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `advantages`
--

/*!40000 ALTER TABLE `advantages` DISABLE KEYS */;
/*!40000 ALTER TABLE `advantages` ENABLE KEYS */;


--
-- Definition of table `applicants`
--

DROP TABLE IF EXISTS `applicants`;
CREATE TABLE `applicants` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `motive` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `introduction` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `study_groups` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','INTERVIEW','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicants`
--

/*!40000 ALTER TABLE `applicants` DISABLE KEYS */;
/*!40000 ALTER TABLE `applicants` ENABLE KEYS */;


--
-- Definition of table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `from_date` date NOT NULL,
  `to_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `events`
--

/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` (`id`,`title`,`from_date`,`to_date`,`created_at`,`updated_at`) VALUES 
 (2,'코마데이','2026-04-03','2026-04-03','2026-03-31 21:20:13','2026-03-31 21:20:13');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;


--
-- Definition of table `notices`
--

DROP TABLE IF EXISTS `notices`;
CREATE TABLE `notices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `author_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `author_id` (`author_id`),
  CONSTRAINT `notices_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notices`
--

/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` (`id`,`author_id`,`title`,`content`,`created_at`,`updated_at`) VALUES 
 (9,2,'2025년 2학기 동아리방 시간표 안내','안녕하세요, **코딩마스터 회장 김연지**입니다.\n\n동아리방 사용을 희망하시는 동아리 부원 여러분을 위해 2025학년도 동아리방 고정 시간표를 안내해 드립니다.\n안내된 동아리방의 고정 시간표 이외에는 자유롭게 사용할 수 있으니 참고해 주시기 바랍니다.\n\n| 시간 (오후) | 월     | 화     | 수      | 목      | 금        |\n| ----------: | ------ | ------ | ------- | ------- | --------- |\n|   1시 ~ 2시 | --     | --     | --      | 모각코2 | 모각코3   |\n|   2시 ~ 3시 | --     | --     | --      | --      | 보안      |\n|   3시 ~ 4시 | --     | --     | --      | --      | --        |\n|   4시 ~ 5시 | --     | --     | --      | --      | --        |\n|   5시 ~ 6시 | --     | --     | --      | 앱 개발 | --        |\n|   6시 ~ 7시 | --     | 파이썬 | 자바      | 자격증  | --        |\n|   7시 ~ 8시 | --     | 모각코1 | --      | 백엔드1 | --        |','2025-10-20 00:00:00','2026-03-30 19:28:19'),
 (10,2,'2025년 2학기 스터디 변경 안내','안녕하세요, **코딩마스터 회장 김연지**입니다.\n\n중간고사가 끝난 다음 주차부터 하반기 스터디 및 모각코가 시행됩니다.\n개강총회 계획안에서 안내해 드린 대로, 희망자에 한하여 **스터디 및 모각코 재배치**가 이루어질 예정입니다.\n\n## 필독 유의사항\n\n-   각 스터디 및 모각코의 시간표는 기존 시간표대로 운영됩니다.\n    [2025년 2학기 동아리방 시간표 안내](https://scnucoma.com/notice/2025%EB%85%84%202%ED%95%99%EA%B8%B0%20%EB%8F%99%EC%95%84%EB%A6%AC%EB%B0%A9%20%EC%8B%9C%EA%B0%84%ED%91%9C%20%EC%95%88%EB%82%B4)에서 시간표를 확인하고, 재배치 신청을 진행하세요.\n-   각 그룹별 최대 인원은 **8명**입니다. 신청자 수가 최대 인원을 초과할 경우, 새로운 그룹으로 배치될 수 있습니다.\n-   새로운 그룹에 배치될 경우, 그룹 내 활동 시간 조율이 필요할 수 있습니다.\n\n## 변경 접수 기간\n\n10.20 (월) ~ 10.25 (토) 12:00시\n\n## 재배치 신청하기\n\n[구글 폼 바로가기](https://forms.gle/3u9KMLrVErUzwmEC8)\n\n## 스터디 현황\n\n### 자바\n-   인프런 강의 \'김영한의 자바 입문 - 코드로 시작하는 자바 첫걸음\'을 통한 문법 학습\n-   프로그래머스 문제 풀이\n\n### 보안\n-   오라클 클라우드를 이용한 사설 서버 개설\n-   모의 해킹 진행\n\n### 앱 개발\n-   인프런 강의 수강\n\n### 게임 개발\n-   Dodge 게임 클론코딩\n-   클론코딩 후 원하는 기능 및 객체 디벨롭\n\n### 백엔드1\n-   인프런 강의 수강\n-   Spring 개발환경 설정\n\n### 백엔드2\n-   인프런 강의 수강\n-   개발환경 설정\n\n### 자격증\n-   시나공 컴퓨터활용능력 1급 필기 기본서 교재 학습\n-   시나공 컴퓨터활용능력 2급 필기 기본서 교재 학습\n-   교재 부록 인터넷 강의 수강\n-   리눅스 마스터 CBT 기출문제 풀이\n\n### 파이썬\n-   BOJ 알고리즘 문제 풀이 (매개변수 파트까지 완료)','2025-10-20 00:00:01','2026-03-30 19:28:19'),
 (11,2,'2025년 2학기 스터디 운영 안내','안녕하세요, **코딩마스터 관리국장 김지원**입니다.\n이번 2025년 2학기부터 적용될 개선된 스터디 운영방식을 안내드립니다.\n\n## 1. 멘토링 제도 개선\n\n이번 학기부터 스터디를 이끄는 역할이 **멘토**와 **팀장**으로 구분됩니다.\n각 스터디 그룹에는 멘토 또는 팀장이 1명 배정되며, 두 역할의 차이는 아래와 같습니다.\n\n### 멘토와 팀장\n\n| 구분 | 주요 활동                             | 선출 방식             | 필수 자격                      |\n| ---- | ------------------------------------- | --------------------- | ------------------------------ |\n| 멘토 | 스터디원 실력 향상을 위한 멘토링      | 자발적 지원 또는 추천 | 해당 분야에 대한 기본적인 이해 |\n| 팀장 | 스터디 대표, 스터디 일지 작성 및 제출 | 스터디 그룹 내 협의   | 없음                           |\n\n멘토와 팀장 중 어떤 역할이 배정될지는 스터디 개설 여부와 해당 분야 멘토 지원자 유무에 따라 결정됩니다.\n멘토로 지원하고자 하는 경우, 운영진에게 별도로 문의해 주시기 바랍니다.\n\n## 2. 신규 스터디 \'모각코\' 개설\n\n이번 학기부터 신규 스터디 **모각코**(모여서 각자 코딩하기)가 새롭게 운영됩니다.\n각자 자신이 원하는 주제와 난이도에 맞춰 자유롭게 학습할 수 있으며, 모든 코딩 분야를 아우르는 열린 학습 분위기를 목표로 합니다.\n\n-   운영 방식: 주 1회, 2시간 진행\n-   참여 방식: 원하는 언어와 주제로 자유 학습 및 스터디원 간 교류\n-   중복 참여 가능: 모각코만 참여하거나, 다른 스터디와 병행 가능\n    -   예시 1 ) \'파이썬\' 만 참여\n    -   예시 2 ) \'모각코\' 만 참여\n    -   예시 3 ) \'자격증\', \'모각코\' 모두 참여\n\n자세한 내용은 코마 개강총회에서 다시 안내드리겠습니다.\n감사합니다.','2025-08-15 00:00:00','2026-03-30 19:28:19'),
 (12,2,'2025년 2학기 하반기 스터디 재개 안내','안녕하세요, **코딩마스터 회장 김연지**입니다.\n\n금일 일자인 10월 27일 월요일부터 스터디 및 모각코가 재개됩니다.\n스터디 및 모각코 재배치 수합 결과에 따라 **게임 개발** 스터디와 **백엔드2** 스터디가 운영되지 않음을 알립니다.\n\n또한, 2학기 하반기 스터디의 변경 사항을 알려드립니다.\n각 스터디 팀장 또는 대표자께서는 매 주차의 스터디 및 모각코의 대면 비대면 여부를 **관리국 오픈채팅방**으로 보고해 주시기 바랍니다.','2025-10-27 00:00:00','2026-03-30 19:28:19'),
 (13,2,'스터디 전반기 진행상황 수합 안내','안녕하세요, **코딩마스터 회장 김연지**입니다.\n2학기 스터디 활동 중 전반기 스터디 내용의 진행 상황 및 활동 내용을 수합 받으려 합니다.\n\n각 스터디 팀장 또는 대표자께서는 **10월 17일 (금) 낮 12시까지** 공백 미포함 100자 이상의 활동 내용 및 활동 사진 2장을 **관리국 오픈채팅**으로 제출해 주시기 바랍니다.\n\n### 예시\n\n> 1주차: 인프런 강의 학습을 통해 구조체까지 비대면 스터디를 통해 학습, 대면스터디는 프로그래머스 문제 풀이 진행\n> 2주차: 포인터까지 학습 후 대면활동을 통해 목표설정에 따른 개인별 코드 제작 및 공유\n> (프로그래머스 문제 풀이 사진 첨부)\n\n**사실에 기반**하여 스터디 진행 상황을 공유해 주시기 바랍니다.\n중간고사 이후 스터디 재배치를 위한 것이므로 반드시 해당 기간 내에 활동 내용을 제출해 주시기 바랍니다.\n\n궁금한 사항은 관리국 오픈채팅으로 문의 바랍니다.\n감사합니다.','2025-10-14 00:00:00','2026-03-30 19:28:19'),
 (14,2,'인프런 강의 안내','## 1. 인프런 체제 개편 안내\n\n안녕하세요. **코딩마스터 회장 김연지**입니다.\n이번 2025년 9월 일자로 개편된 인프런 사항에 따라 바뀐 인프런 체제를 안내드립니다.\n\n기존 인프런에서의 강의 수강 방식은 기기 제한을 받지 않고 사용할 수 있었으나,\n9월 1주차 인프런의 업데이트 소식으로 **매 월 최대 5개의 기기만이 등록이 가능**하게끔 개편되었습니다.\n\n## 2. 코마 인프런 방식 안내\n\n코마에서는 매월 1일부터 한 계정당 최대 5개의 기기를 **선착순**으로 등록 할 예정입니다.\n한 명 당 매 월 최대 **2개** 까지의 수강이 가능하며, 매 월 마지막 일자에 기기 초기화를 시킬 예정입니다.\n등록은 인프런 계정 관리자인 **회장 김연지**를 찾아와 등록하시면 됩니다.\n\n| 양식 | ex) 앱2 인프런 강의 10월 신청합니다. |\n| ---- | ------------------------------------ |\n\n## 3. 코마 보유 인프런 강의 목록\n\n**무료 강의는 제외한 유료로 표기되어 있는 강의들만 나열한 리스트입니다.**\n\n| 분야          | 강의 목록                                                                                                   |\n| ------------- | ----------------------------------------------------------------------------------------------------------- |\n| C언어         | 문제로 배우는 C언어                                                                                         |\n| 앱1           | Flutter 3.0 앱 개발 - 10개의 프로젝트로 오늘 초보 탈출!                                                     |\n|               | Flutter 진짜 실전! 상태관리, 캐시관리, Code Generation, GoRouter, 인증로직 등 중수가 되기 위한 필수 스킬들! |\n|               | 프로그래밍 시작하기:웹 입문                                                                                 |\n| 앱2           | Flutter 3.0 앱 개발 - 10개의 프로젝트로 오늘 초보 탈출!                                                     |\n|               | Flutter 진짜 실전! 상태관리, 캐시관리, Code Generation, GoRouter, 인증로직 등 중수가 되기 위한 필수 스킬들! |\n|               | 실리콘밸리 엔지니어와 함께하는 Docker                                                                       |\n| 백앤드1       | 자바 ORM 표준 JPA 프로그래밍 - 기본편                                                                       |\n|               | 실전! 스프링 데이터 JPA                                                                                     |\n|               | 실전! 스프링 부트와 JPA 활용2 - API 개발과 성능 최적화                                                      |\n| 백앤드2       | 스프링 핵심 원리 - 기본편                                                                                   |\n|               | 스프링 MVC 1편 - 백엔드 웹 개발 핵심 기술                                                                   |\n|               | 모든 개발자를 위한 HTTP 웹 기본 지식                                                                        |\n| 자바1,2       | 나도코딩의 자바 기본편 - 풀코스(20시간)                                                                     |\n| 프론트엔드1,2 | 한 입 크기로 잘라 먹는 리액트(React.js) : 기초부터 실전까지                                                 |\n| 자격증        | (2025) 일주일만에 합격하는 정보처리기사 실기                                                                |','2025-09-30 00:00:00','2026-03-30 19:28:19'),
 (15,2,'코마 웹사이트 오픈','안녕하세요, 국립순천대학교 코딩 동아리 코마입니다.\n이번 학기부터 코마 공식 홈페이지가 새롭게 문을 열었습니다.\n\n홈페이지에서는 부원모집, 부실예약 등 여러분의 동아리 활동을 더 편하게 즐길 수 있는 다양한 서비스를 제공할 예정입니다.\n여러분의 많은 관심과 활용 부탁드립니다.\n\n감사합니다.','2025-08-14 00:00:00','2026-03-30 19:28:19');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;


--
-- Definition of table `recruitment_settings`
--

DROP TABLE IF EXISTS `recruitment_settings`;
CREATE TABLE `recruitment_settings` (
  `id` int(11) NOT NULL DEFAULT 1,
  `is_open` tinyint(1) DEFAULT 0,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `term` int(11) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `google_form_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `CONSTRAINT_1` CHECK (`id` = 1)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recruitment_settings`
--

/*!40000 ALTER TABLE `recruitment_settings` DISABLE KEYS */;
INSERT INTO `recruitment_settings` (`id`,`is_open`,`start_date`,`end_date`,`term`,`year`,`google_form_url`) VALUES 
 (1,0,'2026-02-22','2026-03-31',1,2026,'');
/*!40000 ALTER TABLE `recruitment_settings` ENABLE KEYS */;


--
-- Definition of table `room_reservations`
--

DROP TABLE IF EXISTS `room_reservations`;
CREATE TABLE `room_reservations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reservation_date` date NOT NULL,
  `start_time` time NOT NULL,
  `end_time` time NOT NULL,
  `status` enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `room_reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `room_reservations`
--

/*!40000 ALTER TABLE `room_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `room_reservations` ENABLE KEYS */;


--
-- Definition of table `study_groups`
--

DROP TABLE IF EXISTS `study_groups`;
CREATE TABLE `study_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `leader_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `max_members` int(11) DEFAULT 10,
  `status` enum('RECRUITING','IN_PROGRESS','FINISHED') COLLATE utf8mb4_unicode_ci DEFAULT 'RECRUITING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `study_groups`
--

/*!40000 ALTER TABLE `study_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `study_groups` ENABLE KEYS */;


--
-- Definition of table `system_settings`
--

DROP TABLE IF EXISTS `system_settings`;
CREATE TABLE `system_settings` (
  `setting_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`setting_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `system_settings`
--

/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;
INSERT INTO `system_settings` (`setting_key`,`setting_value`) VALUES 
 ('is_reservation_open','false');
/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;


--
-- Definition of table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `student_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `department` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('USER','ADMIN') COLLATE utf8mb4_unicode_ci DEFAULT 'USER',
  `status` enum('PENDING','APPROVED','REJECTED') COLLATE utf8mb4_unicode_ci DEFAULT 'PENDING',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `student_id` (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`,`email`,`password`,`name`,`student_id`,`department`,`role`,`status`,`created_at`,`updated_at`) VALUES 
 (2,'admin@coma.com','$2b$10$97IWvcXWcd7W/q/Ep7LTwemoBhU1xdFaBCtKckli6PO/cwQqYfu/a','운영진','00000000','COMA 운영국','ADMIN','APPROVED','2026-03-30 19:22:55','2026-03-30 19:22:55');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
