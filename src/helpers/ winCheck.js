const checkWin = (board) => {
    // Verificar Horizontal
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = board[row][col];
            if (
                cell &&
                cell === board[row][col + 1] &&
                cell === board[row][col + 2] &&
                cell === board[row][col + 3]
            ) {
                return cell;
            }
        }
    }

    // Verificar Vertical
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            const cell = board[row][col];
            if (
                cell &&
                cell === board[row + 1][col] &&
                cell === board[row + 2][col] &&
                cell === board[row + 3][col]
            ) {
                return cell;
            }
        }
    }

    // Verificar Diagonal (\)
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = board[row][col];
            if (
                cell &&
                cell === board[row + 1][col + 1] &&
                cell === board[row + 2][col + 2] &&
                cell === board[row + 3][col + 3]
            ) {
                return cell;
            }
        }
    }

    // Verificar Diagonal (/)
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            const cell = board[row][col];
            if (
                cell &&
                cell === board[row - 1][col + 1] &&
                cell === board[row - 2][col + 2] &&
                cell === board[row - 3][col + 3]
            ) {
                return cell;
            }
        }
    }

    // Sem vitória
    return null;
};

export default checkWin;