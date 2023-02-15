import { useState } from 'react';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function QuizPrompt () {
  const [picked, setPicked] = useState(false);

  const { 
    questionsLoading,
    questionsData,
    currentQuestion
  } = useGameSession();

  const questions = questionsData?.questions || [];

  const checkAnswer = (e, isCorrect) => {
    if (!picked) {
      setPicked(true);
      if (isCorrect) {
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-correct');
      } else {
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-incorrect');
      }
    }
  }

  if (questionsLoading) {
    return (
      <section id='quiz-loading'>
        <p>Loading Questions...</p>
      </section>
    );
  }

  return (
    <section className='w-full rounded p-2 border-highlight' id='quiz-prompt'>
      <p className="mb-2">
        {questions[currentQuestion].quizQ}
      </p>
      <div id="answers">
        {questions[currentQuestion].answers.map( (answer) =>
          <button key={answer.option} disabled={picked} className="btn btn-primary m-2 block" onClick={(e) => checkAnswer(e, answer.isCorrect)}>{answer.option}</button>
        )}
      </div>
    </section>
  );
}