'use client';

import { useMemo } from 'react';

interface DiffModalProps {
  isOpen: boolean;
  onClose: () => void;
  oldValues: string;
  newValues: string;
  entity: string;
  action: string;
}

function tryParseJSON(jsonString: string) {
  try {
    const o = JSON.parse(jsonString);
    if (o && typeof o === "object") {
      return o;
    }
  } catch (e) { }
  return false;
}

export default function DiffModal({ isOpen, onClose, oldValues, newValues, entity, action }: DiffModalProps) {
  const oldObj = useMemo(() => tryParseJSON(oldValues), [oldValues]);
  const newObj = useMemo(() => tryParseJSON(newValues), [newValues]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity" onClick={onClose}>
      <div 
        className="bg-white dark:bg-bg-base rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-100 dark:border-border-theme animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="px-8 py-6 border-b border-gray-100 dark:border-border-theme flex justify-between items-start bg-gray-50/50 dark:bg-bg-surface-2/30">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 rounded-lg bg-accent-500/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Audit Log Details</h3>
            </div>
            <p className="text-sm text-gray-500 font-medium ml-11">{action} on <span className="text-gray-900 dark:text-gray-200 font-bold">{entity}</span></p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-full hover:bg-gray-100 dark:hover:bg-bg-surface-2 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Values */}
            <div className="space-y-4">
              <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                Previous Values
              </div>
              <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-5 shadow-sm">
                {oldObj ? (
                  <div className="space-y-3">
                    {Object.entries(oldObj).map(([key, val]) => (
                      <div key={key} className="flex flex-col border-b border-red-100 dark:border-red-900/20 last:border-0 pb-3 last:pb-0">
                        <span className="text-xs font-semibold text-red-400 dark:text-red-400/80 uppercase tracking-wider mb-1">{key}</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-white break-words">{String(val)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{oldValues || 'None'}</p>
                )}
              </div>
            </div>

            {/* New Values */}
            <div className="space-y-4">
              <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                New Values
              </div>
              <div className="bg-green-50/50 dark:bg-green-950/10 border border-green-100 dark:border-green-900/30 rounded-2xl p-5 shadow-sm">
                {newObj ? (
                  <div className="space-y-3">
                    {Object.entries(newObj).map(([key, val]) => {
                      const isChanged = oldObj && oldObj[key] !== val;
                      return (
                        <div key={key} className={`flex flex-col border-b border-green-100 dark:border-green-900/20 last:border-0 pb-3 last:pb-0 ${isChanged ? 'bg-green-100/50 dark:bg-green-900/20 -mx-2 px-2 rounded-lg' : ''}`}>
                          <span className="text-xs font-semibold text-green-500 dark:text-green-400/80 uppercase tracking-wider mb-1 flex items-center gap-2">
                            {key}
                            {isChanged && <span className="text-[10px] bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 px-1.5 py-0.5 rounded-sm">Changed</span>}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white break-words">{String(val)}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 dark:text-gray-300 break-words">{newValues || 'None'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-8 py-5 border-t border-gray-100 dark:border-border-theme flex justify-end bg-gray-50/50 dark:bg-bg-surface-2/30">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 bg-white dark:bg-bg-surface-2 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-bg-surface-2/80 transition-colors border border-gray-200 dark:border-gray-700 shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
