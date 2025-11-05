"use client";
import { columns } from "@/components/admin/column";
import { DataTable, Member } from "@/components/admin/data-table";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function Page() {
    const [userData, setData] = useState<Member[]>([]);
    async function fetchData() {
        const { data } = await supabase.from("users").select("name,major,student_id,grade,phone,user_role");
        if (data) setData(data);
    }
    useEffect(() => {
        fetchData();
    }, []);

    // 회원정보 변경사항 실시간 반영
    useEffect(() => {
        const channel = supabase
            .channel("members_updates")
            .on("postgres_changes", { event: "*", schema: "public", table: "users" }, (payload) => {
                if (payload.eventType === "INSERT") {
                    const newData = payload.new as Member;
                    setData((prev) => [newData, ...prev]);
                } else if (payload.eventType === "UPDATE") {
                    const updatedData = payload.new as Member;
                    setData((prev) =>
                        prev.map((data) => (data.student_id === updatedData.student_id ? updatedData : data))
                    );
                } else if (payload.eventType === "DELETE") {
                    const deletedData = payload.old as Member;
                    setData((prev) => prev.filter((data) => data.student_id !== deletedData.student_id));
                }
            })
            .subscribe();
        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return <DataTable columns={columns} data={userData} />;
}
