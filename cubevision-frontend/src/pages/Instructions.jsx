import { useNavigate } from "react-router-dom";
import "./Instructions.css";

export default function Instructions() {

    const navigate = useNavigate();

    const steps = [

        "Front Face",

        "Right Face",

        "Back Face",

        "Left Face",

        "Top Face",

        "Bottom Face"

    ];

    return (

        <div className="instructions-page">

            <div className="instructions-container">

                <h1 className="instructions-title">

                    Before You Start

                </h1>

                <p className="instructions-subtitle">

                    Follow the capture order below for the best detection accuracy.

                </p>

                <div className="steps-grid">

                    {steps.map((step,index)=>(

                        <div
                            key={step}
                            className="step-card"
                        >

                            <div className="step-number">

                                {index+1}

                            </div>

                            <h3>{step}</h3>

                            <p>

                                Capture this face clearly before moving to the next one.

                            </p>

                        </div>

                    ))}

                </div>

                <div className="tips">

                    <div className="tip">

                        <h3>💡 Good Lighting</h3>

                        <p>
                            Use bright, even lighting for accurate color detection.
                        </p>

                    </div>

                    <div className="tip">

                        <h3>📷 Fill the Frame</h3>

                        <p>
                            Make the cube face occupy most of the camera view.
                        </p>

                    </div>

                    <div className="tip">

                        <h3>📐 Keep Camera Straight</h3>

                        <p>
                            Hold the phone parallel to the cube face.
                        </p>

                    </div>

                    <div className="tip">

                        <h3>✨ Reduce Reflections</h3>

                        <p>
                            Avoid glare and shiny reflections on the stickers.
                        </p>

                    </div>

                </div>

                <button
                    className="continue-btn"
                    onClick={()=>navigate("/capture")}
                >

                    Start Scanning →

                </button>

            </div>

        </div>

    );

}