import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuizQuestion({
  question,
  questionIndex,
  totalQuestions,
  selectedAnswer,
  onSelect,
  onNext,
}) {
  const hasAnswer = selectedAnswer !== null;
  const isLastQuestion = questionIndex === totalQuestions - 1;

  return (
    <AnimatePresence mode="wait">
      <motion.article
        key={question.id}
        initial={{ opacity: 0, x: 36 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -26 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft sm:p-7"
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-warning-100 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-warning-800">
            Nomor {questionIndex + 1}
          </span>
          <span className="rounded-md bg-brand-50 px-3 py-2 text-xs font-extrabold text-brand-800">
            Konsep: {question.concept}
          </span>
        </div>

        <h2 className="mt-5 text-2xl font-extrabold leading-snug text-carbon-950 sm:text-3xl">{question.question}</h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {question.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === optionIndex;

            return (
              <button
                key={option}
                type="button"
                onClick={() => onSelect(optionIndex)}
                className={[
                  'focus-ring flex min-h-20 items-center gap-3 rounded-lg border p-4 text-left transition',
                  isSelected
                    ? 'border-brand-600 bg-brand-50 text-brand-950 shadow-soft'
                    : 'border-carbon-200 bg-carbon-50 text-carbon-700 hover:-translate-y-0.5 hover:border-brand-300 hover:bg-white hover:shadow-soft',
                ].join(' ')}
                aria-pressed={isSelected}
              >
                <span
                  className={[
                    'grid size-9 shrink-0 place-items-center rounded-md text-sm font-extrabold',
                    isSelected ? 'bg-brand-600 text-white' : 'bg-white text-carbon-800',
                  ].join(' ')}
                >
                  {isSelected ? <Check size={17} aria-hidden="true" /> : optionLetters[optionIndex]}
                </span>
                <span className="text-sm font-bold leading-6 sm:text-base">{option}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-carbon-500">
            Pilih satu jawaban, lalu lanjutkan ke soal berikutnya.
          </p>
          <button
            type="button"
            onClick={onNext}
            disabled={!hasAnswer}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-carbon-950 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-carbon-300 disabled:hover:translate-y-0"
          >
            {isLastQuestion ? 'Selesai' : 'Selanjutnya'}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </motion.article>
    </AnimatePresence>
  );
}
