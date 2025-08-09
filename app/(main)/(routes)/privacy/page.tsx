// 코마 상황에 맞게 내용 수정 필요!!

import { TypographyH1, TypographyH2, TypographyP } from "@/components/typography/typography";

export default function Page() {
    return (
        <div className="break-keep text-sm font-medium py-4">
            <TypographyH1 className="text-3xl!">개인정보 처리방침</TypographyH1>
            <TypographyP>
                코딩마스터(이하 &quot;코마&quot;라고 합니다)는 개인정보 보호법 제30조에 따라 정보주체의 개인정보 및
                권익을 보호하고 개인정보와 관련된 정보주체의 고충을 원활하게 처리할 수 있도록 하기 위하여 다음과 같이
                처리방침을 수립ㆍ공개합니다.
            </TypographyP>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제1조 : 개인정보의 처리 목적</TypographyH2>
            <TypographyP>코마는 수집한 개인정보를 다음의 목적을 위해 활용합니다.</TypographyP>
            <ul className="list-disc ml-4">
                <li>
                    <TypographyP>회원 관리(본인 확인, 가입의사 확인, 서비스 이용, 민원처리 등)</TypographyP>
                </li>
                <li>
                    <TypographyP>서비스 제공(게시글 등록, 문의사항 응대 등)</TypographyP>
                </li>
            </ul>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제2조 : 개인정보의 수집항목</TypographyH2>
            <TypographyP>
                코마는 회원가입, 문의, 서비스 이용 등을 위해 아래와 같은 개인정보를 수집합니다.
                <br />
                회원 탈퇴 시 즉시 파기합니다. <br />
                관련 법령에 따라 보존이 필요한 경우 해당 기간까지 보관합니다.
            </TypographyP>
            <ul className="list-disc ml-4">
                <li>
                    <TypographyP>필수항목 :</TypographyP>
                </li>
                <li>
                    <TypographyP>선택항목 :</TypographyP>
                </li>
            </ul>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제3조 : 개인정보의 제3자 제공</TypographyH2>
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
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제4조 : 개인정보처리의 위탁</TypographyH2>
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
                제5조 : 정보주체와 법정대리인의 권리·의무 및 그 행사방법
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
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제6조 : 개인정보의 파기</TypographyH2>
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
                    <TypographyP>개인정보 파기의 절차, 기한 및 방법은 다음과 같습니다.</TypographyP>
                    <ol className="list-decimal ml-4">
                        <li>
                            <TypographyP>
                                파기절차
                                <br />
                                코마는 파기하여야 하는 개인정보(또는 개인정보파일)에 대해 개인정보 파기계획을 수립하여
                                파기합니다. 파기 사유가 발생한 개인정보(또는 개인정보파일)을 선정하고, 개인정보
                                보호책임자의 승인받아 개인정보(또는 개인정보파일)를 파기합니다.
                            </TypographyP>
                        </li>
                        <li>
                            <TypographyP>
                                파기기한
                                <br />
                                이용자의 개인정보는 개인정보의 보유기간이 경과된 경우에는 보유기간의 종료일로부터 5일
                                이내에, 개인정보의 처리 목적 달성, 해당 서비스의 폐지 등 그 개인정보가 불필요하게 되었을
                                때에는 개인정보의 처리가 불필요한 것으로 인정되는 날로부터 5일 이내에 그 개인정보를
                                파기합니다.
                            </TypographyP>
                        </li>
                        <li>
                            <TypographyP>
                                파기방법
                                <br />
                                코마는 “공공기록물 관리에 관한 법률”을 준용하여 전자적 형태로 기록ㆍ저장된 개인정보는
                                기록을 재생할 수 없도록 기술적 방식으로 파기하며, 비전자 형태(종이 등)의 기록물은
                                분쇄기로 파쇄하거나 소각을 통하여 파기합니다.
                            </TypographyP>
                        </li>
                    </ol>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제7조 : 개인정보의 안정성 확보조치</TypographyH2>
            <TypographyP>
                코마는 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적·관리적 및 물리적 조치를 하고
                있습니다.
            </TypographyP>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        개인정보 취급 직원의 최소화 및 교육
                        <br />
                        개인정보를 취급하는 직원을 지정하고, 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을
                        시행하고 있습니다. 또한 취급 직원을 대상으로 안전한 관리를 위한 교육을 실시하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        정기적인 자체 감사 실시
                        <br />
                        개인정보 취급 관련 안정성 확보를 위해 정기적으로 자체 감사를 실시하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        내부관리계획의 수립 및 시행
                        <br />
                        개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고 시행하고 있습니다.
                    </TypographyP>
                </li>
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
                <li>
                    <TypographyP>
                        개인정보에 대한 접근 제한
                        <br />
                        개인정보를 처리하는 데이터베이스시스템에 대한 접근권한의 부여·변경·말소를 통하여 개인정보에 대한
                        접근통제를 위하여 필요한 조치를 하고 있으며 침입차단시스템을 이용하여 외부로부터의 무단 접근을
                        통제하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        접속기록의 보관 및 위변조 방지
                        <br />
                        개인정보처리시스템에 접속한 기록을 최소 6개월 이상 보관, 관리하고 있으며, 접속 기록이 위변조 및
                        도난, 분실되지 않도록 보안기능을 사용하고 있습니다.
                    </TypographyP>
                </li>
                <li>
                    <TypographyP>
                        비인가자에 대한 출입 통제
                        <br />
                        개인정보를 보관하고 있는 물리적 보관 장소를 별도로 두고 이에 대해 출입통제 절차를 수립, 운영하고
                        있습니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제8조 : 개인정보 보호책임자</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        코마는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리
                        및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자 및 보호담당자를 지정하고 있습니다.
                    </TypographyP>
                </li>
            </ol>
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제9조 : 권익침해 구제방법</TypographyH2>
            <TypographyP>
                정보주체께서는 아래의 기관에 대하여 개인정보 침해에 대한 피해구제, 상담 등을 문의하실 수 있습니다.
                <br />
                아래의 기관은 코마와는 별개의 기관으로서, 코마의 자체적인 개인정보 불만처리, 피해구제 결과에 만족하지
                못하시거나 보다 자세한 도움이 필요하시면 문의하여 주시기 바랍니다.
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
            <TypographyH2 className="mt-12 text-lg font-extrabold!">제10조 : 개인정보 처리방침 변경</TypographyH2>
            <ol className="list-decimal ml-4">
                <li>
                    <TypographyP>
                        이 개인정보 처리방침은 아래 고지된 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가,
                        삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
                    </TypographyP>
                    <ul className="list-disc ml-4">
                        <li>
                            <TypographyP>공고일자: 2025년 9월 1일 </TypographyP>
                        </li>
                        <li>
                            <TypographyP>시행일자: 2025년 9월 1일</TypographyP>
                        </li>
                    </ul>
                </li>
                <li>
                    <TypographyP>이전의「개인정보 처리방침」은 아래에서 확인하실 수 있습니다.</TypographyP>
                    <ul className="list-disc ml-4">
                        <li>
                            <TypographyP>없음</TypographyP>
                        </li>
                    </ul>
                </li>
            </ol>
        </div>
    );
}
