// 마지막 수정 : 2025년 8월 14일 v1
// 새 버전은 새 페이지를 생성하세요.
// 새 버전을 생성했다면 버전 선택 드롭다운 내용, footer의 링크도 교체하세요.

"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { TypographyH1, TypographyH2, TypographyP, TypographyUnlisted } from "@/components/typography/typography";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

// 제1조 표 내용
const infos = [
    {
        purpose: "이용자 식별, 회원 관리",
        item: "성명, 학번, 학과, 학년, 연락처",
        duration: "회원 탈퇴 시 즉시 파기",
    },
    {
        purpose: "카카오 로그인 연동",
        item: "성명, 카카오 아이디, 카카오 사용자 토큰",
        duration: "카카오 연동 해제 또는 회원 탈퇴 시 파기",
    },
    {
        purpose: "부실 예약 서비스 이용",
        item: "성명",
        duration: "정보 삭제 요칭 시 또는 회원 탈퇴 시 파기",
    },
];

// 버전 선택
const versions = [
    {
        value: "v1",
        label: "v1 (최신 버전)",
    },
];

export default function Page() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    return (
        <div className="break-keep text-sm font-medium py-4">
            <div className="flex justify-between">
                <TypographyH1 className="text-3xl!">개인정보 처리방침 - v1</TypographyH1>
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                        >
                            {value ? versions.find((version) => version.value === value)?.label : "이전 버전..."}
                            <ChevronsUpDown className="opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandList>
                                <CommandGroup>
                                    {versions.map((version) => (
                                        <Link key={version.value} href={`/privacy/${version.value}`}>
                                            <CommandItem
                                                value={version.value}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                {version.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        value === version.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        </Link>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
            </div>
            <TypographyP>
                코딩마스터(이하 &quot;코마&quot;라고 합니다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보 및
                권익을 보호하고 개인정보와 관련된 정보주체의 고충을 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                처리방침을 수립ㆍ공개합니다.
            </TypographyP>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">
                제1조 : 개인정보의 수집항목 및 처리목적
            </TypographyH2>
            <TypographyP>
                코마는 회원가입, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집하며, 수집한 개인정보를 다음의 목적을
                위해 활용합니다.
            </TypographyP>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>목적</TableHead>
                        <TableHead>항목</TableHead>
                        <TableHead>기간</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {infos.map((info, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{info.purpose}</TableCell>
                            <TableCell>{info.item}</TableCell>
                            <TableCell>{info.duration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제2조 : 개인정보의 제3자 제공</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        코마는 원칙적으로 이용자의 개인정보를 (개인정보의 처리 목적)에서 명시한 범위 내에서 처리하며,
                        이용자의 사전 동의 없이는 본래의 범위를 초과하여 처리하거나 제3자에게 제공하지 않습니다. 단,
                        아래의 경우는 예외로 합니다.
                    </TypographyP>
                    <ul className="list-disc ml-4">
                        <li>
                            <TypographyP>이용자가 사전에 제3자 제공 및 공개에 동의한 경우</TypographyP>
                        </li>
                        <li>
                            <TypographyP>
                                법률에 특별한 규정이 있거나 법령 상 의무를 준수하기 위하여 불가피한 경우
                            </TypographyP>
                        </li>
                        <li>
                            <TypographyP>
                                공공기관이 법령 등에서 정하는 소관 업무의 수행을 위하여 불가피한 경우
                            </TypographyP>
                        </li>
                    </ul>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제3조 : 개인정보처리의 위탁</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        코마는 원활한 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        코마는 위탁계약 체결 시 개인정보 보호법 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지,
                        기술적ㆍ관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리ㆍ감독, 손해배상 등 책임에 관한 사항을
                        계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보 처리방침을 통하여 공개하도록
                        하겠습니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">
                제4조 : 정보주체와 법정대리인의 권리·의무 및 그 행사방법
            </TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        정보의 주체는 코마에 대하여 언제든지 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
                    </TypographyP>
                    <ol className="list-decimal ml-4">
                        <li>
                            <TypographyP>개인정보의 열람 요구</TypographyP>
                        </li>
                        <li>
                            <TypographyP>개인정보의 오류 등이 있을 경우 정정 요구</TypographyP>
                        </li>
                        <li>
                            <TypographyP>개인정보의 삭제 요구</TypographyP>
                        </li>
                        <li>
                            <TypographyP>개인정보의 처리정지 요구</TypographyP>
                        </li>
                    </ol>
                </li>
                <li>
                    <TypographyP>
                        제1항에 따른 권리 행사는 코마에 대하여 방문, 서면, 전화, 전자우편 등을 통하여 하실 수 있으며
                        코마는 이에 대해 지체 없이 조치하겠습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        정보주체가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 코마는 정정 또는 삭제를
                        완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수
                        있습니다. 이 경우 개인정보보호법 시행규칙 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제5조 : 개인정보의 파기</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        코마는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이
                        해당 개인정보를 파기합니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        정보주체로부터 동의 받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른
                        법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보(또는 개인정보파일)를 별도의
                        데이터베이스로 옮기거나 보관 장소를 달리하여 보존합니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        코마는 원칙적으로 제1조에 명시된 보유 기간이 경과되는 경우 지체없이 개인정보를 파기합니다.
                    </TypographyP>
                    <TypographyP>
                        전자적 형태로 기록ㆍ저장된 개인정보는 기록을 재생할 수 없도록 기술적 방식으로 파기하며, 비전자
                        형태(종이 등)의 기록물은 분쇄기로 파쇄하거나 소각을 통하여 파기합니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제6조 : 개인정보의 안정성 확보조치</TypographyH2>
            <TypographyP>
                코마는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적·관리적 및 물리적 조치를 하고
                있습니다.
            </TypographyP>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        개인정보의 암호화
                        <br />
                        정보주체의 비밀번호는 암호화되어 저장 및 관리되고 있어 본인만이 알 수 있으며, 중요한 데이터는
                        전송데이터를 암호화하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        해킹 등에 대비한 기술적 대책
                        <br />
                        코마는 해킹이나 컴퓨터 바이러스 등에 의한 개인정보 유출 및 훼손을 막기 위하여 보안프로그램을
                        설치하고 주기적인 갱신/점검을 하며 외부로부터 접근이 통제된 구역에 시스템을 설치하고
                        기술적/물리적으로 감시 및 차단하고 있습니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제7조 : 개인정보 보호책임자</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        코마는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리
                        및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 보호담당자를 지정하고 있습니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제8조 : 개인정보에 관한 민원</TypographyH2>
            <TypographyP>
                코마는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호 책임자를 지정하고 있습니다.
                <br />
                이용자는 사이트의 서비스를 이용하며 발생하는 개인정보 보호와 관련된 모든 민원을 개인정보관리책임자에게
                신고하실 수 있습니다.
            </TypographyP>
            <TypographyP>
                <strong>개인정보 보호 책임자</strong>
            </TypographyP>
            <TypographyUnlisted>
                <li>성명: 김연지</li>
                <li>전화번호 : 010 7117 9392</li>
                <li>전자메일 주소: 01071179392ky@gmail.com</li>
            </TypographyUnlisted>
            <TypographyP>
                기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
            </TypographyP>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>개인정보 침해신고센터 (privacy.kisa.or.kr; ☎ 118)</TypographyP>
                </li>
                <li>
                    <TypographyP>개인정보 분쟁조정위원회 (www.kopico.go.kr; ☎ 1833-6972)</TypographyP>
                </li>
                <li>
                    <TypographyP>대검찰청 사이버수사과 (spo.go.kr; ☎ 1301)</TypographyP>
                </li>
                <li>
                    <TypographyP>경찰청 사이버수사국 (ecrm.cyber.go.kr; ☎ 182)</TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제9조 : 개인정보 처리방침 변경</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        이 개인정보 처리방침은 아래 고지된 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가,
                        삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    </TypographyP>
                    <TypographyUnlisted>
                        <li>
                            <TypographyP>공고일자: 2025년 8월 14일 </TypographyP>
                        </li>
                        <li>
                            <TypographyP>시행일자: 2025년 8월 14일</TypographyP>
                        </li>
                    </TypographyUnlisted>
                </li>
            </ol>
        </div>
    );
}
