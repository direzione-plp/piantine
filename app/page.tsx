import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/HowItWorks';
import SampleDiagnoses from '@/components/landing/SampleDiagnoses';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { ScanLine } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <SampleDiagnoses />
      <Testimonials />
      <FAQ />

      {/* CTA banner */}
      <section className="py-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-green-950 mb-6">
            Pronto a diagnosticare la tua prima pianta?
          </h2>
          <p className="text-stone-500 text-lg mb-10">
            Nessun account richiesto. Apri la fotocamera, scansiona la tua pianta e ottieni risposte in pochi secondi.
          </p>
          <Link href="/scan">
            <Button size="xl" className="gap-3">
              <ScanLine className="w-6 h-6" />
              Inizia la tua prima scansione
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
