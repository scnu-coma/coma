// 메인화면 hero section(배너)에 표시할 공지사항
// 4개만 쓰세요

import hero1 from "@/public/images/nidhin-mohan-p_wC_T2HUPk-unsplash.jpg";
import hero2 from "@/public/images/banner_recruitment.webp";

export const notices = [
    {
        subtitle: "새로운 공지사항",
        title: "코마 웹사이트 오픈",
        content: "코마 공식 홈페이지가 새롭게 문을 열었습니다.",
        content2: "여러분의 많은 관심과 활용 부탁드립니다.",
        image: hero1,
        href: "/notice/코마-웹사이트-오픈",
    },
    {
        subtitle: "부원 모집안내",
        title: "2학기 신규 부원 모집",
        content: "2025년 2학기 신규 부원 모집이 진행중입니다.",
        content2: "",
        image: hero2,
        href: "/recruitment/2025-2",
    },
];
