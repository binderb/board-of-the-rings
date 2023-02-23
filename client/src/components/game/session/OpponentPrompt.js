import { useGameSession } from '../../../utils/GameSessionContext';

export default function OpponentPrompt () {

  const { 
    questionsLoading,
    questionsData,
    currentQuestion,
  } = useGameSession();

  const questions = questionsData?.questions || [];

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
          <button key={answer.option} disabled={true} className="btn btn-primary m-2 block">{answer.option}</button>
        )}
      </div>
    </section>
  );
}