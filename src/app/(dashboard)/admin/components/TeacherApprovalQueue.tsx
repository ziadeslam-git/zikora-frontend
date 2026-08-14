"use client";

import React, from 'react';
import { Filter, Search, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  { id: 'INV_000076', activity: 'Mobile App Purchase', price: '$25,500', status: 'Completed', date: '17 Apr, 2026 03:45 PM', checked: false },
  { id: 'INV_000075', activity: 'Hotel Booking', price: '$32,750', status: 'Pending', date: '15 Apr, 2026 11:30 AM', checked: false },
  { id: 'INV_000074', activity: 'Flight Ticket Booking', price: '$40,200', status: 'Completed', date: '15 Apr, 2026 12:00 PM', checked: false },
  { id: 'INV_000073', activity: 'Grocery Purchase', price: '$50,200', status: 'In Progress', date: '14 Apr, 2026 09:15 PM', checked: true },
  { id: 'INV_000072', activity: 'Software License', price: '$15,900', status: 'Completed', date: '10 Apr, 2026 06:00 AM', checked: false },
];

export function TeacherApprovalQueue() {
  return (
    <div className="bg-bg-base rounded-[2rem] shadow-sm border border-border-theme p-6 w-full flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h3 className="text-lg font-bold text-ink">Recent Activities</h3>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-border-theme rounded-xl text-sm font-medium text-ink hover:bg-bg-surface transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
          <div className="relative">
            <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search" 
              className="pl-9 pr-4 py-2 w-full sm:w-64 bg-bg-surface-2 border border-border-theme rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent-500/20"
            />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse" dir="ltr">
          <thead>
            <tr className="border-b border-border-theme text-xs font-semibold text-text-secondary">
              <th className="py-4 px-2 font-medium w-10"></th>
              <th className="py-4 px-4 font-medium">Order ID</th>
              <th className="py-4 px-4 font-medium">Activity</th>
              <th className="py-4 px-4 font-medium">Price</th>
              <th className="py-4 px-4 font-medium">Status</th>
              <th className="py-4 px-4 font-medium">Date</th>
              <th className="py-4 px-4 font-medium w-10"></th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {activities.map((item) => (
              <tr key={item.id} className="border-b border-border-theme/50 last:border-0 hover:bg-bg-surface-2/30 transition-colors">
                <td className="py-4 px-2">
                  <input 
                    type="checkbox" 
                    defaultChecked={item.checked}
                    className="w-4 h-4 rounded border-border-theme text-accent-500 focus:ring-accent-500"
                  />
                </td>
                <td className="py-4 px-4 font-medium text-text-secondary">{item.id}</td>
                <td className="py-4 px-4 font-medium text-ink flex items-center gap-3">
                  {/* Generic icon box */}
                  <div className="w-8 h-8 rounded-lg bg-bg-surface-2 flex items-center justify-center">
                    <div className="w-4 h-4 bg-accent-500/50 rounded-sm"></div>
                  </div>
                  {item.activity}
                </td>
                <td className="py-4 px-4 font-semibold text-ink">{item.price}</td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2 font-medium">
                    <span className={cn("w-2 h-2 rounded-full", 
                      item.status === 'Completed' ? 'bg-success' : 
                      item.status === 'Pending' ? 'bg-orange-500' : 'bg-yellow-500'
                    )}></span>
                    <span className={cn(
                      item.status === 'Completed' ? 'text-success' : 
                      item.status === 'Pending' ? 'text-orange-500' : 'text-yellow-500'
                    )}>{item.status}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-text-secondary">{item.date}</td>
                <td className="py-4 px-4 text-right">
                  <button className="text-text-secondary hover:text-ink">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
