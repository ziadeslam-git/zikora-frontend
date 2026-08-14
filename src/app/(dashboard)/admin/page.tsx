import React from 'react';
import { Users, GraduationCap, BookOpen, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, Download } from 'lucide-react';
import { PlatformGrowthChart } from './components/PlatformGrowthChart';
import { TeacherApprovalQueue } from './components/TeacherApprovalQueue';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hi, Zikora Admin</h1>
        <p className="text-sm text-gray-500 mt-2">Stay on top of your platform, monitor progress, and track status.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column (col-span-3) */}
        <div className="xl:col-span-3 flex flex-col gap-6">
          {/* Total Revenue Card */}
          <div className="bg-white dark:bg-bg-base rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-border-theme">
            <h3 className="text-sm font-medium text-gray-500 mb-4 flex items-center justify-between">
              Total Revenue
              <span className="flex items-center gap-1 bg-gray-50 dark:bg-bg-surface-2 px-2 py-1 rounded-md text-xs font-semibold text-gray-700 dark:text-gray-300">
                <span className="w-4 h-3 bg-accent-500 rounded-sm inline-block mr-1"></span> EGP
              </span>
            </h3>
            <div className="mb-2">
              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">E£ 1.2M</h2>
            </div>
            <div className="flex items-center gap-2 text-sm mb-6">
              <span className="flex items-center text-green-500 bg-green-50 dark:bg-green-500/10 px-1.5 py-0.5 rounded font-medium">
                <ArrowUpRight className="w-3 h-3 mr-1" /> 12%
              </span>
              <span className="text-gray-400">than last month</span>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors">
                <RefreshCw className="w-4 h-4" /> Transfer
              </button>
              <button className="flex-1 bg-gray-50 dark:bg-bg-surface-2 text-gray-900 dark:text-white border border-gray-200 dark:border-border-theme rounded-xl py-3 font-medium flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors">
                <Download className="w-4 h-4" /> Request
              </button>
            </div>
          </div>

          {/* Wallets-style stats */}
          <div className="bg-white dark:bg-bg-base rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-border-theme">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Gateways <span className="text-gray-400 font-normal ml-2">Total 3 providers</span></h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 dark:bg-bg-surface-2 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">Vodafone</span>
                </div>
                <div className="font-bold text-sm text-gray-900 dark:text-white mb-1">E£ 800K</div>
                <div className="text-[10px] text-green-500 font-medium">Active</div>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-bg-surface-2 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">InstaPay</span>
                </div>
                <div className="font-bold text-sm text-gray-900 dark:text-white mb-1">E£ 250K</div>
                <div className="text-[10px] text-green-500 font-medium">Active</div>
              </div>
            </div>
          </div>

          {/* API Status Limit */}
          <div className="bg-white dark:bg-bg-base rounded-[2rem] p-6 shadow-sm border border-gray-100 dark:border-border-theme">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-4">API Response Time</h3>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-orange-500 w-[70%] rounded-full"></div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span className="font-medium text-gray-900 dark:text-white">310ms <span className="font-normal text-gray-400">average out of</span></span>
              <span>1000ms max</span>
            </div>
          </div>
        </div>

        {/* Middle & Right Columns (col-span-9) */}
        <div className="xl:col-span-9 flex flex-col gap-6">
          
          {/* Top Row: 2x2 Grid + Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* 2x2 Stats Grid (col-span-5) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              
              {/* Solid Purple Card */}
              <div className="bg-accent-500 rounded-[2rem] p-5 text-white flex flex-col justify-between shadow-md shadow-accent-500/20">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-medium text-white/90">Total Teachers</span>
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold mb-2">1,245</h3>
                  <span className="flex items-center text-white/90 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> 12% This month
                  </span>
                </div>
              </div>

              {/* White Card 1 */}
              <div className="bg-white dark:bg-bg-base rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-border-theme flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-medium text-gray-500">Total Students</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-bg-surface-2 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">45K</h3>
                  <span className="flex items-center text-green-500 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" /> <span className="text-green-500 mr-1">5%</span> <span className="text-gray-400">This month</span>
                  </span>
                </div>
              </div>

              {/* White Card 2 */}
              <div className="bg-white dark:bg-bg-base rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-border-theme flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-medium text-gray-500">Total Courses</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-bg-surface-2 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">3,420</h3>
                  <span className="flex items-center text-green-500 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" /> <span className="text-green-500 mr-1">8%</span> <span className="text-gray-400">This month</span>
                  </span>
                </div>
              </div>

              {/* White Card 3 */}
              <div className="bg-white dark:bg-bg-base rounded-[2rem] p-5 shadow-sm border border-gray-100 dark:border-border-theme flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-sm font-medium text-gray-500">Payment Success</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 dark:bg-bg-surface-2 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">99.4%</h3>
                  <span className="flex items-center text-green-500 text-xs font-medium">
                    <ArrowUpRight className="w-3 h-3 mr-1 text-green-500" /> <span className="text-green-500 mr-1">0.2%</span> <span className="text-gray-400">This month</span>
                  </span>
                </div>
              </div>

            </div>

            {/* Chart (col-span-7) */}
            <div className="lg:col-span-7 h-full min-h-[300px]">
               <PlatformGrowthChart />
            </div>

          </div>

          {/* Bottom Row: Table (Full width of the 9 columns) */}
          <div className="flex-1">
             <TeacherApprovalQueue />
          </div>

        </div>

      </div>
    </div>
  );
}
