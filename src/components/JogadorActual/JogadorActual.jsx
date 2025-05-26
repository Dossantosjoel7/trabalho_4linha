import React from "react";
import "../JogadorActual/JogadorActual.css"


const JogadorActual = ({jogador,color,onRestart,tempoRestante}) => {
    color = color === "roxo"? "var(--ColorJogador1)": "var(--ColorJogador2) ";
    return (
        <div className="status">
            <div className="status-color">
                <span style={{backgroundColor:color, borderColor:color}}></span>
                <p>É a sua vez {jogador}</p>
                <strong> ⏱️ Tempo restante: {tempoRestante}s</strong>
            </div>
            <button type="button" className="btn btn-danger btn-sm" onClick={onRestart} >Reiniciar</button>
        </div>
    );
};

export default JogadorActual;