import { useEffect } from "react";

function Timer({ dispatch, timeRemaning }) {
  const min = Math.floor(timeRemaning / 60);
  const sec = timeRemaning % 60;
  useEffect(function () {
    const id = setInterval(function () {
      dispatch({ type: "timer" });
    }, 1000);

    return function () {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{sec < 10 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
