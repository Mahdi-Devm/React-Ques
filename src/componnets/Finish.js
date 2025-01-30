function Finish({ maxPossiblePoints, points, highscore, dispatch }) {
  const per = (points / maxPossiblePoints) * 100;
  let emoji;
  if (per === 100) emoji = "⚡";
  else if (per >= 80) emoji = "👍";
  else if (per >= 40) emoji = "😶";
  else emoji = "(اسکلی ؟)";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> you scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(per)})
      </p>
      <p className="highscore">highscore: {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "resat" })}
      >
        Resat
      </button>
    </>
  );
}

export default Finish;
