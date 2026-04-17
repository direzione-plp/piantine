import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-950 text-green-100 py-16 mt-24">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        <div>
          <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
            <span className="w-8 h-8 bg-green-700 rounded-xl flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </span>
            Plant Doctor
          </div>
          <p className="text-green-300 text-sm leading-relaxed">
            Il tuo compagno per la salute delle piante. Scansiona, diagnostica e prenditi cura delle tue piante con sicurezza.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Funzionalità</h3>
          <ul className="space-y-2 text-sm text-green-300">
            <li><Link href="/scan" className="hover:text-white transition-colors">Scanner Piante</Link></li>
            <li><Link href="/history" className="hover:text-white transition-colors">Storico Scansioni</Link></li>
            <li><Link href="/guide" className="hover:text-white transition-colors">Guida alla Cura</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-white mb-4">Chi siamo</h3>
          <p className="text-green-300 text-sm leading-relaxed">
            Plant Doctor utilizza l'analisi delle immagini basata su AI per rilevare i problemi più comuni delle piante e fornire consigli di cura personalizzati.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-12 pt-8 border-t border-green-800 text-center text-green-400 text-sm">
        © {new Date().getFullYear()} Plant Doctor. Fatto con 🌿 per gli amanti delle piante di tutto il mondo.
      </div>
    </footer>
  );
}
