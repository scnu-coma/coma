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
    return <DataTable columns={columns} data={userData} />;
}
