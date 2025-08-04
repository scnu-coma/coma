// 부원 모집 관리

// 이 파일의 설정에 따라 변경되는 것
// 1. 모든 '부원 모집 중'버튼들의 활성화 여부
// 2. 모든 '부원 모집 중'버튼들에 연결된 URL의 자동 수정

// 메인화면의 일정은 자동으로 변경되지 않습니다. data/index-events.tsx에서 관리하세요.
// 원한다면 로직을 개선하셔도 좋습니다.

// 부원 모집 시작일, 종료일 (수동으로 변경하세요)
// 시작일 자정부터 종료일 다음날의 자정까지로 설정됩니다.
const term: Date[] = [new Date("2025-08-05"), new Date("2025-09-10")];

/////////////////////////////////////
// 이하 코드는 임의로 수정하지 마세요. //
////////////////////////////////////

const start = term[0];
const end = term[1];

// 한국 기준 자정으로 설정 (UTC시간대를 적용하여 Locale 설정이 달라도 일관적으로 적용됨)
start.setUTCDate(start.getDate() - 1);
start.setUTCHours(15, 0, 0, 0);
end.setUTCHours(15, 0, 0, 0);

const now = new Date();
const month = now.getMonth() + 1;
const year = now.getFullYear();
// 3월 ~ 8월 : 올해 1학기
// 9월 ~ 내년 2월 : 올해 2학기로 설정

////////////////////////////////////
// 디버깅 목적으로 2학기가 6월부터로 설정되어있다. 실제 배포시에는 9월로 고쳐야 한다.
////////////////////////////////////
export const recruitmentTerm: number = month > 2 && month < 6 ? 1 : 2;
export const recruitmentYear: number = month <= 2 ? year - 1 : year;

export const recruitmentOpen = () => {
    const now = new Date();
    if (start <= now && now <= end) return true;
    else return false;
};
