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

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ status: 'All', priority: 'All' });
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});

  // fetch tickets on mount
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetch('/api/tickets')
      .then((r) => {
        if (!r.ok) throw new Error('Network error');
        return r.json();
      })
      .then((data) => {
        if (!mounted) return;
        setTickets(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err.message || 'Unable to load');
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  // simulate live updates every 6-10s (recursive timeout)
  const liveRef = useRef(null);
  useEffect(() => {
    let canceled = false;

    function applyRandomChange() {
      setTickets((prev) => {
        if (!prev || prev.length === 0) return prev;
        const copy = prev.map((t) => ({ ...t }));
        const idx = Math.floor(Math.random() * copy.length);
        const target = copy[idx];

        if (Math.random() < 0.5) {
          // try realistic status progression
          const currentIndex = STATUSES.indexOf(target.status);
          const possible = [];
          if (currentIndex >= 0 && currentIndex < STATUSES.length - 1) {
            possible.push(STATUSES[currentIndex + 1]);
          }
          if (Math.random() < 0.2) {
            possible.push(STATUSES[Math.floor(Math.random() * STATUSES.length)]);
          }
          if (possible.length > 0) {
            target.status = possible[Math.floor(Math.random() * possible.length)];
          }
        } else {
          // escalate priority occasionally
          const pIndex = PRIORITIES.indexOf(target.priority);
          const possible = [];
          if (pIndex >= 0 && pIndex < PRIORITIES.length - 1) {
            possible.push(PRIORITIES[pIndex + 1]);
          }
          if (Math.random() < 0.15) {
            possible.push(PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)]);
          }
          if (possible.length > 0) {
            target.priority = possible[Math.floor(Math.random() * possible.length)];
          }
        }

        target.updatedAt = new Date().toISOString();
        return copy;
      });

      if (canceled) return;
      const next = randomBetween(6000, 10000);
      liveRef.current = setTimeout(applyRandomChange, next);
    }

    liveRef.current = setTimeout(applyRandomChange, randomBetween(6000, 10000));

    return () => {
      canceled = true;
      if (liveRef.current) clearTimeout(liveRef.current);
    };
  }, []);

  // derive visibleTickets from filters and search
  const visibleTickets = useMemo(() => {
    const s = search.trim().toLowerCase();
    return tickets.filter((t) => {
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

  function handleAddToQueue(ticketId) {
    setQueue((q) => ({ ...q, [ticketId]: true }));
  }

  function handleRemoveFromQueue(ticketId) {
    setQueue((q) => {
      const copy = { ...q };
      delete copy[ticketId];
      return copy;
    });
  }

  function handleClearQueue() {
    setQueue({});
  }

  return (
    <section className="board-root">
      <div className="panel">
        <div className="controls-row">
          <StatusFilter value={filters.status} onChange={(v) => setFilters((f) => ({ ...f, status: v }))} />
          <PriorityFilter value={filters.priority} onChange={(v) => setFilters((f) => ({ ...f, priority: v }))} />
          <SearchBox value={search} onChange={(v) => setSearch(v)} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={!loading && visibleTickets.length === 0} />

        <TicketList tickets={visibleTickets} onAddToQueue={handleAddToQueue} queue={queue} />
      </div>

      <aside className="aside-panel panel">
        <MyQueueSummary queue={queue} tickets={tickets} onRemove={handleRemoveFromQueue} onClear={handleClearQueue} />
      </aside>
    </section>
  );
}

