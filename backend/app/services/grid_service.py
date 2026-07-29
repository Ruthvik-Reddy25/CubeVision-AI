def split_into_grid(image):

    height, width = image.shape[:2]

    cell_h = height // 3
    cell_w = width // 3

    cells = []

    for row in range(3):

        for col in range(3):

            y1 = row * cell_h
            y2 = (row + 1) * cell_h

            x1 = col * cell_w
            x2 = (col + 1) * cell_w

            cells.append(image[y1:y2, x1:x2])

    return cells