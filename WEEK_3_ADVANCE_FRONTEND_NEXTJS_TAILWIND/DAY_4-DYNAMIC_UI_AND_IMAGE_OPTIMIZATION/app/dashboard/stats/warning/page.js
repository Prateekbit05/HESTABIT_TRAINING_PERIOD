'use client';

import Link from 'next/link';

export default function WarningCardDetails() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="rounded-lg bg-orange-500 p-3 text-white">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Warning Metrics</h1>
              <p className="text-slate-600">Items requiring attention</p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Current Value</div>
            <div className="text-3xl font-bold text-orange-600">$24,000</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <span>-3.2% from last month</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Items at Risk</div>
            <div className="text-3xl font-bold text-slate-900">8</div>
            <div className="mt-2 text-sm text-orange-600">Needs review</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Recovery Rate</div>
            <div className="text-3xl font-bold text-slate-900">72%</div>
            <div className="mt-2 text-sm text-slate-600">Improving</div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-orange-50 border border-orange-200 p-6">
          <div className="flex items-start gap-3">
            <svg className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-semibold text-orange-900">Attention Required</h3>
              <p className="mt-1 text-sm text-orange-700">
                Several items need your attention to prevent potential issues. Review the action items below.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Action Items</h2>
          <div className="space-y-3">
            {[
              { title: 'Review pending transactions', priority: 'high', count: 12 },
              { title: 'Update inventory levels', priority: 'medium', count: 5 },
              { title: 'Follow up with customers', priority: 'high', count: 8 },
              { title: 'Check system alerts', priority: 'low', count: 3 },
              { title: 'Verify payment processing', priority: 'medium', count: 6 },
              { title: 'Update product listings', priority: 'low', count: 4 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border border-slate-200 p-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${
                    item.priority === 'high' ? 'bg-red-500' : 
                    item.priority === 'medium' ? 'bg-orange-500' : 'bg-yellow-500'
                  }`}></div>
                  <span className="font-medium text-slate-900">{item.title}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {item.count} items
                  </span>
                  <button className="text-blue-600 hover:text-blue-700">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Priority Breakdown</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">High Priority</span>
                  <span className="font-semibold text-slate-900">20 items (52%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[52%] bg-red-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Medium Priority</span>
                  <span className="font-semibold text-slate-900">11 items (29%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[29%] bg-orange-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Low Priority</span>
                  <span className="font-semibold text-slate-900">7 items (19%)</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[19%] bg-yellow-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Response Time</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">Average Response</span>
                <span className="font-semibold text-slate-900">2.4 hours</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">Fastest Resolution</span>
                <span className="font-semibold text-slate-900">45 minutes</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-sm text-slate-600">Pending Items</span>
                <span className="font-semibold text-slate-900">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Completion Rate</span>
                <span className="font-semibold text-green-600">72%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}