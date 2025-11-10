'use client';
import React from 'react';

export default function StatusMessage({loading, error, isEmpty}) {
  if (loading) return <div style={{padding: 12}}>Loading…</div>;
  if (error) return <div style={{padding: 12, color: 'red'}}>Unable to load tickets.</div>;
  if (isEmpty) return <div style={{padding: 12}}>No tickets match your filters.</div>;
  return null;
}
