function StartScreen({ numQuestions, dispatch, highscore }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz !</h2>
      {highscore > 0 ? <h3> highscore:{highscore} points</h3> : ""}
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "startGame" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
