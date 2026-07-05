import { motion } from 'framer-motion';
import { Home, RotateCcw, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import QuizReview from './QuizReview.jsx';

function getGrade(score) {
  if (score >= 85) return 'A';
  if (score >= 70) return 'B';
  if (score >= 55) return 'C';
  return 'D';
}

function getBadge(score) {
  if (score >= 90) return 'GUBI Champion';
  if (score >= 75) return 'Spatial Analyst';
  if (score >= 60) return 'Geo Explorer';
  return 'Eco Learner';
}

export default function QuizResult({ questions, answers, onRestart }) {
  const correctCount = answers.reduce((total, answer, index) => total + (answer === questions[index].answer ? 1 : 0), 0);
  const wrongCount = questions.length - correctCount;
  const score = Math.round((correctCount / questions.length) * 100);
  const grade = getGrade(score);
  const badge = getBadge(score);
  const stats = [
    { label: 'Jawaban benar', value: correctCount },
    { label: 'Jawaban salah', value: wrongCount },
    { label: 'Persentase', value: `${score}%` },
    { label: 'Grade', value: grade },
  ];

  return (
    <section className="page-shell py-8 sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft sm:p-7"
      >
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="rounded-lg bg-carbon-950 p-6 text-white">
            <div className="flex items-center gap-2 text-sm font-extrabold text-warning-200">
              <Trophy size={18} aria-hidden="true" />
              Hasil Quiz
            </div>
            <p className="mt-5 text-6xl font-extrabold leading-none">{score}</p>
            <p className="mt-3 text-sm leading-6 text-carbon-200">Skor akhir dari 100 poin.</p>
            <div className="mt-5 rounded-md bg-white px-4 py-3 text-lg font-extrabold text-carbon-950">{badge}</div>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Ringkasan belajar</p>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight text-carbon-950 sm:text-4xl">
              Kamu sudah menyelesaikan tantangan metodologi GUBI.
            </h1>
            <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-md bg-carbon-50 p-4">
                  <p className="text-xs font-bold text-carbon-500">{item.label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-carbon-950">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={onRestart}
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <RotateCcw size={18} aria-hidden="true" />
                Ulangi Quiz
              </button>
              <Link
                to="/"
                className="focus-ring inline-flex items-center justify-center gap-2 rounded-md border border-carbon-200 bg-white px-5 py-3 text-sm font-extrabold text-carbon-800 transition hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-800 hover:shadow-soft"
              >
                <Home size={18} aria-hidden="true" />
                Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <QuizReview questions={questions} answers={answers} />
    </section>
  );
}
