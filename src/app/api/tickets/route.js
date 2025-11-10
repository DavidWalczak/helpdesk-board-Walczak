export async function GET() {
  const tickets = [
    {
      id: 't-1001',
      title: 'Cannot connect to VPN',
      description: 'User reports intermittent VPN connectivity errors.',
      priority: 'High',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-10-31T14:05:00Z'
    },
    {
      id: 't-1002',
      title: 'Email not syncing',
      description: 'Mobile email client not syncing new messages.',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Alex R.',
      updatedAt: '2025-11-01T09:12:00Z'
    },
    {
      id: 't-1003',
      title: 'Slow laptop',
      description: 'Laptop is very slow after the last update.',
      priority: 'Low',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-10-30T08:45:00Z'
    },
    {
      id: 't-1004',
      title: 'Cannot print to network printer',
      description: 'Printer returns a network timeout error.',
      priority: 'High',
      status: 'On Hold',
      assignee: 'J. Kim',
      updatedAt: '2025-11-02T16:30:00Z'
    },
    {
      id: 't-1005',
      title: 'Software license expired',
      description: 'Activation fails for design software.',
      priority: 'Critical',
      status: 'Open',
      assignee: 'Unassigned',
      updatedAt: '2025-11-03T11:05:00Z'
    },
    {
      id: 't-1006',
      title: 'Two-factor auth problems',
      description: 'User cannot receive 2FA SMS codes.',
      priority: 'High',
      status: 'In Progress',
      assignee: 'M. Patel',
      updatedAt: '2025-11-04T07:22:00Z'
    },
    {
      id: 't-1007',
      title: 'VPN split tunneling request',
      description: 'Request to add split tunneling for a vendor tool.',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Security Team',
      updatedAt: '2025-10-28T13:00:00Z'
    },
    {
      id: 't-1008',
      title: 'Database backup failing',
      description: 'Nightly backups fail on server db-prod-2.',
      priority: 'Critical',
      status: 'In Progress',
      assignee: 'DBA',
      updatedAt: '2025-11-05T02:10:00Z'
    },
    {
      id: 't-1009',
      title: 'Website 502 errors',
      description: 'Intermittent 502 gateway errors on public site.',
      priority: 'High',
      status: 'Open',
      assignee: 'Platform Team',
      updatedAt: '2025-11-04T19:40:00Z'
    },
    {
      id: 't-1010',
      title: 'Keyboard replacement',
      description: 'Mechanical keyboard keys are failing.',
      priority: 'Low',
      status: 'Resolved',
      assignee: 'Facilities',
      updatedAt: '2025-10-27T12:00:00Z'
    },
    {
      id: 't-1011',
      title: 'Access request for HR folder',
      description: 'New hire needs access to HR shared folder.',
      priority: 'Medium',
      status: 'On Hold',
      assignee: 'IT Ops',
      updatedAt: '2025-11-02T10:25:00Z'
    },
    {
      id: 't-1012',
      title: 'Monitor flickering',
      description: 'External monitor flickers when connected via dock.',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Unassigned',
      updatedAt: '2025-11-03T14:47:00Z'
    },
    {
      id: 't-1013',
      title: 'Password reset',
      description: 'User locked out after multiple failed logins.',
      priority: 'Medium',
      status: 'Resolved',
      assignee: 'Helpdesk',
      updatedAt: '2025-11-01T15:00:00Z'
    },
    {
      id: 't-1014',
      title: 'Mobile app crash on launch',
      description: 'Corporate mobile app crashes on Android 12.',
      priority: 'High',
      status: 'Open',
      assignee: 'Mobile Team',
      updatedAt: '2025-11-06T08:16:00Z'
    }
  ];
  return Response.json(tickets);
}