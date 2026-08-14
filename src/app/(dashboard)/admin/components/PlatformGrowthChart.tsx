"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Jan', profit: 30000, loss: 10000 },
  { name: 'Feb', profit: 45000, loss: 20000 },
  { name: 'Mar', profit: 35000, loss: 15000 },
  { name: 'Apr', profit: 50000, loss: 25000 },
  { name: 'May', profit: 40000, loss: 18000 },
  { name: 'Jun', profit: 60000, loss: 30000 },
  { name: 'Jul', profit: 55000, loss: 28000 },
  { name: 'Aug', profit: 48000, loss: 22000 },
];

const CustomLegend = () => (
  <div className="flex justify-end items-center gap-4 text-xs font-semibold text-gray-500 pb-2">
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-sm bg-accent-500"></span> Profit
    </div>
    <div className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-sm bg-gray-200 dark:bg-gray-700"></span> Loss
    </div>
  </div>
);

export function PlatformGrowthChart() {
  return (
    <div className="bg-white dark:bg-bg-base rounded-[2rem] shadow-sm border border-gray-100 dark:border-border-theme p-6 h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Total Income</h3>
        <p className="text-xs text-gray-500">View your income in a certain period of time</p>
      </div>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" opacity={0.4} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 500 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9CA3AF', fontSize: 10, fontWeight: 500 }}
              tickFormatter={(value) => value === 0 ? '00' : `${value / 1000}k`}
            />
            <Tooltip 
              cursor={{fill: 'transparent'}}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                fontWeight: 600,
                fontSize: '12px'
              }}
            />
            <Legend content={<CustomLegend />} verticalAlign="top" align="right" />
            <Bar dataKey="profit" stackId="a" fill="var(--color-accent-500, #8b5cf6)" radius={[0, 0, 4, 4]} />
            <Bar dataKey="loss" stackId="a" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
