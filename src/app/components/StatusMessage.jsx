'use client';
import React from 'react';

export default function StatusMessage({ loading, error, isEmpty }) {
  if (loading) return <div className="status-message">Loading…</div>;
  if (error) return <div className="status-message error">Unable to load tickets.</div>;
  if (isEmpty) return <div className="status-message">No tickets match your filters.</div>;
  return null;
}
