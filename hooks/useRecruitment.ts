"use client";

import { useEffect, useState } from "react";

export function useRecruitment() {
    const [isOpen, setIsOpen] = useState(false);
    const [year, setYear] = useState(2025);
    const [term, setTerm] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/recruitment/settings");
                if (res.ok) {
                    const data = await res.json();
                    setIsOpen(data.is_actually_open);
                    setYear(data.year);
                    setTerm(data.term);
                }
            } catch (error) {
                console.error("Recruitment settings fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, []);

    return { isOpen, year, term, isLoading };
}
