function Start({ numqus, dispatch }) {
  function handelquez() {
    dispatch({ type: "start" });
  }
  return (
    <div className="start">
      <h2>Welcome to the react quize</h2>
      <h3>{numqus} question to test your react mastery</h3>
      <button className="btn-start" onClick={handelquez}>
        lets start
      </button>
    </div>
  );
}

export default Start;
