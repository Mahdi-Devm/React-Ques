function Options({ question, dispatch, ansewr }) {
  const hasanswer = ansewr !== null;
  return (
    <div className="options">
      {question.options.map((options, index) => (
        <button
          className={`btn btn-option ${index === ansewr ? "answer" : ""} ${
            hasanswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          kay={options}
          onClick={() => dispatch({ type: "newanswer", payload: index })}
          disabled={ansewr !== null}
        >
          {options}
        </button>
      ))}
    </div>
  );
}

export default Options;
