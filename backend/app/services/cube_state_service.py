FACE_ORDER = [
    "top",
    "right",
    "front",
    "bottom",
    "left",
    "back",
]


def build_cube_state(face_colors):

    mapping = build_color_mapping(face_colors)

    cube_state = ""

    for face in FACE_ORDER:

        for color in face_colors[face]:

            cube_state += mapping[color]

    return cube_state

def build_color_mapping(face_colors):

    return {

        face_colors["top"][4]: "U",

        face_colors["right"][4]: "R",

        face_colors["front"][4]: "F",

        face_colors["bottom"][4]: "D",

        face_colors["left"][4]: "L",

        face_colors["back"][4]: "B",
    }