import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {

    const navigate = useNavigate();

    return (

        <div className="home-page">

            <div className="home-container">

                <h1 className="home-title">
                    🧩 CubeVision AI
                </h1>

                <p className="home-subtitle">
                    AI-Powered Rubik's Cube Solver
                </p>

                <p className="home-description">
                    Scan all six faces of your Rubik's Cube using your phone's
                    camera. Our OpenCV-based color detection and Kociemba
                    algorithm compute an optimal solution in seconds.
                </p>

                <div className="features">

                    <div className="feature-card">

                        <div className="feature-icon">
                            📷
                        </div>

                        <h3>Scan</h3>

                        <p>
                            Capture each cube face using the built-in camera.
                        </p>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon">
                            🎨
                        </div>

                        <h3>Detect</h3>

                        <p>
                            OpenCV accurately recognizes all sticker colors.
                        </p>

                    </div>

                    <div className="feature-card">

                        <div className="feature-icon">
                            🧠
                        </div>

                        <h3>Solve</h3>

                        <p>
                            Compute an optimal solution using the Kociemba algorithm.
                        </p>

                    </div>

                </div>

                <button
                    className="start-btn"
                    onClick={() => navigate("/instructions")}
                >
                    Start Scanning →
                </button>

            </div>

        </div>

    );

}