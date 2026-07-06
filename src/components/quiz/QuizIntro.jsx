import { motion } from 'framer-motion';
import { ArrowRight, BookOpenCheck, Leaf, Map } from 'lucide-react';

export default function QuizIntro({ totalQuestions, onStart }) {
  const highlights = [
    { icon: Map, label: 'Baca pola ruang' },
    { icon: Leaf, label: 'Pahami ketahanan' },
    { icon: BookOpenCheck, label: 'Belajar dari pembahasan' },
  ];

  return (
    <section className="page-shell py-10 sm:py-14">
      <div className="grid min-h-[68vh] gap-6 lg:grid-cols-[1fr_0.78fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <p className="inline-flex items-center rounded-md bg-brand-100 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-800">
            GUBI Learning Quiz
          </p>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight text-carbon-950 sm:text-5xl lg:text-6xl">
            Tantangan Green-Urban Balance Index
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-carbon-600 sm:text-lg">
            Jawab {totalQuestions} soal singkat tentang indikator GUBI dan hubungannya dengan ruang hijau,
            panas kota, serta ketahanan lingkungan.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            {highlights.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-md border border-carbon-200 bg-white px-3 py-2 text-sm font-bold text-carbon-700 shadow-soft"
              >
                <Icon size={17} aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={onStart}
            className="focus-ring mt-8 inline-flex items-center gap-2 rounded-md bg-carbon-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-soft"
          >
            Mulai Quiz
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -1 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft"
        >
          <div className="rounded-lg bg-carbon-950 p-5 text-white">
            <p className="text-sm font-extrabold text-warning-200">Misi belajar</p>
            <p className="mt-3 text-3xl font-extrabold">{totalQuestions} soal</p>
            <p className="mt-3 text-sm leading-6 text-carbon-200">
              Fokusnya bukan cepat-cepatan, tapi memahami alasan di balik data lingkungan dan keputusan spasial.
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {['NDVI', 'NDBI', 'LST', 'GUBI'].map((item) => (
              <div key={item} className="rounded-md bg-brand-50 p-4 text-center text-lg font-extrabold text-brand-900">
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
