const generateSpecialCells = () => {
    const cells = [];
    while (cells.length < 5) {
        const row = Math.floor(Math.random() * 6);
        const col = Math.floor(Math.random() * 7);
        const key = `${row}-${col}`;
        if (!cells.includes(key)) cells.push(key);
    }
    return cells;
};

export default generateSpecialCells;