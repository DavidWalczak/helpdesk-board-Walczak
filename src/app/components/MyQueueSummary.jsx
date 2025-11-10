'use client';
import React, {useMemo} from 'react';

export default function MyQueueSummary({queue = {}, tickets = [], onRemove, onClear}) {
  const queuedIds = Object.keys(queue || {});
  const queuedTickets = useMemo(() => {
    const map = tickets.reduce((acc, t) => { acc[t.id] = t; return acc; }, {});
    return queuedIds.map((id) => map[id]).filter(Boolean);
  }, [queuedIds, tickets]);

  return (
    <div>
      <h3>My Queue</h3>
      <div>{queuedTickets.length} ticket(s)</div>
      {queuedTickets.length === 0 ? (
        <div style={{marginTop: 8, color: '#666'}}>Your queue is empty.</div>
      ) : (
        <div style={{marginTop: 8}}>
          <ul>
            {queuedTickets.map((t) => (
              <li key={t.id} style={{marginBottom: 6}}>
                <div style={{display: 'flex', justifyContent: 'space-between', gap: 8}}>
                  <div style={{flex: 1}}>{t.title}</div>
                  <div>
                    <button onClick={() => onRemove(t.id)}>Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div style={{marginTop: 8}}>
            <button onClick={onClear}>Clear Queue</button>
          </div>
        </div>
      )}
    </div>
  );
}
