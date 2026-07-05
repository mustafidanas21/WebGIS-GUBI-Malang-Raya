import { analysisRegions, gubiGeoJson, malangCenter, parameterMeta } from './pollutionAnalysisData.js';

export { malangCenter, gubiGeoJson as pollutionGeoJson };

const parameterById = Object.fromEntries(parameterMeta.map((parameter) => [parameter.id, parameter]));

export const storyChapters = [
  {
    id: 'malang-raya',
    number: '01',
    kicker: 'Wilayah Studi',
    title: 'Mengenal Malang Raya',
    parameterId: 'gubi',
    summary:
      'Malang Raya mencakup Kota Malang, Kabupaten Malang, dan Kota Batu. Setiap wilayah memiliki kombinasi ruang hijau, kawasan terbangun, dan suhu permukaan yang berbeda.',
    fact: 'Tahukah kamu? Satu wilayah bisa terlihat sama-sama perkotaan, tetapi nilai keseimbangan hijaunya dapat berbeda.',
    visualLabel: 'Nilai GUBI',
    center: malangCenter,
    zoom: 11,
    focusRegionId: 'lowokwaru',
  },
  {
    id: 'keseimbangan-kota',
    number: '02',
    kicker: 'Ide Utama',
    title: 'Mengapa Keseimbangan Kota Penting?',
    parameterId: 'gubi',
    summary:
      'Kota berkelanjutan perlu menyeimbangkan kapasitas ekologis dan tekanan urbanisasi. GUBI membantu membaca apakah ruang hijau cukup kuat menghadapi tekanan pembangunan.',
    fact: 'Tahukah kamu? Keseimbangan kota bukan berarti tidak boleh membangun, tetapi pembangunan perlu tetap memberi ruang bagi fungsi ekologis.',
    visualLabel: 'Keseimbangan hijau-urban',
    center: analysisRegions[0].center,
    zoom: 12,
    focusRegionId: 'klojen',
  },
  {
    id: 'ndvi-gci',
    number: '03',
    kicker: 'Kapasitas Ekologis',
    title: 'Vegetasi dan Green Capacity (NDVI ke GCI)',
    parameterId: 'gci',
    summary:
      'NDVI membaca tingkat kehijauan vegetasi. Dalam pembelajaran ini, NDVI digunakan sebagai Green Capacity Index atau GCI dengan rentang 0 sampai 1.',
    fact: parameterById.ndvi.fact,
    visualLabel: 'GCI dari NDVI',
    center: analysisRegions[4].center,
    zoom: 13,
    focusRegionId: 'rth-barat',
  },
  {
    id: 'ndbi-lst-upi',
    number: '04',
    kicker: 'Tekanan Urban',
    title: 'Urbanisasi dan Urban Pressure (NDBI + LST ke UPI)',
    parameterId: 'upi',
    summary:
      'NDBI menunjukkan kawasan terbangun, sedangkan LST menunjukkan suhu permukaan. Keduanya digabung untuk membentuk Urban Pressure Index atau UPI.',
    fact: parameterById.upi.fact,
    visualLabel: 'UPI dari NDBI dan LST',
    center: analysisRegions[0].center,
    zoom: 13,
    focusRegionId: 'klojen',
  },
  {
    id: 'rumus-gubi',
    number: '05',
    kicker: 'Rumus Inti',
    title: 'Bagaimana GUBI Dihitung?',
    parameterId: 'gubi',
    summary:
      'Rumus inti penelitian adalah GUBI = GCI - UPI. Jika GCI lebih besar, nilai GUBI positif. Jika UPI lebih besar, nilai GUBI negatif.',
    fact: 'Tahukah kamu? GUBI berada pada rentang -1 sampai 1: negatif berarti tekanan urban dominan, nol berarti seimbang, positif berarti kapasitas ekologis dominan.',
    visualLabel: 'GUBI = GCI - UPI',
    center: malangCenter,
    zoom: 12,
    focusRegionId: 'sukun',
  },
  {
    id: 'peta-gubi',
    number: '06',
    kicker: 'Hasil WebGIS',
    title: 'Peta Green-Urban Balance Index',
    parameterId: 'gubi',
    summary:
      'Peta GUBI membantu membandingkan wilayah. Warna hijau menunjukkan kapasitas ekologis lebih kuat, warna kuning relatif seimbang, dan warna oranye menunjukkan tekanan urban lebih dominan.',
    fact: parameterById.gubi.fact,
    visualLabel: 'Kategori GUBI',
    center: malangCenter,
    zoom: 11,
    focusRegionId: 'batu-wisata',
  },
  {
    id: 'meningkatkan-gubi',
    number: '07',
    kicker: 'Aksi Berkelanjutan',
    title: 'Bagaimana Meningkatkan Nilai GUBI?',
    parameterId: 'gubi',
    summary:
      'Nilai GUBI dapat ditingkatkan dengan memperkuat vegetasi, menjaga ruang terbuka hijau, mengendalikan kawasan terbangun, dan menurunkan suhu permukaan.',
    fact: 'Tahukah kamu? Strategi kota hijau bisa dimulai dari sekolah: menanam pohon, membuat taman kecil, dan mengurangi permukaan keras.',
    visualLabel: 'Skenario peningkatan',
    center: analysisRegions[4].center,
    zoom: 12,
    focusRegionId: 'rth-barat',
  },
];
