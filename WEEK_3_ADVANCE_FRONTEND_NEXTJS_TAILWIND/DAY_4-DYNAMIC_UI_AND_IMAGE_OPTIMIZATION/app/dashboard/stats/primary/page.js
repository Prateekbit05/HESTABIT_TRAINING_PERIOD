'use client';

import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const monthlyData = [
  { month: 'Jan', revenue: 32000, target: 35000 },
  { month: 'Feb', revenue: 35000, target: 35000 },
  { month: 'Mar', revenue: 38000, target: 40000 },
  { month: 'Apr', revenue: 42000, target: 40000 },
  { month: 'May', revenue: 40000, target: 45000 },
  { month: 'Jun', revenue: 45000, target: 45000 },
];

export default function PrimaryCardDetails() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-blue-600 p-3 text-white">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Primary Revenue</h1>
              <p className="text-slate-600">Detailed revenue analytics and insights</p>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Current Value</div>
            <div className="text-3xl font-bold text-blue-600">$40,000</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+12.5% from last month</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Monthly Target</div>
            <div className="text-3xl font-bold text-slate-900">$45,000</div>
            <div className="mt-2 text-sm text-slate-600">88.9% achieved</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Average Growth</div>
            <div className="text-3xl font-bold text-slate-900">8.3%</div>
            <div className="mt-2 text-sm text-slate-600">Per month</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Total YTD</div>
            <div className="text-3xl font-bold text-slate-900">$232K</div>
            <div className="mt-2 text-sm text-green-600">On track</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Revenue Trend (6 Months)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                  }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTarget)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-600"></div>
              <span className="text-slate-600">Actual Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-600"></div>
              <span className="text-slate-600">Target</span>
            </div>
          </div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Revenue Sources</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Product Sales</span>
                  <span className="font-semibold text-slate-900">$24,000 (60%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[60%] bg-blue-600"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Services</span>
                  <span className="font-semibold text-slate-900">$12,000 (30%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[30%] bg-blue-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Subscriptions</span>
                  <span className="font-semibold text-slate-900">$4,000 (10%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[10%] bg-blue-400"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">New Customers</span>
                <span className="font-semibold text-slate-900">156</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">Avg. Order Value</span>
                <span className="font-semibold text-slate-900">$256.41</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">Conversion Rate</span>
                <span className="font-semibold text-slate-900">3.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Customer Retention</span>
                <span className="font-semibold text-slate-900">87%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}