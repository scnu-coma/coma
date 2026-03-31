"use client";

import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import { useMemo, useEffect, useRef } from "react";

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill-new");
        const Quill = (RQ as any).Quill || (await import("quill")).default;
        
        // 글꼴 크기 리스트 (pt 단위)
        const fontSizeArr = ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '22pt', '24pt', '26pt', '28pt', '36pt', '48pt', '72pt'];
        const Size = Quill.import('attributors/style/size');
        Size.whitelist = fontSizeArr;
        Quill.register(Size, true);

        // 글꼴 종류 리스트
        const fontArr = [false, 'serif', 'monospace', 'nanum-gothic', 'pretendard'];
        const Font = Quill.import('attributors/style/font');
        Font.whitelist = fontArr;
        Quill.register(Font, true);

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
    
    // 툴팁 한글화 및 상세화
    const tooltips: Record<string, string> = {
        'ql-bold': '굵게 (Ctrl+B)',
        'ql-italic': '기울임 (Ctrl+I)',
        'ql-underline': '밑줄 (Ctrl+U)',
        'ql-strike': '취소선',
        'ql-blockquote': '인용구',
        'ql-list[value="ordered"]': '번호 매기기',
        'ql-list[value="bullet"]': '글머리 기호',
        'ql-align': '정렬 변경',
        'ql-align[value=""]': '왼쪽 정렬',
        'ql-align[value="center"]': '가운데 정렬',
        'ql-align[value="right"]': '오른쪽 정렬',
        'ql-align[value="justify"]': '양쪽 정렬',
        'ql-color': '글자 색상',
        'ql-background': '배경 색상',
        'ql-link': '링크 삽입',
        'ql-image': '이미지 삽입',
        'ql-video': '동영상 삽입',
        'ql-clean': '서식 지우기',
        'ql-font': '글꼴 변경',
        'ql-size': '글자 크기(pt)',
        'ql-table': '표 삽입',
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            const buttons = document.querySelectorAll('.ql-toolbar button, .ql-toolbar .ql-picker');
            buttons.forEach((btn) => {
                // 특정 값을 가진 버튼/픽커 처리
                const value = btn.getAttribute('value');
                const className = Array.from(btn.classList).find(c => tooltips[c]);
                
                let tooltipKey = '';
                if (btn.classList.contains('ql-align')) {
                    tooltipKey = `ql-align${value ? `[value="${value}"]` : '[value=""]'}`;
                } else if (btn.classList.contains('ql-list')) {
                    tooltipKey = `ql-list[value="${value}"]`;
                } else {
                    tooltipKey = className || '';
                }

                if (tooltips[tooltipKey]) {
                    btn.setAttribute('title', tooltips[tooltipKey]);
                } else if (className && tooltips[className]) {
                    btn.setAttribute('title', tooltips[className]);
                }
            });
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ font: [false, 'serif', 'monospace'] }],
                [{ size: ['8pt', '9pt', '10pt', '11pt', '12pt', '14pt', '16pt', '18pt', '20pt', '24pt', '28pt', '36pt', '48pt', '72pt'] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "link", "image", "table"],
                ["clean"],
            ],
        },
    }), []);

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-md border border-input min-h-[450px] relative">
            <style jsx global>{`
                /* 정렬 아이콘 픽커가 아닌 개별 버튼으로 표시되도록 유도 (Quill 기본 동작) */
                
                /* 글자 크기 픽커 레이블 표시 */
                .ql-snow .ql-picker.ql-size .ql-picker-label::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item::before {
                    content: attr(data-value) !important;
                }
                .ql-snow .ql-picker.ql-size .ql-picker-label:not([data-value])::before,
                .ql-snow .ql-picker.ql-size .ql-picker-item:not([data-value])::before {
                    content: '12pt' !important;
                }

                /* 글꼴 픽커 레이블 */
                .ql-snow .ql-picker.ql-font .ql-picker-label::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item::before {
                    content: '기본 글꼴';
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
                    content: '바탕체';
                }
                .ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
                .ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
                    content: '고딕체';
                }

                .ql-editor {
                    min-height: 400px;
                    font-size: 12pt;
                    line-height: 1.6;
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
                    padding: 8px;
                }
                .dark .ql-toolbar.ql-snow {
                    background-color: #171717;
                    border-bottom: 1px solid #262626;
                }
                
                .ql-snow .ql-picker.ql-size { width: 70px; }
                .ql-snow .ql-picker.ql-font { width: 100px; }
                
                /* 표 스타일링 */
                .ql-editor table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 10px 0;
                }
                .ql-editor td, .ql-editor th {
                    border: 1px solid #ddd;
                    padding: 8px;
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
