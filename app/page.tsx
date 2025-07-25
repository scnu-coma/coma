import HeroSection from "@/components/hero-section";

export default function Home() {
    return (
        <div className="lg:px-16 px-5 items-center justify-items-center min-h-screen pb-20 gap-16">
            <main className="flex flex-col items-center sm:items-start">
                <HeroSection />
            </main>
        </div>
    );
}
