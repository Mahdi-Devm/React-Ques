function NextButton({ dispatch, ansewr, index, numqus }) {
  if (ansewr === null) return null;

  if (index < numqus - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextqustions" })}
      >
        Next
      </button>
    );
  }

  if (index === numqus - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }

  return null;
}
export default NextButton;
