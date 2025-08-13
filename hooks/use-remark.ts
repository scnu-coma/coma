"use client";
import { useCallback, useState, useMemo, useRef } from "react";
import * as jsxRuntime from "react/jsx-runtime";
import remarkParse, { type Options as RemarkParseOptions } from "remark-parse";
import remarkRehype, { type Options as RemarkRehypeOptions } from "remark-rehype";
import { unified } from "unified";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import rehypeExternalLinks from "rehype-external-links";
import rehypeReact, { type Options as RehypeReactOptions } from "rehype-react";
import { type VFile } from "vfile";

export interface UseRemarkOptions {
    remarkParseOptions?: RemarkParseOptions;
    remarkRehypeOptions?: RemarkRehypeOptions;
    rehypeReactOptions?: Pick<RehypeReactOptions, "components">;
}

export default function useRemark({
    remarkParseOptions,
    remarkRehypeOptions,
    rehypeReactOptions,
}: UseRemarkOptions = {}): [React.ReactElement | null, (source: string) => void] {
    const [content, setContent] = useState<React.ReactElement | null>(null);
    const processingRef = useRef<string | null>(null); // 현재 처리 중인 소스 추적
    const cacheRef = useRef<Map<string, React.ReactElement>>(new Map()); // 메모리 캐시

    // unified processor를 메모이제이션
    const processor = useMemo(() => {
        return unified()
            .use(remarkParse, remarkParseOptions)
            .use(remarkGfm)
            .use(remarkRehype, remarkRehypeOptions)
            .use(rehypePrettyCode, {
                theme: "catppuccin-mocha",
            })
            .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener"] })
            .use(rehypeReact, {
                ...rehypeReactOptions,
                Fragment: jsxRuntime.Fragment,
                jsx: jsxRuntime.jsx,
                jsxs: jsxRuntime.jsxs,
            });
    }, [remarkParseOptions, remarkRehypeOptions, rehypeReactOptions]);

    const setMarkdown = useCallback(
        async (source: string) => {
            // 이미 처리 중인 같은 소스라면 무시
            if (processingRef.current === source) {
                return;
            }

            // 캐시에서 확인
            const cacheKey = source.slice(0, 100); // 더 긴 키로 캐시 정확도 향상
            const cached = cacheRef.current.get(cacheKey);
            if (cached) {
                setContent(cached);
                return;
            }

            processingRef.current = source;

            try {
                const file: VFile = await processor.process(source);
                const result = file.result as React.ReactElement;

                // 처리가 완료된 후에도 같은 소스인지 확인 (race condition 방지)
                if (processingRef.current === source) {
                    setContent(result);
                    cacheRef.current.set(cacheKey, result);

                    // 캐시 크기 제한 (메모리 누수 방지)
                    if (cacheRef.current.size > 50) {
                        const keys = Array.from(cacheRef.current.keys());
                        if (keys.length > 0) {
                            cacheRef.current.delete(keys[0]);
                        }
                    }
                }
            } catch (error) {
                console.error("마크다운 처리 에러:", error);
            } finally {
                if (processingRef.current === source) {
                    processingRef.current = null;
                }
            }
        },
        [processor]
    );

    return [content, setMarkdown];
}
