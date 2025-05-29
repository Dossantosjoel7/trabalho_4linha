import "../constants/index.js";
import { COLUNAS, LINHAS } from "../constants/index.js";

const GenerarCelulasEspeciais = () => {
    const especiais = [];
    while (especiais.length < 5) {
        const li = Math.floor(Math.random() * LINHAS);
        const col = Math.floor(Math.random() * COLUNAS);
        const key = `${li}-${col}`;
        if (!especiais.includes(key)) especiais.push(key);
    }
    return especiais;
}   


export default GenerarCelulasEspeciais;