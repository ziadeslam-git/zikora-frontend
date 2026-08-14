"use client";
import React, { useState, useMemo } from 'react';
import DiffModal from './DiffModal';

interface AuditLog {
  id: string;
  action: string;
  entity: string;
  user: string;
  date: string;
  status: 'Success' | 'Failed';
  oldValuesJson: string;
  newValuesJson: string;
}

const mockLogs: AuditLog[] = Array.from({ length: 50 }, (_, i) => ({
  id: `LOG-${8000 + i}`,
  action: ['CREATE', 'UPDATE', 'DELETE', 'LOGIN'][i % 4],
  entity: ['Teacher', 'Student', 'Payment', 'System'][i % 4],
  user: `admin${(i % 3) + 1}@zikora.edu`,
  date: new Date(new Date().getTime() - i * 3600000 * 24).toISOString().replace('T', ' ').split('.')[0],
  status: i % 10 === 0 ? 'Failed' : 'Success',
  oldValuesJson: JSON.stringify({ status: 'Pending', role: 'User', amount: 100 }, null, 2),
  newValuesJson: JSON.stringify({ status: 'Active', role: 'Admin', amount: 150 }, null, 2),
}));

export default function AuditLogPage() {
  const [logs] = useState<AuditLog[]>(mockLogs);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const pageSize = 10;

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return logs.filter(l => 
      l.action.toLowerCase().includes(s) || 
      l.entity.toLowerCase().includes(s) || 
      l.user.toLowerCase().includes(s)
    );
  }, [logs, search]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success': return 'bg-green-500';
      case 'Failed': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Audit Log</h1>
      </div>

      <div className="bg-white dark:bg-bg-base rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-theme p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by action, entity, user..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-bg-surface-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/50 text-gray-900 dark:text-white"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Log ID</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Action</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Entity</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">User</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Status</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500">Date</th>
                <th className="py-3 px-4 text-xs font-semibold text-gray-500 text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((log) => (
                <tr 
                  key={log.id} 
                  className="group hover:bg-gray-50/50 dark:hover:bg-bg-surface-2/30 transition-colors rounded-xl"
                >
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium rounded-l-2xl font-mono">{log.id}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">{log.action}</td>
                  <td className="py-4 px-4 text-sm font-bold text-gray-900 dark:text-white">{log.entity}</td>
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium">{log.user}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2 px-2 py-1">
                      <span className={`w-2 h-2 rounded-full ${getStatusColor(log.status)}`}></span>
                      <span className="text-sm text-gray-900 dark:text-white font-medium">{log.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 font-medium">{log.date}</td>
                  <td className="py-4 px-4 text-right rounded-r-2xl">
                    <button 
                      onClick={() => setSelectedLog(log)}
                      className="text-sm font-bold text-accent-500 hover:text-accent-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-accent-50 dark:hover:bg-accent-500/10"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 font-medium">No audit logs found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="pt-6 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-900 dark:text-white">{(page - 1) * pageSize + 1}</span> to <span className="font-bold text-gray-900 dark:text-white">{Math.min(page * pageSize, filtered.length)}</span> of <span className="font-bold text-gray-900 dark:text-white">{filtered.length}</span> results
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <DiffModal
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
        oldValues={selectedLog?.oldValuesJson || ''}
        newValues={selectedLog?.newValuesJson || ''}
        entity={selectedLog?.entity || ''}
        action={selectedLog?.action || ''}
      />
    </div>
  );
}
