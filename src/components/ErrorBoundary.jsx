import { Link, useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
  const error = useRouteError();

  return (
    <main className="grid min-h-screen place-items-center bg-carbon-50 px-4 py-16">
      <section className="max-w-xl rounded-lg border border-carbon-200 bg-white p-6 text-center shadow-soft">
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-brand-700">Terjadi Kendala</p>
        <h1 className="mt-3 text-3xl font-extrabold text-carbon-950">Halaman belum bisa ditampilkan</h1>
        <p className="mt-4 text-sm leading-7 text-carbon-600">
          Coba kembali ke beranda. Jika ini terjadi saat presentasi, muat ulang halaman biasanya sudah cukup.
        </p>
        {error?.message ? <p className="mt-4 rounded-md bg-carbon-100 p-3 text-xs text-carbon-600">{error.message}</p> : null}
        <Link
          to="/"
          className="focus-ring mt-6 inline-flex rounded-md bg-carbon-950 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-brand-700"
        >
          Kembali ke Home
        </Link>
      </section>
    </main>
  );
}
