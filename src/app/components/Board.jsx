'use client';
import React, {useEffect, useMemo, useState, useRef} from 'react';
import StatusFilter from './StatusFilter.jsx';
import PriorityFilter from './PriorityFilter.jsx';
import SearchBox from './SearchBox.jsx';
import TicketList from './TicketList.jsx';
import MyQueueSummary from './MyQueueSummary.jsx';
import StatusMessage from './StatusMessage.jsx';
import {priorityOrder, statusOrder} from '../lib/severity.js';



