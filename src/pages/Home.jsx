import { ArrowRight, BookOpen, Compass, MapPinned, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
  balanceReasons,
  chartData,
  malangReasons,
  previews,
  quickStats,
  researchGoals,
} from '../data/homeData.js';

export default function Home() {
  return (
    <div className="overflow-hidden bg-carbon-50">
      <HeroSection />
      <WhyMalangSection />
      <WhyBalanceSection />
      <ResearchGoalsSection />
      <StatsSection />
      <PreviewSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-carbon-950 text-white">
      <MapIllustration />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,34,35,0.94),rgba(27,34,35,0.72)_42%,rgba(27,34,35,0.22))]" />

      <div className="page-shell relative z-10 flex min-h-[calc(100vh-4rem)] items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 border-l-4 border-warning-300 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-warning-100 backdrop-blur">
            <Sparkles size={16} aria-hidden="true" />
            Green-Urban Balance Index Malang Raya
          </div>
          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Apakah Malang Raya masih seimbang antara ruang hijau dan pembangunan?
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-carbon-100 sm:text-lg">
            Identifikasi keseimbangan kapasitas ekologis dan tekanan urbanisasi untuk mendukung kota berkelanjutan.
            Pelajari hubungan ruang hijau dan perkembangan kota melalui Story Map, WebGIS, Quiz, dan Simulation.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/storymap"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-warning-300 px-5 py-3 text-sm font-extrabold text-carbon-950 transition hover:bg-warning-200"
            >
              Mulai Belajar
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link
              to="/webgis"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-white/40 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Jelajahi WebGIS
              <MapPinned size={18} aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WhyMalangSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Mengapa Kota Malang?"
          title="Kota pendidikan dengan dinamika ruang yang dekat dengan kehidupan siswa."
          description="Malang Raya dipilih karena memiliki pusat aktivitas, kawasan terbangun, vegetasi, dan mobilitas harian yang dapat diamati lewat peta."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {malangReasons.map((item, index) => (
            <InfoCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyBalanceSection() {
  return (
    <section className="bg-carbon-100 py-16 sm:py-20">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Mengapa Keseimbangan Kota Penting?"
            title="Kota berkelanjutan perlu menyeimbangkan ruang hijau dan tekanan urbanisasi."
            description="Siswa diajak melihat hubungan antara NDVI, NDBI, LST, GCI, UPI, dan nilai GUBI."
          />
          <div className="mt-8 grid gap-4">
            {balanceReasons.map((item, index) => (
              <InfoCard key={item.title} item={item} index={index} compact />
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
          className="overflow-hidden rounded-lg bg-carbon-950 shadow-soft"
        >
          <div className="h-[420px]">
            <LargeBalanceVisual />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResearchGoalsSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <SectionHeader
          eyebrow="Tujuan Penelitian"
          title="Dari membaca parameter menuju memahami keseimbangan kota."
          description="Website ini dirancang agar siswa dan guru memahami hubungan antarparameter, bukan hanya melihat warna peta."
        />
        <div className="grid gap-4">
          {researchGoals.map((goal, index) => (
            <motion.article
              key={goal}
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="flex gap-4 rounded-lg border border-carbon-200 bg-carbon-50 p-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-brand-700 text-lg font-extrabold text-white">
                {index + 1}
              </span>
              <p className="text-base font-semibold leading-7 text-carbon-700">{goal}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="bg-carbon-950 py-16 text-white sm:py-20">
      <div className="page-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <SectionHeader
            eyebrow="Statistik Singkat"
            title="Ringkasan awal untuk memancing rasa ingin tahu."
            description="Angka berikut masih menggunakan data dummy, tetapi struktur informasinya disiapkan untuk diganti dengan data asli."
            dark
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quickStats.map((item) => (
              <article key={item.label} className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
                <p className="text-4xl font-extrabold text-warning-200">
                  {item.value}
                  {item.suffix}
                </p>
                <p className="mt-2 text-sm font-bold text-carbon-200">{item.label}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-white/10 bg-white p-5 text-carbon-950 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-brand-700">
            <Compass size={18} aria-hidden="true" />
            Distribusi Kategori GUBI Dummy
          </div>
          <div className="mt-6 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 12, right: 16, left: -18, bottom: 0 }}>
                <XAxis dataKey="zone" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#21a98a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewSection() {
  return (
    <section className="bg-carbon-100 py-16 sm:py-20">
      <div className="page-shell">
        <SectionHeader
          eyebrow="Alur Pembelajaran"
          title="Empat langkah belajar yang runtut."
          description="Mulai dari konsep, lanjut ke eksplorasi data, uji pemahaman, lalu coba skenario kebijakan."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {previews.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.48, delay: index * 0.08 }}
              className="group overflow-hidden rounded-lg bg-white shadow-soft"
            >
              <div className="h-56 bg-carbon-900">
                <MiniMapVisual variant={index} />
              </div>
              <div className="p-6">
                <item.icon className="text-brand-700" size={26} aria-hidden="true" />
                <h3 className="mt-4 text-2xl font-extrabold text-carbon-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-carbon-600">{item.description}</p>
                <Link
                  to={item.href}
                  className="focus-ring mt-5 inline-flex items-center gap-2 rounded-md bg-carbon-950 px-4 py-3 text-sm font-bold text-white transition group-hover:bg-brand-700"
                >
                  {item.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ item, index, compact = false }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className={[
        'rounded-lg border border-carbon-200 bg-white p-5 shadow-soft',
        compact ? 'flex gap-4' : '',
      ].join(' ')}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-md bg-brand-100 text-brand-800">
        <item.icon size={24} aria-hidden="true" />
      </span>
      <div className={compact ? '' : 'mt-5'}>
        <h3 className="text-xl font-extrabold text-carbon-950">{item.title}</h3>
        <p className="mt-3 text-sm leading-7 text-carbon-600">{item.description}</p>
      </div>
    </motion.article>
  );
}

function SectionHeader({ eyebrow, title, description, dark = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.45 }}
      className="max-w-3xl"
    >
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
      <h2 className={['mt-3 text-3xl font-extrabold leading-tight sm:text-4xl', dark ? 'text-white' : 'text-carbon-950'].join(' ')}>
        {title}
      </h2>
      <p className={['mt-4 text-base leading-8', dark ? 'text-carbon-200' : 'text-carbon-600'].join(' ')}>
        {description}
      </p>
    </motion.div>
  );
}

function MapIllustration() {
  return (
    <div className="absolute inset-0 opacity-90" aria-hidden="true">
      <img
        src="/assets/illustrations/gubi-hero.svg"
        alt=""
        className="h-full w-full object-cover"
        draggable="false"
      />
    </div>
  );
}

function LargeBalanceVisual() {
  return (
    <img
      src="/assets/illustrations/balance-index.svg"
      alt=""
      className="h-full w-full object-cover"
      draggable="false"
    />
  );
}

function MiniMapVisual({ variant }) {
  const imageByVariant = [
    '/assets/illustrations/story-parameter.svg',
    '/assets/illustrations/gubi-hero.svg',
    '/assets/illustrations/learning-flow.svg',
    '/assets/illustrations/simulation-policy.svg',
  ];

  return (
    <div className="relative h-full overflow-hidden bg-carbon-900" aria-hidden="true">
      <img
        src={imageByVariant[variant] ?? imageByVariant[0]}
        alt=""
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        draggable="false"
      />
      <div className="absolute bottom-8 left-8 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-extrabold text-carbon-950">
        <BookOpen size={14} aria-hidden="true" />
        GUBI Learning
      </div>
    </div>
  );
}
