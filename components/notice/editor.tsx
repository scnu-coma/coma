"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo, useEffect } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
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
        // Quill 버튼들에 title 속성(툴팁) 추가
        const timer = setTimeout(() => {
            const buttons = document.querySelectorAll('.ql-toolbar button, .ql-toolbar .ql-picker');
            buttons.forEach((btn) => {
                const className = Array.from(btn.classList).find(c => tooltips[c]);
                if (className) {
                    btn.setAttribute('title', tooltips[className]);
                } else if (btn.classList.contains('ql-picker')) {
                    // Picker 형식(Header, Font 등) 처리
                    const pickerClass = Array.from(btn.classList).find(c => tooltips[c]);
                    if (pickerClass) btn.setAttribute('title', tooltips[pickerClass]);
                }
            });
        }, 500);
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
                ["table"], // 표 기능 추가 (Quill 기본 지원 범위 내)
                ["clean"],
            ],
        },
    }), []);

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-md border border-input min-h-[450px]">
            <style jsx global>{`
                .ql-editor {
                    min-h-[400px];
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
                /* 툴팁 기본 스타일 강화 */
                .ql-toolbar button[title]:hover::after {
                    content: attr(title);
                    position: absolute;
                    bottom: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #333;
                    color: #fff;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 1000;
                }
            `}</style>
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                className="h-full"
            />
        </div>
    );
}
