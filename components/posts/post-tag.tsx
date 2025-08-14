import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function PostTag({ children }: Props) {
    return (
        <span className="font-medium text-center text-sm text-primary border border-neutral-200 w-fit lg:mx-4 lg:px-6 px-4 py-1 bg-background rounded-3xl">
            {children}
        </span>
    );
}
