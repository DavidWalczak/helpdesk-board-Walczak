import React from 'react';
import Board from './components/Board.jsx';

export default function Page() {
  return (
    <main style={{padding: 24, fontFamily: 'Inter, system-ui, sans-serif'}}>
      <h1>Support Ticket Board</h1>
      <Board />
    </main>
  );
}