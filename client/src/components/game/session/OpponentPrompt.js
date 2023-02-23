import { useEffect, useState } from 'react';
import { useGameSession } from '../../../utils/GameSessionContext';

export default function OpponentPrompt () {

  const { 
    socket,
    questionsLoading,
    questionsData,
    currentQuestion,
  } = useGameSession();
  const [picked, setPicked] = useState(null);

  useEffect( () => {
    socket.on('receive_picked_correct', ({choice}) => {
      setPicked(choice);
    });

    socket.on('receive_picked_incorrect', ({choice}) => {
      setPicked(choice);
    });

    return () => {
      //socket.off('receive_picked_correct');
      //socket.off('receive_picked_incorrect');
    };
  });

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
        {questions[currentQuestion].answers.map( (answer) => {
          let buttonClass = 'btn-primary';
          console.log("opponent picked: ",picked);
          if (answer.option === picked && answer.isCorrect) buttonClass = 'btn-correct';
          else if (answer.option === picked && !answer.isCorrect) buttonClass = 'btn-incorrect'; 
          return (
            <button key={answer.option} disabled={true} className={`btn ${buttonClass} m-2 block`}>{answer.option}</button>
          );
        })}
      </div>
    </section>
  );
}