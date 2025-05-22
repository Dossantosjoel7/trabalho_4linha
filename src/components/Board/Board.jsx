import React, { useEffect, useState } from "react";
import "../Board/Board.css";
import {JogadorActual, Cell} from "../../components/index";

const Board = ({Jogador1,Jogador2,mode}) => {


    const [Jogadores] = useState({
        jogador1: {
            name: Jogador1,
            color: Math.random() < 0.5 ? 'cor1' : 'cor2'
        },
        jogador2: {
            name: Jogador2,
            color: Math.random() < 0.5 ? 'cor2' : 'cor1'
        }
    });

    const [board, setBoard] = useState(Array(6).fill().map(() => Array(7).fill(null)));
    const [currentCorJogador, setCurrentCorJogador] = useState(Jogadores.jogador1.color);
    

    useEffect(() => {
        const startingColor = Math.random() < 0.5 ? 'cor1' : 'cor2';
        setCurrentCorJogador(startingColor);
    }, []);

    const handleColumnClick = (col) => {
        let row;
        const newBoard = [...board];

        if (newBoard[0][col] !== null) {
           // alert("Esta coluna está cheia! Escolha outra.");
            return;
        }

        for (row = 5; row >= 0; row--) {
        
            if (!newBoard[row][col]) {
                newBoard[row][col] = currentCorJogador;
                setBoard(newBoard);
                setCurrentCorJogador(currentCorJogador === 'cor1' ? 'cor2' : 'cor1');
                break
            }
     }}

     const handleRestartGame = () => {
        const emptyBoard = Array(6).fill().map(() => Array(7).fill(null));
        setBoard(emptyBoard);
    
        // Sortear novamente quem começa (mantendo as cores)
        const newStartingPlayerColor = Math.random() < 0.5
            ? Jogadores.jogador1.color
            : Jogadores.jogador2.color;
    
        setCurrentCorJogador(newStartingPlayerColor);
    };



    
    return(
        <>
            <JogadorActual jogador={currentCorJogador === Jogadores.jogador1.color ? Jogadores.jogador1.name: Jogadores.jogador2.name} color={currentCorJogador} onRestart={handleRestartGame}/>
            <div class="table-game">
                <div className="column-container">
                        {Array.from({ length: 7 }).map((_, col) => (
                            <div key={col} className="column">
                                <div className="line-container">
                                    {Array.from({ length: 6 }).map((_, row) => (
                                        <Cell key={`${row}-${col}`} value={board[row][col]} onClick={() => handleColumnClick(col)}/>
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