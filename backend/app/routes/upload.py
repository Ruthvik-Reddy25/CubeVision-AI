from app.services.cube_state_service import build_cube_state
from app.services.solver_service import solve_cube
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.color_service import average_hsv, classify_color
from app.services.image_service import (
    load_face,
    resize_image
)
from app.services.roi_service import extract_roi
from app.services.validator_service import validate_cube_state
import os
import shutil
from app.services.grid_service import split_into_grid
from app.services.patch_service import extract_center_patch
from app.services.storage_service import face_colors

router = APIRouter()

UPLOAD_DIR = "uploads"

VALID_FACES = [
    "front",
    "back",
    "left",
    "right",
    "top",
    "bottom"
]


@router.post("/upload/{face}")
async def upload_face(face: str, file: UploadFile = File(...)):

    face = face.lower()

    if face not in VALID_FACES:
        raise HTTPException(status_code=400, detail="Invalid face name")

    folder = os.path.join(UPLOAD_DIR, face)

    os.makedirs(folder, exist_ok=True)

    file_path = os.path.join(folder, "face.jpg")

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    image = load_face(file_path)
    image = resize_image(image)
    roi = extract_roi(image)
    cells = split_into_grid(roi)
    os.makedirs("uploads/debug", exist_ok=True)

    colors = []

    for i, cell in enumerate(cells):

        patch = extract_center_patch(cell)

        hsv = average_hsv(patch)

        color = classify_color(hsv)

        print(f"Patch {i+1}: HSV={hsv} -> {color}")

        colors.append(color)
    face_colors[face] = colors
    if len(face_colors) == 6:

        cube_state = build_cube_state(face_colors)

        valid, message = validate_cube_state(cube_state)

        if not valid:

            face_colors.clear()

            return {
                "success": False,
                "error": message,
                "cube_state": cube_state
            }

        result = solve_cube(cube_state)

        face_colors.clear()

        return {
            "success": True,
            "cube_state": cube_state,
            "solution": result,
            "colors": colors
        }

    # Less than 6 faces uploaded
    return {
        "message": f"{face} uploaded successfully",
        "colors": colors,
        "uploaded_faces": list(face_colors.keys())
    }