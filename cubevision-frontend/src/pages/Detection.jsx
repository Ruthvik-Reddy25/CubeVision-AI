import { useLocation, useNavigate } from "react-router-dom";
import "./Detection.css";

const colorMap = {
    white: "#ffffff",
    yellow: "#facc15",
    red: "#ef4444",
    orange: "#f97316",
    blue: "#3b82f6",
    green: "#22c55e"
};

export default function Detection() {

    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {
        return <h2>No detection data found.</h2>;
    }

    const { detectedFaces, solution } = state;

    return (

        <div className="detection-page">

            <h1>Detected Cube Colors</h1>

            <p>Please verify the detected colors before solving.</p>

            <div className="faces-grid">

                {Object.entries(detectedFaces).map(([face, colors]) => (

                    <div className="face-card" key={face}>

                        <h3>{face.toUpperCase()}</h3>

                        <div className="color-grid">

                            {colors.map((color, index) => (

                                <div
                                    key={index}
                                    className="color-cell"
                                    style={{
                                        background: colorMap[color] || "#555"
                                    }}
                                />

                            ))}

                        </div>

                    </div>

                ))}

            </div>

            <button
                className="solve-btn"
                onClick={() =>
                    navigate("/result", {
                        state: {
                            solution
                        }
                    })
                }
            >
                Solve Cube
            </button>

        </div>

    );

}