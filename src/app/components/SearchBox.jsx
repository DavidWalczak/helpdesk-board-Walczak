'use client';
import React from 'react';
export default function SearchBox({value, onChange}) {
    return (
    <label style={{flex: 1}}>
        <span style={{display: 'block', fontSize: 12}}>Search</span>
        <input
            type="search"
            placeholder="Search title or description..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={{width: '100%'}}
        />
    </label>
);
}