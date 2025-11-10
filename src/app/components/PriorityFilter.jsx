'use client';
import React from 'react';

export default function PriorityFilter({ value, onChange }) {
  return (
    <label className="filter-label">
      <span>Priority</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="filter-select">
        <option>All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
        <option>Critical</option>
      </select>
    </label>
  );
}
