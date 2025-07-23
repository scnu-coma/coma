// 다크 모드 / 라이트 모드 테마 전역 관리

// 반드시 app/layout.tsx의 <body /> 내부에 나머지 컴포넌트를 모두 감싸는 형태로 위치해야 합니다.
// 위치를 지키지 않으면 정상적으로 작동하지 않습니다.

"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
