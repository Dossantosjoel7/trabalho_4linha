import React, { useState } from "react";
import "../Menu/Menu.css"
import Board from "../Board/Board";


const Menu = () => {
    const [Jogador1, setJogador1] = useState('');
    const [Jogador2, setJogador2] = useState('');
    const [mode, setMode] = useState('0');
    const [gameStarted, setGameStarted] = useState(false);

    const handleStartGame = () => {

        if(mode === "0"){
            alert("Por Favor, Escolha umas das opções!");
            return;
        }
        if (!Jogador1) {
            alert("Por Favor, insira o nome do Jogador 1.");
            return;
        }
        if (mode === "1" && !Jogador2) {
            alert("Por Favor, insira o nome do Jogador 2.");
            return;
        }

        if(mode === "2"){setJogador2("Computador");}

        setGameStarted(true);
    };
    
    const ResetarGame = () => {
        setJogador1("");
        setJogador2("");
        setMode('0');
        setGameStarted(false);
    }

    return(
        <div className="container">
            <div className="menu">
                <header>
                    <h1>4Linha</h1>
                    <h2>Trabalho Ls</h2>
                </header>
                <main>
                    <fieldset>
                        <label className="mb-3" htmlFor="btPlayers" id="textmode">Modo de Jogo:</label>
                            <select className="form-select" id="btPlayers" disabled = {gameStarted} value={mode} onChange={(e) => setMode(e.target.value)}>
                                <option selected value="0"> Seleccione...</option>
                                <option value="1">Humano vs Humano</option>
                                <option value="2">Humano vs Computador</option>
                            </select>
                    </fieldset>
                    <fieldset className="mt-5">
                        {
                            mode === '0' ? (<></>):(
                            mode === '1' ? (
                                <>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="#">Jogador 1</span>
                                        <input type="text" className="form-control" placeholder="Jogador1" aria-label="Jogador1" disabled = {gameStarted} value={Jogador1} onChange={(e) => setJogador1(e.target.value)}/>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" id="#">Jogador 2</span>
                                        <input type="text" className="form-control" placeholder="Jogador2" aria-label="Jogador2" disabled = {gameStarted} value={Jogador2} onChange={(e) => setJogador2(e.target.value)}/>
                                    </div>
                                </>
                            ) : (
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="#">Jogador</span>
                                    <input type="text" className="form-control" placeholder="Jogador" aria-label="Jogador" disabled = {gameStarted} value={Jogador1} onChange={(e) => setJogador1(e.target.value)}/>
                                </div>
                            ))
                        }
                            <button type="button" className="btn btn-success w-100" disabled = {gameStarted} onClick={handleStartGame}>Iniciar Jogo</button>   
                            {gameStarted? (<button type="button" id="Buttom-Resetar" onClick={ResetarGame} className="btn btn-light btn-sm" >Recetar o Jogo</button>) : <></>}  
                    </fieldset>
                </main>
                <footer>2024-2025 ©Bernardo-Gonçalo-Joel</footer>
            </div>
            <div class="panel-game">
                {!gameStarted ? (
                   <></>
                ) : (
                    <Board Jogador1={Jogador1} Jogador2={Jogador2} mode={mode}/>
                )}
            </div>
        </div>
    );
};

export default Menu;