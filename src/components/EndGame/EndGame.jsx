import React from 'react';

const EndGame = ({ winner, resetGame }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center w-full max-w-md">
                <h1 className="text-4xl font-bold mb-4">
                    {winner ? `${winner} Venceu! 🎉` : 'Empate! 🤝'}
                </h1>
                <p className="text-lg mb-6">Obrigado por jogar!</p>
                <button
                    onClick={resetGame}
                    className="w-full py-2 text-lg rounded-xl bg-blue-500 hover:bg-blue-600 transition-all"
                >
                    Jogar Novamente
                </button>
            </div>
        </div>
    );
};

export default EndGame;