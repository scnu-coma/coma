// 다크 모드 / 라이트 모드 테마 전환 버튼

// 기본적으로 사용자의 시스템 설정을 따라갑니다. (defaultTheme="system" enableSystem)
// 해 / 달 아이콘이 그려진 버튼을 클릭하면 아이콘 그림과 테마가 전환됩니다.
// 테마에 적용되는 모든 색상은 app/globals.css에서 지정합니다.

// 사용자가 전환한 테마 설정이 캐싱되지 않습니다.
// 개발 환경에서 Hydration 에러가 발생합니다. 프로덕션에서는 발생하지 않습니다.
// 2025년 7월 기준 Firefox에서 테마가 부드럽게 전환되는 효과가 지원되지 않습니다. 다음 링크를 참고하세요.
// https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    function toggleTheme() {
        if (document.startViewTransition) {
            document.startViewTransition(() => {
                setTheme(theme === "dark" ? "light" : "dark");
            });
        } else {
            setTheme(theme === "dark" ? "light" : "dark");
        }
    }

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger suppressHydrationWarning>
                    <Button variant="ghost" size="icon" onClick={() => toggleTheme()}>
                        <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] transition-all scale-0 dark:scale-100" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>모드 전환</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
