import React from "react";
import "../JogadorActual/JogadorActual.css"
import {formatTime } from "../../helpers/index";


const JogadorActual = ({jogador,color,onRestart,tempoRestante}) => {
    color = color === "cor1"? "var(--ColorJogador1)": "var(--ColorJogador2) ";
    return (
        <div className="status">
            <div className="status-color">
                <span style={{backgroundColor:color, borderColor:color}}></span>
                <p>É a sua vez {jogador}</p>
                <strong>⏱️{formatTime(tempoRestante)}s</strong>
            </div>
            <button type="button" className="btn btn-danger btn-sm" onClick={onRestart} >Reiniciar Jogada</button>
        </div>
    );
};

export default JogadorActual;