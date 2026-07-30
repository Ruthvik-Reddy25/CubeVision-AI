import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import CubeGuide from "../components/CubeGuide";
import "./Capture.css";
const faces = [
  "front",
  "right",
  "back",
  "left",
  "top",
  "bottom"
];



export default function Capture() {

  const [currentFace, setCurrentFace] = useState(0);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [detectedFaces, setDetectedFaces] = useState({});
    const [cameraOpen, setCameraOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {

    const mobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(
        navigator.userAgent
    );

    setIsMobile(mobile);

}, []);

  function handleImage(e) {

    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }

  }
  async function startCamera() {

    try {

        const stream = await navigator.mediaDevices.getUserMedia({

            video: {
                facingMode: {
                    ideal: "environment"
                }
            }

        });

        streamRef.current = stream;

        setCameraOpen(true);

        setTimeout(() => {

            if (videoRef.current) {

                videoRef.current.srcObject = stream;

            }

        }, 100);

    }

    catch (err) {

        console.error(err);

        alert("Unable to access camera.");

    }

}

    function stopCamera() {

        if (streamRef.current) {

            streamRef.current
                .getTracks()
                .forEach(track => track.stop());

        }

        setCameraOpen(false);

    }

  function captureImage() {

    const video = videoRef.current;
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    canvas.toBlob(blob => {

        const file = new File(
            [blob],
            `${faces[currentFace]}.jpg`,
            {
                type: "image/jpeg"
            }
        );

        setImage(file);
        stopCamera();

            }, "image/jpeg");

}

  async function uploadImage() {

    if (!image) {

        alert("Please select an image.");

        return;
    }

    const formData = new FormData();

    formData.append("file", image);

    try {
        setUploading(true);
        const response = await api.post(
            `/upload/${faces[currentFace]}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        console.log("Response:", response.data);
        alert(JSON.stringify(response.data));
        setUploading(false);

        if (response.data.solution) {

            navigate("/result", {
                state: {
                    solution: response.data.solution
                }
            });

        } else {

            // Save detected colors for this face
            setDetectedFaces(prev => ({
                ...prev,
                [faces[currentFace]]: response.data.colors
            }));

            alert(response.data.message);

            setCurrentFace(prev => prev + 1);
            setImage(null);

        }

    } catch (error) {
        setUploading(false);
        console.error(error);

        alert("Upload failed.");

    }

}

    return (
        <div className="capture-page">

            <div className="capture-container">

                <h1 className="capture-title">
                    Scan Your Rubik's Cube
                </h1>

                <p className="capture-subtitle">
                    Capture the <strong>{faces[currentFace].toUpperCase()}</strong> face
                </p>

                {/* Cube Guide */}
                {/*<CubeGuide face={faces[currentFace]} />*/}

                {/* Progress Tracker */}

                <div className="progress-tracker">

                    {faces.map((face, index) => {

                        let status = "pending";

                        if (index < currentFace)
                            status = "completed";
                        else if (index === currentFace)
                            status = "current";

                        return (

                            <div
                                key={face}
                                className={`progress-item ${status}`}
                            >
                                {face.toUpperCase()}
                            </div>

                        );

                    })}

                </div>

                {/* Guidelines */}

                <div className="capture-guide">

                    <h3>📸 Photo Guidelines</h3>

                    <ul>

                        <li>✅ Fill most of the frame with the cube face</li>

                        <li>✅ Capture only one face</li>

                        <li>✅ Keep the camera straight</li>

                        <li>✅ Use good lighting</li>

                        <li>❌ Avoid large background areas</li>

                    </ul>

                </div>

                {/* Upload */}

                {/* Camera Test */}

                {isMobile ? (

                    <button
                        className="upload-btn"
                        onClick={startCamera}
                    >
                        📷 Open Camera
                    </button>

                ) : (

                    <>
                        <input
                            id="cube-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImage}
                            hidden
                        />

                        <label
                            htmlFor="cube-upload"
                            className="upload-card"
                        >
                            <div className="upload-icon">📷</div>

                            <h2>Click to Upload Image</h2>

                            <p>PNG • JPG • JPEG</p>

                            <small>
                                Capture or upload one cube face
                            </small>
                        </label>
                    </>

                )}

                {/* Preview */}

                {image && (

                    <div className="preview-section">

                        <h3>Preview</h3>

                        <img
                            src={URL.createObjectURL(image)}
                            alt="preview"
                            className="preview-image"
                        />

                        <div className="button-group">

                            <button
                                className="retake-btn"
                                onClick={() => setImage(null)}
                            >
                                Retake
                            </button>

                            <button
                                className="upload-btn"
                                onClick={uploadImage}
                                disabled={uploading}
                            >
                                {uploading ? "Uploading..." : "Continue"}
                            </button>

                        </div>

                    </div>

                )}
                {cameraOpen && (

                    <div className="camera-modal">

                        <div className="camera-preview">

                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                            />

                            <div className="camera-overlay">

                                <div className="guide-box"></div>

                            </div>

                        </div>

                        <div className="camera-controls">

                            <button
                                className="retake-btn"
                                onClick={stopCamera}
                            >
                                Close
                            </button>

                            <button
                                className="upload-btn"
                                onClick={captureImage}
                            >
                                📸 Capture
                            </button>

                        </div>

                    </div>

                )}

                <canvas
                    ref={canvasRef}
                    hidden
                />
            </div>

        </div>
    );

}