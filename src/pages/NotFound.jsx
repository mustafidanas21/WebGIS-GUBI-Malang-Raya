import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-shell grid min-h-[60vh] place-items-center py-16">
      <div className="max-w-xl text-center">
        <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-brand-700">404</p>
        <h1 className="mt-3 text-3xl font-extrabold text-carbon-950">Halaman tidak ditemukan</h1>
        <p className="mt-4 text-sm leading-7 text-carbon-600">
          Alamat yang dibuka belum tersedia di project ini.
        </p>
        <Link
          to="/"
          className="focus-ring mt-6 inline-flex rounded-md bg-carbon-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-700"
        >
          Kembali ke Home
        </Link>
      </div>
    </section>
  );
}
