function Progres({ numqus, index, points, maxPossiblePoints, ansewr }) {
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={numqus}
        value={index + Number(ansewr !== null)}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong> / {numqus}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progres;
