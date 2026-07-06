import { BookOpen, Building2, CircleHelp, Leaf, Map, MapPinned, SlidersHorizontal, Thermometer, Trees, Users } from 'lucide-react';

export const malangReasons = [
  {
    title: 'Wilayah Studi Beragam',
    description: 'Malang Raya memiliki pusat kota, kawasan pinggiran, ruang hijau, dan wilayah wisata yang cocok untuk membaca ketahanan lingkungan.',
    icon: MapPinned,
  },
  {
    title: 'Dekat dengan Masyarakat',
    description: 'Isu panas perkotaan, ketersediaan ruang hijau, dan kenyamanan lingkungan terasa sangat nyata bagi kehidupan sehari-hari masyarakat Malang Raya.',
    icon: Users,
  },
  {
    title: 'Ruang Hijau dan Urbanisasi',
    description: 'Perubahan vegetasi, kawasan terbangun, dan suhu permukaan dapat dipelajari sebagai dasar mitigasi dan adaptasi kota.',
    icon: Trees,
  },
];

export const balanceReasons = [
  {
    title: 'Kapasitas Ekologis',
    description: 'NDVI membantu membaca kesehatan vegetasi yang mendukung perlindungan ekosistem dan infrastruktur hijau.',
    icon: Leaf,
  },
  {
    title: 'Tekanan Urban',
    description: 'NDBI dan LST membantu membaca tekanan pembangunan, paparan panas, dan kebutuhan adaptasi iklim perkotaan.',
    icon: Building2,
  },
  {
    title: 'Literasi Spasial',
    description: 'Peta membantu masyarakat umum membandingkan ketahanan wilayah dan memahami keputusan tata ruang untuk resiliensi bersama.',
    icon: Map,
  },
];

export const researchGoals = [
  'Memahami NDVI sebagai petunjuk kesehatan vegetasi dan ketahanan ekosistem.',
  'Memahami NDBI dan LST sebagai petunjuk tekanan pembangunan serta paparan panas perkotaan.',
  'Menafsirkan GCI, UPI, dan GUBI untuk membaca keseimbangan hijau-urban.',
  'Menyusun ide mitigasi sederhana untuk meningkatkan ketahanan sosial dan lingkungan.',
];

export const quickStats = [
  { label: 'Parameter Utama', value: 3, suffix: '' },
  { label: 'Indeks Turunan', value: 3, suffix: '' },
  { label: 'Kecamatan Malang Raya', value: 41, suffix: '' },
  { label: 'Langkah Eksplorasi', value: 4, suffix: '' },
];

export const chartData = [
  { zone: 'Urban Sangat Dominan', value: 2 },
  { zone: 'Urban Dominan', value: 3 },
  { zone: 'Seimbang', value: 18 },
  { zone: 'Hijau Dominan', value: 17 },
  { zone: 'Hijau Sangat Dominan', value: 1 },
];

export const previews = [
  {
    title: '1. Story Map',
    description: 'Memahami Malang Raya, NDVI, NDBI, LST, GCI, UPI, dan hubungan spasialnya dengan ketahanan kota.',
    href: '/storymap',
    icon: BookOpen,
    label: 'Buka Story Map',
  },
  {
    title: '2. WebGIS',
    description: 'Mengeksplorasi layer GUBI, NDVI, NDBI, LST, GCI, dan UPI untuk mendukung pengambilan keputusan spasial.',
    href: '/webgis',
    icon: Map,
    label: 'Jelajahi WebGIS',
  },
  {
    title: '3. Quiz',
    description: 'Menguji pemahaman publik tentang indikator lingkungan, tekanan urban, dan alasan di balik interpretasi peta.',
    href: '/quiz',
    icon: CircleHelp,
    label: 'Mulai Quiz',
  },
  {
    title: '4. Simulation',
    description: 'Mencoba skenario vegetasi, kawasan terbangun, dan suhu permukaan untuk melihat dampak kebijakan pada GUBI.',
    href: '/simulation',
    icon: SlidersHorizontal,
    label: 'Buka Simulation',
  },
];

export const methodCards = [
  { label: 'NDVI', text: 'Tingkat kehijauan vegetasi', icon: Leaf },
  { label: 'NDBI', text: 'Kawasan terbangun', icon: Building2 },
  { label: 'LST', text: 'Suhu permukaan', icon: Thermometer },
];
