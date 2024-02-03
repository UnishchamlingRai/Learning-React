function NextButton({ answer, numQuestions, index, dispatch }) {
  if (answer === null) return;
  if (index < numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finishQuiz" })}
      >
        Finished
      </button>
    );
  }
}

export default NextButton;
