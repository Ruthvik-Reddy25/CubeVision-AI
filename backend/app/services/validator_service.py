from collections import Counter


def validate_cube_state(cube_state):

    if len(cube_state) != 54:
        return False, "Cube must contain exactly 54 stickers."

    counts = Counter(cube_state)

    required_faces = ["U", "R", "F", "D", "L", "B"]

    for face in required_faces:

        if counts.get(face, 0) != 9:
            return (
                False,
                f"Face '{face}' has {counts.get(face,0)} stickers instead of 9."
            )

    return True, "Cube state is valid."