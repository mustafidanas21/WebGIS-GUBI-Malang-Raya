import { BookOpen, Building2, CircleHelp, GraduationCap, Leaf, Map, MapPinned, SlidersHorizontal, Thermometer, Trees } from 'lucide-react';

export const malangReasons = [
  {
    title: 'Wilayah Studi Beragam',
    description: 'Malang Raya memiliki pusat kota, kawasan pinggiran, ruang hijau, dan wilayah wisata yang cocok untuk membandingkan nilai GUBI.',
    icon: MapPinned,
  },
  {
    title: 'Dekat dengan Siswa',
    description: 'Kota Malang, Kabupaten Malang, dan Kota Batu dekat dengan kehidupan pelajar sehingga konsep peta terasa nyata.',
    icon: GraduationCap,
  },
  {
    title: 'Ruang Hijau dan Urbanisasi',
    description: 'Perubahan vegetasi, kawasan terbangun, dan suhu permukaan dapat dipelajari sebagai pola geografi yang saling berhubungan.',
    icon: Trees,
  },
];

export const balanceReasons = [
  {
    title: 'Kapasitas Ekologis',
    description: 'NDVI membantu membaca tingkat kehijauan vegetasi yang kemudian digunakan sebagai Green Capacity Index.',
    icon: Leaf,
  },
  {
    title: 'Tekanan Urban',
    description: 'NDBI dan LST membantu membaca tekanan kawasan terbangun serta panas permukaan kota.',
    icon: Building2,
  },
  {
    title: 'Literasi Spasial',
    description: 'Peta membantu siswa melihat mengapa satu wilayah lebih seimbang, sementara wilayah lain lebih tertekan urbanisasi.',
    icon: Map,
  },
];

export const researchGoals = [
  'Memahami NDVI sebagai dasar Green Capacity Index (GCI).',
  'Memahami NDBI dan LST sebagai pembentuk Urban Pressure Index (UPI).',
  'Menafsirkan Green-Urban Balance Index setelah memahami hubungan GCI dan UPI.',
  'Menyusun ide untuk meningkatkan keseimbangan antara ruang hijau dan perkembangan kota.',
];

export const quickStats = [
  { label: 'Parameter Utama', value: 3, suffix: '' },
  { label: 'Indeks Turunan', value: 3, suffix: '' },
  { label: 'Wilayah Malang Raya', value: 8, suffix: '' },
  { label: 'Langkah Belajar', value: 4, suffix: '' },
];

export const chartData = [
  { zone: 'Urban dominan', value: 3 },
  { zone: 'Seimbang', value: 3 },
  { zone: 'Ekologis dominan', value: 2 },
];

export const previews = [
  {
    title: '1. Story Map',
    description: 'Memahami Malang Raya, NDVI, NDBI, LST, GCI, UPI, dan cara membaca keseimbangan kota lewat cerita peta.',
    href: '/storymap',
    icon: BookOpen,
    label: 'Mulai Belajar',
  },
  {
    title: '2. WebGIS',
    description: 'Mengeksplorasi layer GUBI, NDVI, NDBI, LST, GCI, dan UPI untuk membandingkan wilayah.',
    href: '/webgis',
    icon: Map,
    label: 'Jelajahi WebGIS',
  },
  {
    title: '3. Quiz',
    description: 'Menguji pemahaman siswa dengan pembahasan yang menjelaskan konsep, bukan hanya jawaban benar.',
    href: '/quiz',
    icon: CircleHelp,
    label: 'Mulai Quiz',
  },
  {
    title: '4. Simulation',
    description: 'Mencoba perubahan vegetasi, kawasan terbangun, dan suhu permukaan untuk melihat dampaknya pada GUBI.',
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
