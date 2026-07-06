import { BookOpen, Database, Users, MapPinned } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-carbon-50">
      <section className="border-b border-carbon-200 bg-white">
        <div className="page-shell py-14">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-brand-700">About Project</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight text-carbon-950 sm:text-5xl">
            Green-Urban Balance Index (GUBI) Malang Raya
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-carbon-600">
            Website ini dirancang sebagai platform informasi dan edukasi geografi berbasis WebGIS. Masyarakat umum,
            akademisi, dan pembuat kebijakan dapat membaca NDVI, NDBI, LST, GCI, UPI, dan GUBI untuk memahami
            ketahanan sosial-lingkungan di Malang Raya.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-5 py-12 md:grid-cols-2 xl:grid-cols-4">
        <AboutCard
          icon={Users}
          title="Tujuan Literasi"
          description="Membantu publik memahami ketahanan lingkungan, paparan panas, dan peran ruang hijau dengan bahasa sederhana."
        />
        <AboutCard
          icon={MapPinned}
          title="Pendekatan WebGIS"
          description="Menggabungkan Story Map, WebGIS, Quiz, dan Simulation untuk melatih literasi spasial dan pengambilan keputusan."
        />
        <AboutCard
          icon={BookOpen}
          title="Materi Edukatif"
          description="Konten mendukung peningkatan kesadaran warga mengenai konservasi vegetasi, tata guna lahan, adaptasi panas, dan resiliensi perkotaan."
        />
        <AboutCard
          icon={Database}
          title="Akurasi Parameter"
          description="Mengintegrasikan data penginderaan jauh (NDVI, NDBI, LST) terbaru untuk menyajikan analisis ketahanan lingkungan yang presisi."
        />
      </section>
    </div>
  );
}

function AboutCard({ icon: Icon, title, description }) {
  return (
    <article className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft">
      <Icon className="text-brand-700" size={26} aria-hidden="true" />
      <h2 className="mt-4 text-xl font-extrabold text-carbon-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-carbon-600">{description}</p>
    </article>
  );
}
