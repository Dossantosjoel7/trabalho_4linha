import React from "react";

const cell = ({value,isEspecial,onClick}) => {
    return (
        <div className={`line ${isEspecial ? 'especial' : ''} ${value === 'roxo' ? 'roxo' : value === 'vermelho' ? 'vermelho' : ''}`} onClick={onClick}></div>
    );
}

export default cell;