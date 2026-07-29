import kociemba

def solve_cube(cube_state):

    try:
        solution = kociemba.solve(cube_state)

        moves = solution.split() if solution else []

        return {
            "success": True,
            "moves": moves,
            "move_count": len(moves)
        }

    except Exception as e:

        return {
            "success": False,
            "error": str(e)
        }