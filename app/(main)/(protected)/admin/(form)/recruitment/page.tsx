import RecruitmentForm from "@/components/admin/recruitment/recruitment-form";
import Schedule from "@/components/admin/recruitment/schedule";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// 부원 모집 관리
export default function Page() {
    return (
        <>
            <div className="flex gap-4 text-sm mb-4">
                <div className="flex items-center space-x-2">
                    <Label htmlFor="recruitment-pause">모집 일시중지</Label>
                    <Switch id="recruitment-pause" />
                </div>
                <span>
                    현재 접수된 폼: <strong>0개</strong>
                </span>
                <span>현재 부원 모집 중이 아닙니다.</span>
                {/* <span>
                    모집 마감까지: <strong>00일 00시 00분 00초</strong> 남음
                </span> */}
            </div>
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                    {/* 모집 폼 작성 */}
                    <RecruitmentForm />
                </div>
                <div className="col-span-1">
                    {/* 학사일정, 모집 일정 설정, 지난 모집 일정 */}
                    <Schedule />
                </div>
            </div>
        </>
    );
}
