export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="lg:w-6xl mx-auto">{children}</div>;
}
