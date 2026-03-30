import HeroSection from "@/components/hero-section";
import QuickMenus from "@/components/quick-menus";

export default function Home() {
    return (
        <div className="lg:px-16 px-5 items-center justify-items-center min-h-screen gap-16">
            <main className="flex flex-col items-center sm:items-start gap-4">
                <HeroSection />
                <QuickMenus />
            </main>
        </div>
    );
}
