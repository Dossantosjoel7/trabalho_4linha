const checkWinner = (board) => {
        // verifica horizontal
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] && 
                    board[row][col] === board[row][col+1] && 
                    board[row][col] === board[row][col+2] && 
                    board[row][col] === board[row][col+3]) {
                    return board[row][col];
                }
            }
        }
        
        // verifica vertical
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 7; col++) {
                if (board[row][col] && 
                    board[row][col] === board[row+1][col] && 
                    board[row][col] === board[row+2][col] && 
                    board[row][col] === board[row+3][col]) {
                    return board[row][col];
                }
            }
        }
        
        // verifica diagonal (esquerda-cima para direita-baixo)
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] && 
                    board[row][col] === board[row+1][col+1] && 
                    board[row][col] === board[row+2][col+2] && 
                    board[row][col] === board[row+3][col+3]) {
                    return board[row][col];
                }
            }
        }
        
        // verifica diagonal (direita-cima para esquerda-baixo)
        for (let row = 3; row < 6; row++) {
            for (let col = 0; col < 4; col++) {
                if (board[row][col] && 
                    board[row][col] === board[row-1][col+1] && 
                    board[row][col] === board[row-2][col+2] && 
                    board[row][col] === board[row-3][col+3]) {
                    return board[row][col];
                }
            }
        }
        
        // verifica empate
        if (board[0].every(cell => cell !== null)) {
            return 'tie';
        }
        
        return null;
    };

export default checkWinner;