import { malangCenter, parameterMeta } from './gubiAnalysisData.js';

export { malangCenter };

const parameterById = Object.fromEntries(parameterMeta.map((parameter) => [parameter.id, parameter]));

export const storyChapters = [
  {
    id: 'malang-raya',
    number: '01',
    kicker: 'Wilayah Studi',
    title: 'Mengenal Malang Raya',
    parameterId: 'gubi',
    summary:
      'Malang Raya mencakup Kota Malang, Kabupaten Malang, dan Kota Batu. Setiap wilayah memiliki kombinasi ruang hijau, kawasan terbangun, dan suhu permukaan yang memengaruhi ketahanan lingkungan.',
    fact: 'Tahukah kamu? Wilayah yang sama-sama ramai bisa memiliki kemampuan berbeda dalam menghadapi panas, genangan, dan tekanan pembangunan.',
    visualLabel: 'Nilai GUBI',
    center: malangCenter,
    zoom: 11,
    focusRegionId: 'lowokwaru',
  },
  {
    id: 'keseimbangan-kota',
    number: '02',
    kicker: 'Ide Utama',
    title: 'Mengapa Ketahanan Kota Penting?',
    parameterId: 'gubi',
    summary:
      'Kota yang tangguh perlu menyeimbangkan kapasitas ekologis dan tekanan urbanisasi. GUBI membantu membaca apakah ruang hijau cukup kuat mendukung kenyamanan dan keselamatan warga.',
    fact: 'Tahukah kamu? Ketahanan kota bukan berarti tidak boleh membangun, tetapi pembangunan perlu tetap memberi ruang bagi fungsi ekologis.',
    visualLabel: 'Ketahanan hijau-urban',
    center: [-7.9772, 112.6306],
    zoom: 12,
    focusRegionId: 'klojen',
  },
  {
    id: 'ndvi-gci',
    number: '03',
    kicker: 'Kapasitas Ekologis',
    title: 'Vegetasi dan Ketahanan Ekosistem (NDVI ke GCI)',
    parameterId: 'gci',
    summary:
      'NDVI membaca kehijauan vegetasi. Dalam GUBI, NDVI menjadi GCI untuk memperkirakan kekuatan ruang hijau dalam menjaga kualitas lingkungan.',
    fact: parameterById.ndvi.fact,
    visualLabel: 'GCI dari NDVI',
    center: [-7.9396, 112.5919],
    zoom: 13,
    focusRegionId: 'rth-barat',
  },
  {
    id: 'ndbi-lst-upi',
    number: '04',
    kicker: 'Tekanan Urban',
    title: 'Tekanan Urban dan Paparan Panas (NDBI + LST ke UPI)',
    parameterId: 'upi',
    summary:
      'NDBI menunjukkan kawasan terbangun, sedangkan LST menunjukkan suhu permukaan. Keduanya membentuk UPI untuk membaca tekanan pembangunan dan risiko panas kota.',
    fact: parameterById.upi.fact,
    visualLabel: 'UPI dari NDBI dan LST',
    center: [-7.9772, 112.6306],
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
      'Rumus inti penelitian adalah GUBI = GCI - UPI. Jika GCI lebih besar, wilayah lebih kuat secara ekologis. Jika UPI lebih besar, tekanan urban perlu dikurangi.',
    fact: 'Tahukah kamu? GUBI berada pada rentang -1 sampai 1: negatif berarti tekanan urban dominan, nol relatif seimbang, positif berarti kapasitas ekologis dominan.',
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
      'Peta GUBI membantu membandingkan wilayah untuk keputusan spasial. Warna hijau menunjukkan kapasitas ekologis lebih kuat, kuning relatif seimbang, dan oranye menunjukkan tekanan urban lebih dominan.',
    fact: parameterById.gubi.fact,
    visualLabel: 'Kategori GUBI',
    center: malangCenter,
    zoom: 11,
    focusRegionId: 'batu-wisata',
  },
  {
    id: 'meningkatkan-gubi',
    number: '07',
    kicker: 'Aksi Ketahanan',
    title: 'Bagaimana Meningkatkan Ketahanan GUBI?',
    parameterId: 'gubi',
    summary:
      'Nilai GUBI dapat ditingkatkan dengan memperkuat vegetasi, menjaga ruang terbuka hijau, mengendalikan kawasan terbangun, dan mengurangi paparan panas.',
    fact: 'Tahukah kamu? Aksi sederhana di pekarangan rumah atau lingkungan rukun warga (RW), seperti menanam pohon dan mengurangi permukaan beton keras, sangat berkontribusi pada resiliensi lingkungan perkotaan.',
    visualLabel: 'Skenario mitigasi',
    center: [-7.9396, 112.5919],
    zoom: 12,
    focusRegionId: 'rth-barat',
  },
];
