export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="lg:w-6xl mx-auto bg-amber-100">routes layout / {children}</div>;
}
