import React from 'react';
import Board from './components/Board.jsx';

export default function Page() {
  return (
    <main className="main">
      <header>
        <h1>Support Ticket Board</h1>
      </header>

      <Board />
    </main>
  );
}

