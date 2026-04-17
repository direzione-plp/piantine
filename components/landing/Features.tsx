'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: '🍂',
    title: 'Rileva le foglie gialle',
    desc: 'Identifica l\'ingiallimento causato da eccesso di acqua, carenza di nutrienti o invecchiamento naturale.',
  },
  {
    icon: '💧',
    title: 'Individua l\'annaffiatura eccessiva',
    desc: 'Intercetta i segnali di stress alle radici e suolo troppo bagnato prima che diventino seri.',
  },
  {
    icon: '🏜️',
    title: 'Riconosci siccità e stress da luce',
    desc: 'Scopri bordi secchi e macchie sbiancate che segnalano sete o troppa esposizione al sole.',
  },
  {
    icon: '🌿',
    title: 'Ricevi consigli di cura su misura',
    desc: 'Istruzioni pratiche e amichevoli su annaffiatura, luce, umidità e molto altro.',
  },
  {
    icon: '🐛',
    title: 'Allerta precoce parassiti',
    desc: 'Individua i piccoli intrusi in anticipo — prima che si diffondano a tutta la tua collezione.',
  },
  {
    icon: '📈',
    title: 'Monitora la salute nel tempo',
    desc: "Salva le scansioni e segui il percorso di salute della tua pianta migliorare con le tue cure.",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-sm font-bold uppercase tracking-widest text-orange-500">
            Cosa rileva Plant Doctor
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-green-950 mt-3">
            Scopri cosa sta davvero succedendo
          </h2>
          <p className="text-stone-500 mt-4 max-w-xl mx-auto text-lg">
            Dai segnali precoci sottili ai sintomi evidenti — la nostra analisi copre i problemi di salute più comuni delle piante.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl mb-4">
                {f.icon}
              </div>
              <h3 className="font-bold text-green-950 text-lg mb-2">{f.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
