import cv2
import numpy as np
from app.services.color_calibration import HUE_CENTERS

def average_hsv(patch):

    h, w = patch.shape[:2]

    size = 20

    cx = w // 2
    cy = h // 2

    x1 = cx - size // 2
    x2 = cx + size // 2

    y1 = cy - size // 2
    y2 = cy + size // 2

    center = patch[y1:y2, x1:x2]

    hsv = cv2.cvtColor(center, cv2.COLOR_BGR2HSV)

    return np.mean(hsv.reshape(-1, 3), axis=0)

def average_face_color(hsv_values):
    return np.mean(hsv_values, axis=0)

import numpy as np

def hue_distance(h1, h2):

    diff = abs(h1 - h2)

    return min(diff, 180 - diff)

def classify_color(hsv):

    h, s, v = hsv

    # White stickers
    if s < 50:
        return "W"

    best_color = None
    best_distance = float("inf")

    for color, center_h in HUE_CENTERS.items():

        d = hue_distance(h, center_h)

        if d < best_distance:

            best_distance = d
            best_color = color

    return best_color