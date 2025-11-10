'use client';
import React from 'react';

export default function SearchBox({ value, onChange }) {
  return (
    <label className="search-control">
      <span>Search</span>
      <input
        type="search"
        placeholder="Search title or description..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-box"
      />
    </label>
  );
}
