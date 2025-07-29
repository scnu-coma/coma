export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="xl:w-6xl xl:mx-auto lg:mx-16 mx-5">{children}</div>;
}
