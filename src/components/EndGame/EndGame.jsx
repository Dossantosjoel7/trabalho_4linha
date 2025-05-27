import React from 'react';

const EndGame = ({ winner,isDraw, onRestart }) => {
  return (
    <div
      className="endgame-screen"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        position: 'absolute',
        top: 186,
        left: 706,
        width: '820px',
        height: '570px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        {winner ? `🎉 ${winner} venceu o jogo!` : '🤝 Empate!'}
      </h1>

      <button
        onClick={onRestart}
        style={{
          padding: '0.8rem 1.5rem',
          fontSize: '1.2rem',
          borderRadius: '12px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Jogar Novamente
      </button>
    </div>
  );
};

export default EndGame;