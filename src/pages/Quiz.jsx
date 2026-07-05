import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import QuizIntro from '../components/quiz/QuizIntro.jsx';
import QuizProgress from '../components/quiz/QuizProgress.jsx';
import QuizQuestion from '../components/quiz/QuizQuestion.jsx';
import QuizResult from '../components/quiz/QuizResult.jsx';
import quizQuestions from '../data/quizQuestions.json';

export default function Quiz() {
  const emptyAnswers = useMemo(() => quizQuestions.map(() => null), []);
  const [phase, setPhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState(emptyAnswers);
  const answeredCount = quizAnswers.filter((answer) => answer !== null).length;

  useEffect(() => {
    if (phase !== 'calculating') return undefined;

    const timer = window.setTimeout(() => {
      setPhase('result');
    }, 950);

    return () => window.clearTimeout(timer);
  }, [phase]);

  const handleStart = useCallback(() => {
    setPhase('question');
  }, []);

  const handleAnswer = useCallback((optionIndex) => {
    setQuizAnswers((current) => current.map((answer, index) => (index === currentQuestion ? optionIndex : answer)));
  }, [currentQuestion]);

  const handleNext = useCallback(() => {
    if (currentQuestion === quizQuestions.length - 1) {
      setPhase('calculating');
      return;
    }

    setCurrentQuestion((current) => current + 1);
  }, [currentQuestion]);

  const handleRestart = useCallback(() => {
    setQuizAnswers(emptyAnswers);
    setCurrentQuestion(0);
    setPhase('intro');
  }, [emptyAnswers]);

  if (phase === 'intro') {
    return <QuizIntro totalQuestions={quizQuestions.length} onStart={handleStart} />;
  }

  if (phase === 'calculating') {
    return (
      <section className="page-shell grid min-h-[70vh] place-items-center py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-lg border border-carbon-200 bg-white p-7 text-center shadow-soft"
        >
          <div className="mx-auto grid size-16 place-items-center rounded-lg bg-brand-100">
            <motion.div
              className="size-9 rounded-full border-4 border-brand-600 border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
            />
          </div>
          <h1 className="mt-5 text-2xl font-extrabold text-carbon-950">Menghitung skor...</h1>
          <p className="mt-2 text-sm leading-6 text-carbon-600">
            Sistem sedang menyiapkan hasil dan pembahasan untuk tiap konsep.
          </p>
        </motion.div>
      </section>
    );
  }

  if (phase === 'result') {
    return <QuizResult questions={quizQuestions} answers={quizAnswers} onRestart={handleRestart} />;
  }

  return (
    <div className="bg-carbon-100">
      <section className="page-shell py-8 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">Quiz Interaktif</p>
              <h1 className="mt-2 text-3xl font-extrabold text-carbon-950">Bangun pemahaman, satu soal sekali waktu.</h1>
            </div>
          </motion.div>

          <QuizProgress current={currentQuestion + 1} total={quizQuestions.length} answered={answeredCount} />

          <div className="mt-5">
            <QuizQuestion
              question={quizQuestions[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={quizQuestions.length}
              selectedAnswer={quizAnswers[currentQuestion]}
              onSelect={handleAnswer}
              onNext={handleNext}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
