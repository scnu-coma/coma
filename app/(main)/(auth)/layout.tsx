export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="max-w-lg mx-auto px-5">{children}</div>;
}
