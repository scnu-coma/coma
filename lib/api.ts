// md 파일 추출하는 코드
// 말 그대로 추출만 하고 보기 예쁘게 css를 다듬어주진 않습니다 그건 다른 코드에서 할 것

import { Post } from "@/types/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

// _posts의 모든 폴더 내 모든 파일들을 추출
const postsDirectory = (category: string) => join(process.cwd(), `_posts/${category}`);

export function getSlugs(category: string) {
    return fs.readdirSync(postsDirectory(category));
}

export function getPostBySlug(category: string, slug: string) {
    // 파일명에서 .md 제거 후 URL로 사용
    const realSlug = slug.replace(/\.md$/, "");
    const fullPath = join(postsDirectory(category), `${realSlug}.md`);
    // 한글을 읽을 수 있도록 utf8 포맷으로 decode
    const fileContents = fs.readFileSync(decodeURI(fullPath), "utf8");
    // 메타데이터와 본문내용 분리
    const { data, content } = matter(fileContents);
    // 처리결과 반환
    return { ...data, slug: realSlug, content } as Post;
}

export function getAllPosts(category: string): Post[] {
    const slugs = getSlugs(category);
    // 날짜 내림차순으로 정렬 (최신글일수록 상단)
    const posts = slugs
        .map((slug) => getPostBySlug(category, slug))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
