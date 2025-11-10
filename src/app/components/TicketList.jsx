'use client';
import React from 'react';
import TicketCard from './TicketCard.jsx';
export default function TicketList({tickets, onAddToQueue, queue}) {
    return (
        <div style={{display: 'grid', gap: 8}}>
            {tickets.map((t) => (
                <TicketCard key={t.id} ticket={t} onAddToQueue={onAddToQueue} queued={!! queue[t.id]} />
            ))}
        </div>
    );
}