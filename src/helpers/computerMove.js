const computerMove = (board) => {
    // Encontrar colunas válidas (não cheias)
    const validColumns = board[0]
        .map((cell, index) => (cell === null ? index : null))
        .filter(col => col !== null);
    
    // Escolher uma coluna aleatória entre as válidas
    if (validColumns.length === 0) return null; // Tabuleiro cheio (improvável, pois empate já é verificado)
    return validColumns[Math.floor(Math.random() * validColumns.length)];
};

export default computerMove;