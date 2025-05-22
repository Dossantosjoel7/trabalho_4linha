import React from "react";

const cell = ({value,onClick}) => {
    return (
        <div className={`line  ${value === 'cor1' ? 'cor1' : value === 'cor2' ? 'cor2' : ''}`} onClick={onClick}></div>
    );
}

export default cell;