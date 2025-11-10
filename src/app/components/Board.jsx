'use client';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import StatusFilter from './StatusFilter.jsx';
import PriorityFilter from './PriorityFilter.jsx';
import SearchBox from './SearchBox.jsx';
import TicketList from './TicketList.jsx';
import MyQueueSummary from './MyQueueSummary.jsx';
import StatusMessage from './StatusMessage.jsx';
import {priorityOrder, statusOrder} from '../lib/severity.js';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const PRIORITIES = ['Low', 'Medium', 'High', 'Critical'];
const STATUSES = ['Open', 'In Progress', 'On Hold', 'Resolved'];

export default function Board() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({status: 'All', priority: 'All'});
  const [search, setSearch] = useState('');
  const [queue, setQueue] = useState({});

  // fetch on mount
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

  // live updates: use recursive timeout to vary interval 6-10s
  const liveRef = useRef(null);
  useEffect(() => {
    let canceled = false;

    function applyRandomChange() {
      setTickets((prev) => {
        if (!prev || prev.length === 0) return prev;
        const copy = prev.map((t) => ({...t}));
        const idx = Math.floor(Math.random() * copy.length);
        const target = copy[idx];
        // randomly change status or priority
        if (Math.random() < 0.5) {
          // change status realistically
          const currentIndex = STATUSES.indexOf(target.status);
          // try move forward if possible, else random
          const possible = [];
          if (currentIndex >= 0 && currentIndex < STATUSES.length - 1) {
            possible.push(STATUSES[currentIndex + 1]);
          }
          // sometimes bounce to a random status
          if (Math.random() < 0.2) {
            possible.push(STATUSES[Math.floor(Math.random() * STATUSES.length)]);
          }
          if (possible.length > 0) {
            target.status = possible[Math.floor(Math.random() * possible.length)];
          }
        } else {
          // change priority realistically
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

  // derived visibleTickets
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
    setQueue((q) => ({...q, [ticketId]: true}));
  }

  function handleRemoveFromQueue(ticketId) {
    setQueue((q) => {
      const copy = {...q};
      delete copy[ticketId];
      return copy;
    });
  }

  function handleClearQueue() {
    setQueue({});
  }

  return (
    <section style={{display: 'grid', gap: 16, gridTemplateColumns: '1fr 320px', alignItems: 'start'}}>
      <div>
        <div style={{display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12}}>
          <StatusFilter value={filters.status} onChange={(v) => setFilters((f) => ({...f, status: v}))} />
          <PriorityFilter value={filters.priority} onChange={(v) => setFilters((f) => ({...f, priority: v}))} />
          <SearchBox value={search} onChange={(v) => setSearch(v)} />
        </div>

        <StatusMessage loading={loading} error={error} isEmpty={!loading && visibleTickets.length === 0} />

        <TicketList tickets={visibleTickets} onAddToQueue={handleAddToQueue} queue={queue} />
      </div>

      <aside style={{borderLeft: '1px solid #eee', paddingLeft: 16}}>
        <MyQueueSummary
          queue={queue}
          tickets={tickets}
          onRemove={handleRemoveFromQueue}
          onClear={handleClearQueue}
        />
      </aside>
    </section>
  );
}
