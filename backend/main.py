from fastapi import FastAPI

app = FastAPI(title="CubeVision AI")


@app.get("/")
def home():
    return {
        "message": "CubeVision AI Backend Running"
    }
