import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./main";
import Loader from "./Loader";
import Error from "./Error";
import Start from "./start";
import Questions from "./questions";
import NextButton from "./NextButton";
import Progres from "./progres";
import Finish from "./Finish";
const initialstate = {
  question: [],
  status: "loading",
  index: 0,
  ansewr: null,
  points: 0,
  highscore: 0,
  time: 7 * 60,
};
function Reducer(state, action) {
  switch (action.type) {
    case "dataRecevied":
      return {
        ...state,
        question: action.payload,
        status: "raday",
      };
    case "datafaild":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "nextqustions":
      return {
        ...state,
        index: state.index + 1,
        ansewr: null,
        time: 7 * 60,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "timeout":
      return {
        ...state,
        time: state.time > 0 ? state.time - 1 : 0,
      };
    case "resat":
      return {
        ...state,
        status: "active",
        index: 0,
        points: 0,
        ansewr: null,
      };

    case "newanswer":
      const question = state.question.at(state.index);
      return {
        ...state,
        ansewr: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("actionb ynkbow");
  }
}
export default function App() {
  const [
    { question, status, index, ansewr, points, highscore, time },
    dispatch,
  ] = useReducer(Reducer, initialstate);
  const numqus = question.length;
  const maxPossiblePoints = question.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    if (time === 0) {
      dispatch({ type: "finished" });
    }
    const interval = setInterval(() => {
      dispatch({ type: "timeout" });
    }, 1000);
    return () => clearInterval(interval);
  }, [status, time]);

  useEffect(() => {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecevied", payload: data }))
      .catch((err) => dispatch({ type: "datafaild" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "raday" && <Start numqus={numqus} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progres
              maxPossiblePoints={maxPossiblePoints}
              points={points}
              numqus={numqus}
              index={index}
              ansewr={ansewr}
            />
            <Questions
              question={question[index]}
              dispatch={dispatch}
              ansewr={ansewr}
            />
            <h4 className="btn btn-ui">
              {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
            </h4>
            <NextButton
              ansewr={ansewr}
              dispatch={dispatch}
              index={index}
              numqus={numqus}
            />
          </>
        )}
        {status === "finished" && (
          <Finish
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            index={index}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
