import cv2

TARGET_SIZE = 900

def load_face(path):

    image = cv2.imread(path)

    if image is None:
        raise FileNotFoundError(
            f"Cannot load image: {path}"
        )

    return image


def resize_image(image):

    return cv2.resize(
        image,
        (TARGET_SIZE, TARGET_SIZE),
        interpolation=cv2.INTER_AREA
    )