'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sofia M.',
    handle: '@sofia.greenlife',
    avatar: '🌱',
    text: 'Il mio ficus stava perdendo foglie da settimane. Plant Doctor ha individuato macchie fungine in pochi secondi e mi ha detto esattamente cosa fare. Tre settimane dopo — nuove gemme!',
  },
  {
    name: 'Giacomo K.',
    handle: '@giacomo.plantdad',
    avatar: '🪴',
    text: 'Pensavo di annaffiare troppo, ma Plant Doctor mi ha mostrato i segni dell\'annaffiatura insufficiente. Un cambio di vita per la mia collezione di monstera.',
  },
  {
    name: 'Elena R.',
    handle: '@elena.botanica',
    avatar: '🌿',
    text: 'Le istruzioni di cura sono chiarissime e amichevoli. Nessun gergo tecnico, nessun termine da esperto. Solo consigli pratici che funzionano davvero.',
  },
  {
    name: 'Marco D.',
    handle: '@marco.verde',
    avatar: '🌵',
    text: "L'ho usato su tutta la mia collezione del balcone. Ho individuato segni precoci di parassiti su due piante che pensavo stessero bene. La funzione di salvataggio è perfetta per monitorare i progressi.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-green-950 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-emerald-400">
            La community ci ama
          </span>
          <h2 className="text-4xl md:text-5xl font-black mt-3">
            Gli amanti delle piante si fidano di noi
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-green-100 text-sm leading-relaxed mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-800 rounded-full flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm">{t.name}</p>
                  <p className="text-green-400 text-xs">{t.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
