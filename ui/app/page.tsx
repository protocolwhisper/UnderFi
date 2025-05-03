import { AppShowcase } from "@/components/app-showcase";
import { Features } from "@/components/features";
import Hero from "@/components/hero";
import { UseCases } from '@/components/use-cases';
import { FAQ } from '@/components/faq';
import { CTA } from '@/components/cta';

export default function Home() {
  return (
    <main className="relative">
      {/* Hero section with full viewport height */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="container relative z-10">
          <Hero />
        </div>
      </section>

      <Features />  
      <AppShowcase />
      <UseCases />
      <FAQ />
      <CTA />
    </main>
  );
}
