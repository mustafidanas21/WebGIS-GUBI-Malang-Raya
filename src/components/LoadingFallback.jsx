export default function LoadingFallback() {
  return (
    <div className="grid min-h-[50vh] place-items-center bg-carbon-50 px-4" role="status" aria-live="polite">
      <div className="text-center">
        <div className="mx-auto size-11 animate-spin rounded-full border-4 border-carbon-200 border-t-brand-600" />
        <p className="mt-4 text-sm font-bold text-carbon-700">Memuat halaman...</p>
      </div>
    </div>
  );
}
