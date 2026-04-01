export type Post = {
    slug: string; // 글을 올릴 링크. 예)공지사항일 경우: notice
    title: string; // 글 제목
    date: string; // 작성일
    tag: string; // 분류 (공지, 행사 등)
    author: string; // 작성자
    excerpt: string; // 한줄요약
    ogImage: {
        // 카카오톡, 디스코드 등 다른 플랫폼에 이 글의 링크를 붙여넣었을 때 보이는 미리보기 이미지
        url: string;
    };
    content: string; // 본문내용
};
