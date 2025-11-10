'use client';
import React from 'react';

export default function StatusFilter({value, onChange}) {
    return (
        <label>
            <span style={{display: 'block', fontSize: 12}}>Status</span>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option>All</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>On Hold</option>
                <option>Resolved</option>
            </select>
        </label>
    );
}