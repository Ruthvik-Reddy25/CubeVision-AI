import "./CubeGuide.css";

export default function CubeGuide({ face }) {

    return (

        <div className="cube-guide">

            <div className={`cube-face top ${face === "top" ? "active" : ""}`}></div>

            <div className="middle-row">

                <div className={`cube-face left ${face === "left" ? "active" : ""}`}></div>

                <div className={`cube-face front ${face === "front" ? "active" : ""}`}></div>

                <div className={`cube-face right ${face === "right" ? "active" : ""}`}></div>

            </div>

            <div className={`cube-face bottom ${face === "bottom" ? "active" : ""}`}></div>

            <div className={`cube-face back ${face === "back" ? "active" : ""}`}></div>

        </div>

    );

}