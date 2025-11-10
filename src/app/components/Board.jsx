'use client';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import StatusFilter from './StatusFilter.jsx';
import PriorityFilter from './PriorityFilter.jsx';
import SearchBox from './SearchBox.jsx';
import TicketList from './TicketList.jsx';
import MyQueueSummary from './MyQueueSummary.jsx';
import StatusMessage from './StatusMessage.jsx';
import { priorityOrder, statusOrder } from '../lib/severity.js';

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Open', 'In Progress', 'On Hold', 'Resolved'];

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});
  const liveRef = useRef(null);

  // Fetch tickets
  useEffect(() => {
    fetch('/api/tickets')
      .then(r => r.json())
      .then(data => {
        setTickets(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load tickets');
        setLoading(false);
      });
  }, []);

  // Filtered tickets
  const visibleTickets = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tickets.filter(t => {
      if (filters.status !== 'All' && t.status !== filters.status) return false;
      if (filters.priority !== 'All' && t.priority !== filters.priority) return false;
      if (s.length > 0) {
        const inTitle = t.title.toLowerCase().includes(s);
        const inDesc = t.description.toLowerCase().includes(s);
        return inTitle || inDesc;
      }
      return true;
    });
  }, [tickets, filters, search]);

  // Queue management
  const handleAddToQueue = (id) => setQueue(q => ({ ...q, [id]: true }));
  const handleRemoveFromQueue = (id) => setQueue(q => {
    const copy = { ...q };
    delete copy[id];
    return copy;
  });
  const handleClearQueue = () => setQueue({});

  return (
    <section className="board-root">
      <div>
        <div className="controls-row">
          <StatusFilter value={filters.status} onChange={v => setFilters(f => ({ ...f, status: v }))} />
          <PriorityFilter value={filters.priority} onChange={v => setFilters(f => ({ ...f, priority: v }))} />
          <SearchBox value={search} onChange={setSearch} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={!loading && visibleTickets.length === 0} />
        <TicketList tickets={visibleTickets} onAddToQueue={handleAddToQueue} queue={queue} />
      </div>

      <aside className="aside-panel">
        <MyQueueSummary queue={queue} tickets={tickets} onRemove={handleRemoveFromQueue} onClear={handleClearQueue} />
      </aside>
    </section>
  );
}
