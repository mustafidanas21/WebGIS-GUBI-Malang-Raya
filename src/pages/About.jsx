import { BookOpen, Database, GraduationCap, MapPinned } from 'lucide-react';

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
            Website ini dirancang sebagai media pembelajaran geografi berbasis WebGIS. Siswa, guru, dan masyarakat
            dapat belajar membaca peta, memahami NDVI, NDBI, LST, GCI, UPI, dan menafsirkan keseimbangan
            kapasitas ekologis dengan tekanan urbanisasi di Malang Raya.
          </p>
        </div>
      </section>

      <section className="page-shell grid gap-5 py-12 md:grid-cols-2 xl:grid-cols-4">
        <AboutCard
          icon={GraduationCap}
          title="Target Belajar"
          description="Membantu siswa SMP/SMA memahami keseimbangan ruang hijau dan pembangunan kota dengan bahasa sederhana."
        />
        <AboutCard
          icon={MapPinned}
          title="Pendekatan WebGIS"
          description="Menggabungkan Story Map, WebGIS, Quiz, dan Simulation sebagai alur belajar yang runtut."
        />
        <AboutCard
          icon={BookOpen}
          title="Materi Edukatif"
          description="Konten disusun untuk mendukung diskusi kelas, observasi lingkungan, dan literasi spasial."
        />
        <AboutCard
          icon={Database}
          title="Status Data"
          description="Seluruh data saat ini dummy sehingga aman untuk lomba dan mudah diganti dengan data valid."
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
