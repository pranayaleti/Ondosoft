import { memo, useMemo, useState } from 'react';
import { assessmentQuestions, assessmentThemes } from '../../constants/productEngineering';
import { buildContactHref, persistAssessment } from '../../utils/contactIntent';
import { PrimaryButton, SectionHeading, SectionShell } from './ui';

const MAX_SCORE = assessmentQuestions.length * 10;

const interpret = (answers) => {
  const scored = assessmentQuestions.map((question) => {
    const option = question.options[answers[question.id]] ?? question.options[0];
    return { id: question.id, score: option.score };
  });
  const total = scored.reduce((sum, item) => sum + item.score, 0);
  const normalized = Math.round((total / MAX_SCORE) * 100);
  const strengths = scored
    .filter((item) => item.score >= 8)
    .map((item) => assessmentThemes[item.id].strength);
  const risks = scored
    .filter((item) => item.score <= 4)
    .map((item) => assessmentThemes[item.id].risk);
  const opportunities = scored
    .slice()
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((item) => assessmentThemes[item.id].risk);
  return { score: normalized, strengths, risks, opportunities };
};

const HealthAssessment = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const current = assessmentQuestions[step];
  const complete = step >= assessmentQuestions.length;
  const result = useMemo(() => (complete ? interpret(answers) : null), [complete, answers]);

  const selectOption = (optionIndex) => {
    const nextAnswers = { ...answers, [current.id]: optionIndex };
    setAnswers(nextAnswers);
    if (step === assessmentQuestions.length - 1) {
      const nextResult = interpret(nextAnswers);
      persistAssessment(nextResult);
    }
    setStep((value) => value + 1);
  };

  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  return (
    <SectionShell id="health-assessment" labelledBy="health-heading" className="bg-ink">
      <SectionHeading
        titleId="health-heading"
        eyebrow="Lead-in diagnostic"
        title="How healthy is your software platform?"
      >
        Ten questions. A 0–100 score. Strengths, risks, and three places a senior team would
        start. Your answers stay in this browser until you send them with a note.
      </SectionHeading>

      <div className="border border-line bg-panel p-5 sm:p-8 max-w-3xl">
        {!complete ? (
          <>
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="font-mono text-xs text-signal">
                {String(step + 1).padStart(2, '0')} / {String(assessmentQuestions.length).padStart(2, '0')}
              </p>
              <div className="flex-1 h-px bg-line overflow-hidden" aria-hidden="true">
                <div
                  className="h-full bg-signal"
                  style={{ width: `${((step + 1) / assessmentQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            <h3 className="font-display text-2xl text-bone tracking-tight">{current.prompt}</h3>
            <div role="radiogroup" aria-label={current.prompt} className="mt-6 space-y-2">
              {current.options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={answers[current.id] === index}
                  onClick={() => selectOption(index)}
                  className="w-full text-left min-h-12 border border-line px-4 py-3 text-neutral-200 hover:border-signal hover:text-bone"
                >
                  {option.label}
                </button>
              ))}
            </div>
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((value) => value - 1)}
                className="mt-6 min-h-11 text-sm text-neutral-500 hover:text-bone"
              >
                Back
              </button>
            ) : null}
          </>
        ) : (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">Platform score</p>
            <p className="font-display text-6xl text-bone mt-2">{result.score}</p>
            <p className="text-neutral-500 mt-1">out of 100 · self-reported</p>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-display text-xl text-bone">Strengths</h3>
                {result.strengths.length ? (
                  <ul className="mt-3 space-y-2 text-neutral-300">
                    {result.strengths.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-neutral-500">No high-confidence strengths yet — that is useful signal.</p>
                )}
              </div>
              <div>
                <h3 className="font-display text-xl text-bone">Risks</h3>
                {result.risks.length ? (
                  <ul className="mt-3 space-y-2 text-neutral-300">
                    {result.risks.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-neutral-500">No severe flags from this pass.</p>
                )}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display text-xl text-bone">Top 3 opportunities</h3>
              <ol className="mt-3 space-y-2 text-neutral-300 list-decimal list-inside">
                {result.opportunities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <PrimaryButton
                to={buildContactHref({
                  intent: 'assessment',
                  source: 'health-assessment',
                  extra: { score: result.score },
                })}
              >
                Get My Engineering Assessment
              </PrimaryButton>
              <button
                type="button"
                onClick={restart}
                className="inline-flex items-center justify-center min-h-12 text-neutral-400 hover:text-bone"
              >
                Retake
              </button>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
};

export default memo(HealthAssessment);
