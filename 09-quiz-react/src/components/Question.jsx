import Options from "./Options";

function Question({ question, dispatch, answer }) {
  //   console.log(question);
  return (
    <div>
      <h3>{question.question}</h3>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
