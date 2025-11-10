'use client';
import React, { useMemo } from 'react';

export default function MyQueueSummary({ queue = {}, tickets = [], onRemove, onClear }) {
  const queuedIds = Object.keys(queue || {});
  const queuedTickets = useMemo(() => {
    const map = tickets.reduce((acc, t) => { acc[t.id] = t; return acc; }, {});
    return queuedIds.map((id) => map[id]).filter(Boolean);
  }, [queuedIds, tickets]);

  return (
    <div>
      <h3>My Queue</h3>
      <div className="small">{queuedTickets.length} ticket(s)</div>

      {queuedTickets.length === 0 ? (
        <div className="empty-message">Your queue is empty.</div>
      ) : (
        <div className="queue-list">
          <ul>
            {queuedTickets.map((t) => (
              <li key={t.id} className="queue-item">
                <div className="queue-title">{t.title}</div>
                <div>
                  <button onClick={() => onRemove(t.id)} className="btn-ghost">Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <div className="clear-wrap">
            <button onClick={onClear} className="btn-danger">Clear Queue</button>
          </div>
        </div>
      )}
    </div>
  );
}

