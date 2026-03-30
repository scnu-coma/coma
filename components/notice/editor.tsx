"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo, useEffect, useRef } from "react";

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill-new");
        return ({ forwardedRef, ...props }: any) => <RQ ref={forwardedRef} {...props} />;
    },
    { ssr: false }
);

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
    const quillRef = useRef<any>(null);
    // 툴팁 텍스트 맵핑
    const tooltips: Record<string, string> = {
        'ql-bold': '굵게',
        'ql-italic': '기울임',
        'ql-underline': '밑줄',
        'ql-strike': '취소선',
        'ql-blockquote': '인용구',
        'ql-list': '리스트',
        'ql-bullet': '글머리 기호',
        'ql-ordered': '번호 매기기',
        'ql-align': '정렬',
        'ql-color': '글자 색상',
        'ql-background': '배경 색상',
        'ql-link': '링크 삽입',
        'ql-image': '이미지 삽입',
        'ql-video': '동영상 삽입',
        'ql-clean': '서식 지우기',
        'ql-header': '제목 크기',
        'ql-font': '글꼴 변경',
        'ql-table': '표 삽입',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const buttons = document.querySelectorAll('.ql-toolbar button, .ql-toolbar .ql-picker');
            buttons.forEach((btn) => {
                const className = Array.from(btn.classList).find(c => tooltips[c]);
                if (className) {
                    btn.setAttribute('title', tooltips[className]);
                }
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "image", "video"],
                ["table"],
                ["clean"],
            ],
        },
    }), []);

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-md border border-input min-h-[450px] relative">
            <style jsx global>{`
                .ql-editor {
                    min-height: 400px;
                    font-size: 1rem;
                }
                .ql-container.ql-snow {
                    border: none;
                }
                .ql-toolbar.ql-snow {
                    border: none;
                    border-bottom: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                    border-top-left-radius: 0.375rem;
                    border-top-right-radius: 0.375rem;
                }
                .dark .ql-toolbar.ql-snow {
                    background-color: #171717;
                    border-bottom: 1px solid #262626;
                }
            `}</style>
            <ReactQuill
                forwardedRef={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                className="h-full"
            />
        </div>
    );
}
