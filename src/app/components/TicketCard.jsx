'use client';
import React from 'react';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
}

export default function TicketCard({ ticket, onAddToQueue, queued }) {
  return (
    <article className="ticket-card panel">
      <div className="ticket-top">
        <div>
          <div className="title">{ticket.title}</div>
          <div className="description">{ticket.description}</div>
        </div>

        <div className="ticket-meta">
          <div>Priority: <em>{ticket.priority}</em></div>
          <div>Status: <em>{ticket.status}</em></div>
          <div>Assignee: {ticket.assignee}</div>
          <div className="updated">Updated: {formatDate(ticket.updatedAt)}</div>
        </div>
      </div>

      <div className="card-actions">
        <button className={queued ? 'btn-ghost' : 'btn-primary'} onClick={() => onAddToQueue(ticket.id)} disabled={queued}>
          {queued ? 'Added to My Queue' : 'Add to My Queue'}
        </button>
        {queued && <div className="small">Already in your queue</div>}
      </div>
    </article>
  );
}

