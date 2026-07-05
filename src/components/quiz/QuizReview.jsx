import { CheckCircle2, XCircle } from 'lucide-react';

const optionLetters = ['A', 'B', 'C', 'D'];

export default function QuizReview({ questions, answers }) {
  return (
    <section className="mt-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Pembahasan</p>
          <h2 className="mt-2 text-2xl font-extrabold text-carbon-950">Pelajari alasan di balik jawaban</h2>
        </div>
      </div>

      <div className="mt-5 grid gap-4">
        {questions.map((question, index) => {
          const userAnswer = answers[index];
          const isCorrect = userAnswer === question.answer;

          return (
            <article key={question.id} className="rounded-lg border border-carbon-200 bg-white p-5 shadow-soft">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-carbon-100 px-3 py-1.5 text-xs font-extrabold text-carbon-700">
                  Soal {index + 1}
                </span>
                <span className="rounded-md bg-brand-50 px-3 py-1.5 text-xs font-extrabold text-brand-800">
                  {question.concept}
                </span>
                <span
                  className={[
                    'inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-extrabold',
                    isCorrect ? 'bg-brand-100 text-brand-800' : 'bg-warning-100 text-warning-900',
                  ].join(' ')}
                >
                  {isCorrect ? <CheckCircle2 size={15} aria-hidden="true" /> : <XCircle size={15} aria-hidden="true" />}
                  {isCorrect ? 'Benar' : 'Perlu dipelajari'}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-extrabold leading-7 text-carbon-950">{question.question}</h3>
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                <div className="rounded-md bg-carbon-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-carbon-500">Jawaban kamu</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-carbon-800">
                    {optionLetters[userAnswer]}. {question.options[userAnswer]}
                  </p>
                </div>
                <div className="rounded-md bg-brand-50 p-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand-700">Jawaban benar</p>
                  <p className="mt-2 text-sm font-bold leading-6 text-brand-950">
                    {optionLetters[question.answer]}. {question.options[question.answer]}
                  </p>
                </div>
              </div>
              <p className="mt-4 rounded-md bg-carbon-950 p-4 text-sm font-medium leading-7 text-white">
                {question.explanation}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
