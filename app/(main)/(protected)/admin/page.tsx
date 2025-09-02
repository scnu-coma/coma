import { columns } from "@/components/admin/column";
import { DataTable, Member } from "@/components/admin/data-table";

// 샘플 데이터
// 실제 데이터는 supabase에서 가져오세요.
const data: Member[] = [
    {
        name: "김연지",
        authority: "인증 대기",
        email: "ken99@example.com",
    },
    {
        name: "김지원",
        authority: "부원",
        email: "Abe45@example.com",
    },
    {
        name: "고재우",
        authority: "운영진", // 간부진
        email: "Monserrat44@example.com",
    },
    {
        name: "박시현",
        authority: "관리자",
        email: "Silas22@example.com",
    },
];

export default function Page() {
    return <DataTable columns={columns} data={data} />;
}
