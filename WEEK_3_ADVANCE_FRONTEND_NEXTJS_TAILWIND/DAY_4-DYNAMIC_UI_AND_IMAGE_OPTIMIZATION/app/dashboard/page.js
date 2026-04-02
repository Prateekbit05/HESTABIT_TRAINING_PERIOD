'use client';

import Link from 'next/link';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '@/components/ui/Card';

// Sample data for charts
const areaChartData = [
  { name: 'Mar 1', value: 15000 },
  { name: 'Mar 3', value: 28000 },
  { name: 'Mar 5', value: 25000 },
  { name: 'Mar 7', value: 31000 },
  { name: 'Mar 9', value: 30000 },
  { name: 'Mar 11', value: 28000 },
  { name: 'Mar 13', value: 38000 },
];

const barChartData = [
  { name: 'January', value: 3500 },
  { name: 'February', value: 4500 },
  { name: 'March', value: 5500 },
  { name: 'April', value: 7000 },
  { name: 'May', value: 10000 },
  { name: 'June', value: 13500 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">Welcome back! Here's what's happening.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Primary Card */}
        <Link href="/dashboard/stats/primary">
          <Card variant="primary" className="group cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Primary Card</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$40,000</span>
                  <span className="text-sm opacity-75">+12.5%</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-90 transition-all group-hover:opacity-100">
              View Details →
            </p>
          </Card>
        </Link>
        
        {/* Warning Card */}
        <Link href="/dashboard/stats/warning">
          <Card variant="warning" className="group cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Warning Card</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$24,000</span>
                  <span className="text-sm opacity-75">-3.2%</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-90 transition-all group-hover:opacity-100">
              View Details →
            </p>
          </Card>
        </Link>
        
        {/* Success Card */}
        <Link href="/dashboard/stats/success">
          <Card variant="success" className="group cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Success Card</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$12,000</span>
                  <span className="text-sm opacity-75">+8.1%</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-90 transition-all group-hover:opacity-100">
              View Details →
            </p>
          </Card>
        </Link>
        
        {/* Danger Card */}
        <Link href="/dashboard/stats/danger">
          <Card variant="danger" className="group cursor-pointer transition-transform hover:scale-105">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Danger Card</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold">$65,000</span>
                  <span className="text-sm opacity-75">-5.4%</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="mt-4 text-sm opacity-90 transition-all group-hover:opacity-100">
              View Details →
            </p>
          </Card>
        </Link>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Area Chart */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h2 className="text-lg font-semibold text-white sm:text-xl">Area Chart Example</h2>
          </div>
          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-center gap-2">
            <span className="text-xl">📊</span>
            <h2 className="text-lg font-semibold text-white sm:text-xl">Bar Chart Example</h2>
          </div>
          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="name" 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#94a3b8"
                  tick={{ fill: '#94a3b8' }}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill="#3b82f6" 
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DataTable Section */}
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-4 backdrop-blur-sm sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl">📋</span>
          <h2 className="text-lg font-semibold text-white sm:text-xl">DataTable Example</h2>
        </div>
        
        {/* Table Controls */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Show</span>
            <select className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm text-white">
              <option>10</option>
              <option>25</option>
              <option>50</option>
            </select>
            <span className="text-sm text-slate-400">entries</span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-400">Search:</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="rounded-lg border border-slate-600 bg-slate-700 px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-slate-700">
              <tr>
                <th className="pb-3 font-semibold text-slate-300">Name</th>
                <th className="pb-3 font-semibold text-slate-300">Position</th>
                <th className="pb-3 font-semibold text-slate-300">Office</th>
                <th className="pb-3 font-semibold text-slate-300">Age</th>
                <th className="pb-3 font-semibold text-slate-300">Start Date</th>
                <th className="pb-3 font-semibold text-slate-300">Salary</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { name: "John Doe", position: "Developer", office: "New York", age: 28, date: "2021-01-15", salary: "$85,000" },
                { name: "Jane Smith", position: "Designer", office: "London", age: 32, date: "2020-05-20", salary: "$75,000" },
                { name: "Bob Johnson", position: "Manager", office: "Tokyo", age: 45, date: "2019-03-10", salary: "$95,000" },
                { name: "Alice Brown", position: "Developer", office: "Paris", age: 26, date: "2022-07-01", salary: "$80,000" },
              ].map((row, index) => (
                <tr key={index} className="transition-colors hover:bg-slate-700/30">
                  <td className="py-3 text-white">{row.name}</td>
                  <td className="py-3 text-slate-400">{row.position}</td>
                  <td className="py-3 text-slate-400">{row.office}</td>
                  <td className="py-3 text-slate-400">{row.age}</td>
                  <td className="py-3 text-slate-400">{row.date}</td>
                  <td className="py-3 text-slate-400">{row.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}