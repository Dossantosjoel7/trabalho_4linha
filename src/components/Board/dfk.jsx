import React, { useEffect, useRef, useState } from "react";
import "../Board/Board.css"
import {generateSpecialCells , checkWin,computerMove} from "../../helpers/index"
import {JogadorActual, Cell,EndGame} from "../../components/index"


const Board = ({Jogador1,Jogador2,mode}) => {
    
    const [Jogadores] = useState(() => {
        const randomColor = Math.random() < 0.5 ? 'roxo' : 'vermelho';
        return {
            jogador1: { name: Jogador1, color: randomColor },
            jogador2: { name: Jogador2, color: randomColor === 'roxo' ? 'vermelho' : 'roxo' }
        };
    });

    const [currentCorJogador, setCurrentCorJogador] = useState(null);
    const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
    const [specialCells, setSpecialCells] = useState([]);
    const [tempoRestante, setTempoRestante] = useState(10);
    const timerRef = useRef(null);
    const [winner, setWinner] = useState(null);
    const [isDraw, setIsDraw] = useState(false); // Novo estado para empate

    useEffect(() => {
        setCurrentCorJogador(
            Math.random() < 0.5 ? Jogadores.jogador1.color : Jogadores.jogador2.color
        );
    }, [Jogadores]);

    useEffect(() => {
        setSpecialCells(generateSpecialCells());
    }, []);

    useEffect(() => {
        setTempoRestante(10);
        timerRef.current = setInterval(() => {
            setTempoRestante(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setCurrentCorJogador(
                        currentCorJogador === Jogadores.jogador1.color
                            ? Jogadores.jogador2.color
                            : Jogadores.jogador1.color
                    );
                    return 10;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timerRef.current);
    }, [currentCorJogador, Jogadores.jogador1.color, Jogadores.jogador2.color]);

        useEffect(() => {
            if (
                mode === "2" &&
                currentCorJogador === Jogadores.jogador2.color &&
                !winner &&
                !isDraw
            ) {
                const timeoutId = setTimeout(() => {
                    const col = computerMove(board);
                    if (col !== null) {
                        handleColumnClick(col);
                    }
                }, 600); // Atraso de 500ms para simular "pensamento"
                return () => clearTimeout(timeoutId);
            }
        }, [currentCorJogador, mode, winner, isDraw, board,Jogadores]);

    const handleColumnClick = (col) => {
            let row;
            const newBoard = [...board];
            if (newBoard[0][col] !== null) {
                return;
            }
            for (row = 5; row >= 0; row--) {
                if (!newBoard[row][col]) {
                    newBoard[row][col] = currentCorJogador;
                    setBoard(newBoard);
                    const cellKey = `${row}-${col}`;
                    const winningPlayer = checkWin(newBoard);
                    if (winningPlayer) {
                        setWinner(winningPlayer === Jogadores.jogador1.color ? Jogadores.jogador1.name : Jogadores.jogador2.name);
                        setIsDraw(false); // Garante que não é empate
                        clearInterval(timerRef.current);
                        return;
                    }
                    if (newBoard.every(row => row.every(cell => cell !== null))) {
                        setWinner(null);
                        setIsDraw(true); // Marca como empate
                        clearInterval(timerRef.current);
                        return;
                    }
                    if (specialCells.includes(cellKey)) {
                        alert("Célula especial! Joga outra vez!");
                    } else {
                        setCurrentCorJogador(
                            currentCorJogador === Jogadores.jogador1.color
                                ? Jogadores.jogador2.color
                                : Jogadores.jogador1.color
                        );
                        setTempoRestante(10);
                    }
                    break;
                }
            }
        };

     const handleRestartGame = () => {
        const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
        setBoard(emptyBoard);
        setWinner(null);
        setIsDraw(false); // Reseta o estado de empate

        // Sortear novamente quem começa (mantendo as cores)
        const newStartingPlayerColor = Math.random() < 0.5
            ? Jogadores.jogador1.color
            : Jogadores.jogador2.color;
    
        setCurrentCorJogador(newStartingPlayerColor);
        setTempoRestante(10);
    };



    
    return(
        <>
            {!winner && !isDraw && (
                <JogadorActual
                    jogador={currentCorJogador === Jogadores.jogador1.color ? Jogadores.jogador1.name : Jogadores.jogador2.name}
                    color={currentCorJogador}
                    onRestart={handleRestartGame}
                    tempoRestante={tempoRestante}
                />
            )}

            <div className="table-game">
                <div className="column-container">
                        {Array.from({ length: 7 }).map((_, col) => (
                            <div key={col} className="column">
                                <div className="line-container">
                                    {Array.from({ length: 6 }).map((_, row) => (
                                        <Cell key={`${row}-${col}`}
                                              isEspecial={specialCells.includes(`${row}-${col}`)}
                                              value={board[row][col]}
                                              onClick={ mode === "2" && currentCorJogador === Jogadores.jogador1.color? () => handleColumnClick(col): mode === "1"? () => handleColumnClick(col): undefined}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {(winner || isDraw) && (
                <EndGame
                    winner={winner}
                    isDraw={isDraw} // Passa o estado de empate
                    onRestart={handleRestartGame}
                />
            )}
        </>
    );
};

export default Board;