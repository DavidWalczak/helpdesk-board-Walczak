'use client';
import React from 'react';
export default function PriorityFilter({value, onChange}) {
    return (
        <label>
            <span style={{display: 'block', fontSize: 12}}>Priority</span>
            <select value={value} onChange={(e) => onChange(e.target.value)}>
                <option>All</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
            </select>
        </label>
    );
}