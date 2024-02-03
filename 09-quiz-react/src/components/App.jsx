/* eslint-disable */

import { useEffect, useReducer } from "react";
import Header from "./Header";
import MainContainer from "./MainContainer";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import ProgressResult from "./ProgressResult";
import FinishedQuiz from "./FinishedQuiz";
import Footer from "./Footer";
import Timer from "./Timer";
import question from "./questions.json";
const TIME_PER_QUESTION = 30;
const initialState = {
  questions: [],
  //loading error ready active finished
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highscore: 0,
  timeRemaning: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "startFetching":
      const gethighScore = localStorage.getItem("highscore") || 0;
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        highscore: gethighScore,
      };
    case "error":
      return { ...state, status: "error" };
    case "startGame":
      return {
        ...state,
        status: "active",
        timeRemaning: TIME_PER_QUESTION * state.questions.length,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        point:
          question.correctOption === action.payload
            ? state.point + question.points
            : state.point,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      const newHighScore = state.point;
      newHighScore > state.highscore &&
        localStorage.setItem("highscore", newHighScore);
      return {
        ...state,
        status: "finish",
        highscore:
          newHighScore > state.highscore ? newHighScore : state.highscore,
      };
    case "restartQuiz":
      return {
        ...state,
        index: 0,
        answer: null,
        point: 0,
        status: "ready",
        timeRemaning: TIME_PER_QUESTION * state.questions.length,
      };
    case "timer":
      return {
        ...state,
        timeRemaning: state.timeRemaning - 1,
        status: state.timeRemaning === 0 ? "finish" : state.status,
      };

    default:
      throw new Error("unknown Action type");
  }
}
//restartQuiz
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, point, highscore, timeRemaning } =
    state;
  const numQuestions = questions.length;
  const totalPossiblePoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  useEffect(function () {
    async function fetchData() {
      try {
        // let res = await fetch("http://localhost:9000/questions");
        // res = await res.json();
        let res = question.questions;
        // console.log("Response:", res);
        dispatch({ type: "startFetching", payload: res });
      } catch (error) {
        console.log("error:", error);
        dispatch({ type: "error" });
      }
    }
    fetchData();
  }, []);
  // console.log("questioon:", question.questions);
  return (
    <div className="app">
      <Header />

      <MainContainer className="main">
        {/* <p>1/15</p>
        <p>Question</p> */}
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            highscore={highscore}
          />
        )}
        {status === "active" && (
          <>
            <ProgressResult
              numQuestions={numQuestions}
              index={index}
              point={point}
              totalPossiblePoints={totalPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} timeRemaning={timeRemaning} />
            </Footer>
            <NextButton
              answer={answer}
              dispatch={dispatch}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finish" && (
          <FinishedQuiz
            totalPossiblePoints={totalPossiblePoints}
            point={point}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </MainContainer>
    </div>
  );
}
