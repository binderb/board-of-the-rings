import { useGameSession } from '../../../utils/GameSessionContext';

export default function QuizPrompt () {

  const { 
    socket,
    roomId,
    players,
    questionsLoading,
    questionsData,
    currentQuestion,
    questionPicked,
    setQuestionPicked
  } = useGameSession();

  const questions = questionsData?.questions || [];

  const checkAnswer = (e, isCorrect) => {
    if (!questionPicked) {
      setQuestionPicked(true);
      if (isCorrect) {
        socket.emit('picked_correct', {players, room: roomId, choice: e.target.getAttribute("data-key")});
        e.target.classList.remove('btn-primary');
        e.target.classList.add('btn-correct');
      } else {
        socket.emit('picked_incorrect', {players, room: roomId, choice: e.target.getAttribute("data-key")});
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
          <button key={answer.option} data-key={answer.option} disabled={questionPicked} className="btn btn-primary my-2 block w-full text-left" onClick={(e) => checkAnswer(e, answer.isCorrect)}>{answer.option}</button>
        )}
      </div>
    </section>
  );
}