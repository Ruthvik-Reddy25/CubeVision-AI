import { useState } from "react";
import { useLocation } from "react-router-dom";
import CubeViewer from "../components/cube/CubeViewer";
import "./Result.css";

export default function Result() {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(0);

  const data = location.state;

  if (!data) {
    return (
      <div className="result-page">
        <h2>No solution available.</h2>
      </div>
    );
  }

  const moves = data.solution.moves;

  const getMoveDescription = (move) => {
    if (!move) return "Cube Solved!";

    const descriptions = {
      "R": "Turn Right Face Clockwise",
      "R'": "Turn Right Face Counter Clockwise",
      "R2": "Rotate Right Face Twice",

      "L": "Turn Left Face Clockwise",
      "L'": "Turn Left Face Counter Clockwise",
      "L2": "Rotate Left Face Twice",

      "U": "Turn Top Face Clockwise",
      "U'": "Turn Top Face Counter Clockwise",
      "U2": "Rotate Top Face Twice",

      "D": "Turn Bottom Face Clockwise",
      "D'": "Turn Bottom Face Counter Clockwise",
      "D2": "Rotate Bottom Face Twice",

      "F": "Turn Front Face Clockwise",
      "F'": "Turn Front Face Counter Clockwise",
      "F2": "Rotate Front Face Twice",

      "B": "Turn Back Face Clockwise",
      "B'": "Turn Back Face Counter Clockwise",
      "B2": "Rotate Back Face Twice",
    };

    return descriptions[move] || move;
  };

  return (
    <div className="result-page">
      <div className="result-header">
        <h1>🎉 Cube Solved!</h1>
        <p>Solution found in {moves.length} moves</p>
      </div>

      <div className="result-content">
        <div className="cube-panel">
          <CubeViewer alg={moves.slice(0, currentStep).join(" ")} />
        </div>

        <div className="control-panel">
          <h2>Current Move</h2>

          <div className="move-card">
            {currentStep === moves.length ? (
              <>
                <h1>✔</h1>
                <p>Cube Solved!</p>
              </>
            ) : (
              <>
                <h1>{moves[currentStep]}</h1>
                <p>{getMoveDescription(moves[currentStep])}</p>
              </>
            )}
          </div>

          <div className="progress-section">
            <p>
              Step <strong>{currentStep}</strong> / {moves.length}
            </p>

            <progress
              value={currentStep}
              max={moves.length}
            ></progress>
          </div>

          <div className="navigation">
            <button
              disabled={currentStep === 0}
              onClick={() =>
                setCurrentStep((prev) => Math.max(prev - 1, 0))
              }
            >
              ◀ Previous
            </button>

            <button
              disabled={currentStep === moves.length}
              onClick={() =>
                setCurrentStep((prev) =>
                  Math.min(prev + 1, moves.length)
                )
              }
            >
              Next ▶
            </button>
          </div>
        </div>
      </div>

      <div className="moves-section">
        <h2>Solution Moves</h2>

        <div className="move-list">
          {moves.map((move, index) => (
            <span
              key={index}
              className={
                index < currentStep
                  ? "done"
                  : index === currentStep
                  ? "current"
                  : "pending"
              }
            >
              {move}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}