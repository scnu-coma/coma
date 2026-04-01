import TextInitial from "@/components/icons/text-initial";
import { TypographyH3 } from "@/components/typography/typography";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Binary, CheckSquare2, CircleDot, Plus, Type } from "lucide-react";

export default function RecruitmentForm() {
    return (
        <div className="[&_]:space-y-8">
            <div>
                <TypographyH3>부원 모집하기</TypographyH3>
            </div>
            <div>
                <Label htmlFor="description" className="mb-4">
                    설명
                </Label>
                <Textarea
                    id="description"
                    className="resize-none mb-6 h-52"
                    autoComplete="off"
                    autoFocus
                    required
                    placeholder="인사말, 운영계획, 회비 등 코마에 관한 기본적인 내용을 지원자에게 소개하세요."
                />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="description">이름</Label>
                        <span className="text-xs text-muted-foreground font-medium px-1">단답형 입력</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label>필수 항목</Label>
                        <Switch checked disabled />
                    </div>
                </div>
                <Input disabled placeholder="김코미" />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="description">학과</Label>
                        <span className="text-xs text-muted-foreground font-medium px-1">드롭다운 선택</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label>필수 항목</Label>
                        <Switch checked disabled />
                    </div>
                </div>
                <Input disabled placeholder="컴퓨터공학과" />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="description">학번</Label>
                        <span className="text-xs text-muted-foreground font-medium px-1">숫자 입력</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label>필수 항목</Label>
                        <Switch checked disabled />
                    </div>
                </div>
                <Input disabled placeholder="20251234" />
            </div>
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="description">연락처</Label>
                        <span className="text-xs text-muted-foreground font-medium px-1">숫자 입력</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Label>필수 항목</Label>
                        <Switch checked disabled />
                    </div>
                </div>
                <Input disabled placeholder="010-1234-5678" />
            </div>
            <div className="flex justify-end space-x-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button>
                            <Plus />
                            질문 추가
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="top" sideOffset={8} align="end">
                        <DropdownMenuItem>
                            <CheckSquare2 />
                            체크박스 <span className="text-xs text-neutral-400">여러 개 중 여러 개</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CircleDot /> 단일 선택 <span className="text-xs text-neutral-400">여러 개 중 하나</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <TextInitial color="var(--muted-foreground)" /> 긴 문장 입력
                            <span className="text-xs text-neutral-400">지원동기 등</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Type /> 단답형 입력 <span className="text-xs text-neutral-400">이름 등</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Binary />
                            숫자 입력 <span className="text-xs text-neutral-400">학번, 전화번호 등</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button>폼 저장</Button>
            </div>
        </div>
    );
}
