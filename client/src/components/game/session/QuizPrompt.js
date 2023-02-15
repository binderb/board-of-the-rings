
export default function QuizPrompt () {

  const questionIndex = 0;
  const quizData = [
    {
      quizQ: "What is the answer to life, the universe, and everything?",
      answers: [
        {
          option: "7",
          isCorrect: false
        },
        {
          option: "23",
          isCorrect: false
        },
        {
          option: "42",
          isCorrect: true
        },
        {
          option: "81",
          isCorrect: false
        },
      ]
    }
  ];

  const checkAnswer = (isCorrect) => {
    if (isCorrect) {
      console.log("Correct!");
    } else {
      console.log("Incorrect.");
    }
  }

  return (
    <section className='w-full rounded p-2 border-highlight' id='quiz-prompt'>
      <p className="mb-2">
        {quizData[questionIndex].quizQ}
      </p>
      <div id="answers">
        {quizData[questionIndex].answers.map( (answer) =>
          <button key={answer.option} className="btn btn-primary m-2 block" onClick={() => checkAnswer(answer.isCorrect)}>{answer.option}</button>
        )}
      </div>

    </section>
  );
}