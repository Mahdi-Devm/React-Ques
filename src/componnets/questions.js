import Options from "./options";
function Questions({ question, dispatch, ansewr }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        question={question}
        dispatch={dispatch}
        ansewr={ansewr}
        key={question.question}
      />
    </div>
  );
}

export default Questions;
