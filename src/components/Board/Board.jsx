import React, { useEffect, useState } from "react";
import "../Board/Board.css";
import { COLUNAS, LINHAS, PENSAMENTO_COMPUTADOR, TEMPO_CONTADOR} from "../../constants/index";
import { JogadorActual, Cell,EndGame} from "../../components/index";
import { checkWinner,GenerarCelulasEspeciais,computerMove} from "../../helpers/index";

const Board = ({ Jogador1, Jogador2, mode }) => {

    const [Jogadores] = useState(() => {
            const randomColor = Math.random() < 0.5 ? 'cor1' : 'cor2';
            return {
                jogador1: { name: Jogador1, color: randomColor },
                jogador2: { name: Jogador2, color: randomColor === 'cor1' ? 'cor2' : 'cor1' }
            };
    });

    const [board, setBoard] = useState(Array(LINHAS).fill().map(() => Array(COLUNAS).fill(null)));
    const [currentCorJogador, setCurrentCorJogador] = useState(null);
    const [winner, setWinner] = useState(null);
    const [celulasEspeciais, setCelulasEspeciais] = useState([]);
    const [timeLeft, setTimeLeft] = useState(TEMPO_CONTADOR); 
    const [isTimerActive, setIsTimerActive] = useState(true);
    const [ColunaFlutuada, setColunaFlutuada] = useState(null);


    useEffect(() => {
        setCurrentCorJogador(
            Math.random() < 0.5 ? Jogadores.jogador1.color : Jogadores.jogador2.color
        );
    }, [Jogadores]);

    useEffect(() => {
        setCelulasEspeciais(GenerarCelulasEspeciais());
    }, []);

    useEffect(() => {
        let timer;
        if (isTimerActive && timeLeft > 0 && !winner) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && !winner) {
            setCurrentCorJogador(prev => 
                prev === Jogadores.jogador1.color 
                    ? Jogadores.jogador2.color 
                    : Jogadores.jogador1.color
            );
            setTimeLeft(TEMPO_CONTADOR);
        }
        
        return () => clearInterval(timer);
    }, [timeLeft, isTimerActive, winner, Jogadores]);

    const handleColumnClick = (col) => {
        if (winner || timeLeft <= 0) return;
        
        const newBoard = [...board];
        if (newBoard[0][col] !== null) return;

        for (let row = 5; row >= 0; row--) {
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentCorJogador;
                setBoard(newBoard);

                const gameWinner = checkWinner(newBoard);
                if (gameWinner) {
                    setWinner(gameWinner === 'tie' ? 'tie' : gameWinner === Jogadores.jogador1.color? Jogadores.jogador1.name : Jogadores.jogador2.name);
                    setIsTimerActive(false);
                } else {
                    if (celulasEspeciais.includes(`${row}-${col}`)) {
                        alert("Célula especial! Joga outra vez!");
                    } else {
                        setCurrentCorJogador(currentCorJogador === Jogadores.jogador1.color? Jogadores.jogador2.color: Jogadores.jogador1.color);
                        setTimeLeft(TEMPO_CONTADOR);
                    }
                }
                break;
            }
        }
    };

    useEffect(() => {
        if (mode === "2" && currentCorJogador === Jogadores.jogador2.color && !winner) 
        {
            const timeoutId = setTimeout(() => {
                const col = computerMove(board);

                if (col !== null) {
                    handleColumnClick(col);
                }
            }, PENSAMENTO_COMPUTADOR); 
            return () => clearTimeout(timeoutId);
        }
    }, [currentCorJogador, mode, winner,board,Jogadores,handleColumnClick]);

    const handleRestartGame = () => {
        const emptyBoard = Array(LINHAS).fill().map(() => Array(COLUNAS).fill(null));
        setBoard(emptyBoard);
        setWinner(null);
        setTimeLeft(TEMPO_CONTADOR);
        setIsTimerActive(true);

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
                        tempoRestante={timeLeft}
                    />
                
                </>
            )}
            
            <div className="table-game">
                <div className="column-container">
                    {Array.from({ length: COLUNAS }).map((_, col) => (
                        <div key={col} className="column" onMouseOver={() => setColunaFlutuada(col)} onMouseOut={() => setColunaFlutuada(null)}>
                            {ColunaFlutuada === col && (
                                <div className="hover-indicator">
                                    <div className={`indicator-piece ${ Jogadores.jogador2.name === "Computador"? Jogadores.jogador1.color : currentCorJogador }`}></div>
                                </div>
                            )}
                            <div className="line-container">
                                {Array.from({ length: LINHAS }).map((_, row) => (
                                    <Cell 
                                        key={`${row}-${col}`}
                                        isEspecial={celulasEspeciais.includes(`${row}-${col}`)}
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