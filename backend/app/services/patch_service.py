def extract_center_patch(cell):

    h, w = cell.shape[:2]

    patch_size = 40

    cx = w // 2
    cy = h // 2

    x1 = cx - patch_size // 2
    x2 = cx + patch_size // 2

    y1 = cy - patch_size // 2
    y2 = cy + patch_size // 2

    return cell[y1:y2, x1:x2]