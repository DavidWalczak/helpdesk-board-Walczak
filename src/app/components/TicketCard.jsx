'use client';
import React from 'react';

function smallDate(iso) {
    try {
        return new Date(iso).toLocaleString();
    } catch (e) { return iso; }
}

export default function TicketCard({ticket, onAddToQueue, queued}) {
    return (
        <div style={{border: '1px solid #ddd', padding: 12, borderRadius: 6}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div>
                    <strong>{ticket.title}</strong>
                    <div style={{fontSize: 13, color: '#555'}}>{ticket.description}</div>
                </div>
                <div style={{textAlign: 'right'}}>
                    <div>Priority: <em>{ticket.priority}</em></div>
                    <div>Status: <em>{ticket.status}</em></div>
                    <div>Assignee: {ticket.assignee}</div>
                    <div style={{fontSize: 11, color: '#888'}}>Updated: {smallDate(ticket.updatedAt)}</div></div>
                </div>
            <div style={{marginTop: 8, display: 'flex', gap: 8, alignItems: 'center'}}>
                <button onClick={() => onAddToQueue(ticket.id)} disabled={queued}>
                    {queued ? 'Added to My Queue' : 'Add to My Queue'}
                </button>
                {queued && <div style={{fontSize: 12, color: '#666'}}>Already in your queue</div>}
            </div>
        </div>
    );
}