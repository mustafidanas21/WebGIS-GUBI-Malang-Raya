import { motion } from 'framer-motion';

export default function QuizProgress({ current, total, answered }) {
  const progress = total > 0 ? (answered / total) * 100 : 0;

  return (
    <div className="rounded-lg border border-carbon-200 bg-white p-4 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-bold text-carbon-700">
        <span>
          Soal {current} dari {total}
        </span>
        <span>{answered}/{total} terjawab</span>
      </div>
      <div className="mt-3 h-3 overflow-hidden rounded-full bg-carbon-100">
        <motion.div
          className="h-full rounded-full bg-brand-500"
          initial={false}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}
