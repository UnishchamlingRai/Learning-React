function ProgressResult({
  numQuestions,
  index,
  point,
  totalPossiblePoints,
  answer,
}) {
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        {index + 1}/{numQuestions} questions
      </p>
      <p>
        {point}/{totalPossiblePoints} points
      </p>
    </div>
  );
}

export default ProgressResult;
