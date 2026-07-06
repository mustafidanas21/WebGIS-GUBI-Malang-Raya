export const imageAssets = {
  malangPanorama: {
    src: '/assets/photos/malang-panorama.jpg',
    fallback: '/assets/photos/gubi-map-preview.png',
    alt: 'Panorama Kota Malang dengan lanskap urban dan pegunungan.',
  },
  vegetationCanopy: {
    src: '/assets/photos/vegetation-canopy.jpg',
    alt: 'Kanopi vegetasi hijau sebagai contoh NDVI tinggi dan ketahanan ekosistem.',
  },
  urbanBuiltUp: {
    src: '/assets/photos/urban-built-up.jpg',
    alt: 'Kawasan kota padat bangunan sebagai contoh tekanan pembangunan dan NDBI tinggi.',
  },
  urbanPressure: {
    src: '/assets/photos/construction-urban-pressure.jpg',
    alt: 'Aktivitas konstruksi dan permukaan keras sebagai contoh tekanan urban dan paparan panas.',
  },
  gubiMapPreview: {
    src: '/assets/photos/gubi-map-preview.png',
    alt: 'Preview peta Green-Urban Balance Index untuk membaca ketahanan hijau-urban.',
  },
  dashboardAnalysis: {
    src: '/assets/photos/dashboard-analysis.jpg',
    alt: 'Lembar grafik analisis sebagai ilustrasi pembacaan data dan kuis.',
  },
};

export function handleImageFallback(event, fallbackSrc) {
  if (!fallbackSrc || event.currentTarget.dataset.fallbackApplied === 'true') return;

  event.currentTarget.dataset.fallbackApplied = 'true';
  event.currentTarget.src = fallbackSrc;
}
