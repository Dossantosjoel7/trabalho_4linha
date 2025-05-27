import React, { useEffect, useState } from "react";
import "../Board/Board.css";
import { JogadorActual, Cell, EndGame } from "../../components/index";
import { checkWinner } from "../../helpers/index";

const Board = ({ Jogador1, Jogador2, mode }) => {


    
    const [Jogadores] = useState(() => {
            const randomColor = Math.random() < 0.5 ? 'cor1' : 'cor2';
            return {
                jogador1: { name: Jogador1, color: randomColor },
                jogador2: { name: Jogador2, color: randomColor === 'cor1' ? 'cor2' : 'cor1' }
            };
    });


    const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
    const [currentCorJogador, setCurrentCorJogador] = useState(Jogadores.jogador1.color);
    const [winner, setWinner] = useState(null);


    useEffect(() => {
        setCurrentCorJogador(
            Math.random() < 0.5 ? Jogadores.jogador1.color : Jogadores.jogador2.color
        );
    }, [Jogadores]);

    const handleColumnClick = (col) => {
        if (winner) return;
        
        const newBoard = [...board];
        if (newBoard[0][col] !== null) return;

        for (let row = 5; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentCorJogador;
                setBoard(newBoard);
                
                const gameWinner = checkWinner(newBoard);
                if (gameWinner) {
                    setWinner(gameWinner === 'tie' ? 'tie' : gameWinner === Jogadores.jogador1.color? Jogadores.jogador1.name : Jogadores.jogador2.name);
                } else {
                    setCurrentCorJogador(currentCorJogador === 'cor1' ? 'cor2' : 'cor1');
                }
                break;
            }
        }
    };

    const handleRestartGame = () => {
        const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
        setBoard(emptyBoard);
        setWinner(null);

        // Sortear novamente quem começa (mantendo as cores)
        const newStartingPlayerColor = Math.random() < 0.5 
            ? Jogadores.jogador1.color 
            : Jogadores.jogador2.color;

        setCurrentCorJogador(newStartingPlayerColor);
    };

    return (
        <>
            {winner ? (
                <EndGame 
                    winner={winner === 'tie' ? null : winner} 
                    onRestart={handleRestartGame}
                />
            ) : (
                <>
                    <JogadorActual 
                        jogador={currentCorJogador === Jogadores.jogador1.color? Jogadores.jogador1.name : Jogadores.jogador2.name} 
                        color={currentCorJogador} 
                        onRestart={handleRestartGame}
                    />
                </>
            )}
            
            <div className="table-game">
                <div className="column-container">
                    {Array.from({ length: 7 }).map((_, col) => (
                        <div key={col} className="column">
                            <div className="line-container">
                                {Array.from({ length: 6 }).map((_, row) => (
                                    <Cell 
                                        key={`${row}-${col}`} 
                                        value={board[row][col]} 
                                        onClick={mode === "2" && currentCorJogador === Jogadores.jogador1.color? () => handleColumnClick(col): mode === "1"? () => handleColumnClick(col): undefined}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Board;