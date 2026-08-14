import React from 'react';
import { Users, GraduationCap, BookOpen, DollarSign, Activity, Server } from 'lucide-react';

export function PlatformStatsOverview() {
  const stats = [
    { label: 'Total Teachers', value: '1,245', icon: Users, change: '+12%', changeType: 'positive' },
    { label: 'Total Students', value: '45,231', icon: GraduationCap, change: '+5%', changeType: 'positive' },
    { label: 'Total Courses', value: '3,420', icon: BookOpen, change: '+8%', changeType: 'positive' },
    { label: 'Total Revenue', value: '$1.2M', icon: DollarSign, change: '+18%', changeType: 'positive', highlight: true },
    { label: 'Payment Success', value: '99.4%', icon: Activity, change: '+0.2%', changeType: 'positive' },
    { label: 'API Response', value: '310ms', icon: Server, change: '+15ms', changeType: 'negative', isDanger: true }, // Using 310ms to show the text-danger requirement
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className={`flex flex-col p-6 rounded-2xl shadow-sm border ${
              stat.highlight
                ? 'bg-accent-500 text-white border-accent-500'
                : 'bg-bg-surface border-border-theme'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${stat.highlight ? 'text-white/90' : 'text-text-secondary'}`}>
                {stat.label}
              </span>
              <Icon className={`w-5 h-5 ${stat.highlight ? 'text-white' : 'text-text-secondary'}`} />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className={`text-3xl font-bold ${stat.isDanger ? 'text-danger' : 'text-ink'}`}>
                {stat.value}
              </span>
              <span className={`text-sm font-medium ${
                stat.highlight ? 'text-white/80' : 
                stat.changeType === 'positive' ? 'text-success' : 'text-danger'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
