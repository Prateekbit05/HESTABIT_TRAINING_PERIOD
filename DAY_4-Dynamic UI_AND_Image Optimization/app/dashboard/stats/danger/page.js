'use client';

import Link from 'next/link';

export default function DangerCardDetails() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Back link */}
      <div className="mb-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-lg bg-red-600 p-3 text-white">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Critical Alerts</h1>
            <p className="text-slate-600">Urgent items requiring immediate attention</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Current Value" value="$65,000" note="-5.4% from last month" danger />
          <StatCard title="Critical Issues" value="3" note="Immediate action required" />
          <StatCard title="Time to Resolve" value="24h" note="Average" />
          <StatCard title="Overdue Items" value="7" note="Past deadline" />
        </div>

        {/* Alert box */}
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6">
          <h3 className="font-semibold text-red-900">Alert: Budget Overrun Detected</h3>
          <p className="mt-2 text-sm text-red-700">
            Current spending is 12% over budget. Immediate cost reduction measures recommended.
          </p>
        </div>

        {/* Issues */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Critical Issues</h2>

          <div className="space-y-4">
            {[
              {
                title: 'Server downtime detected',
                description: 'Main production server experiencing outages',
                time: '5 minutes ago',
                status: 'Ongoing',
              },
              {
                title: 'Payment gateway failure',
                description: 'Customer payments cannot be processed',
                time: '1 hour ago',
                status: 'Investigating',
              },
            ].map((issue, index) => (
              <div
                key={index}
                className="rounded-lg border-2 border-red-200 bg-red-50 p-4"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-slate-900">{issue.title}</h4>
                    <p className="mt-1 text-sm text-slate-600">{issue.description}</p>
                    <p className="mt-2 text-xs text-slate-500">{issue.time}</p>
                  </div>

                  <div className="text-right">
                    <span className="block rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      {issue.status}
                    </span>
                    <button className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
                      Resolve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response Team */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-900">Response Team</h3>

          <div className="space-y-3">
            {[
              { name: 'David Martinez', role: 'System Admin', status: 'Active' },
              { name: 'Lisa Anderson', role: 'Security Lead', status: 'Active' },
              { name: 'Tom Roberts', role: 'DevOps Engineer', status: 'Standby' },
            ].map((person, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg bg-slate-50 p-3"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 font-semibold text-red-700">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">{person.name}</div>
                    <div className="text-sm text-slate-600">{person.role}</div>
                  </div>
                </div>

                <span
                  className={`text-sm font-medium ${
                    person.status === 'Active'
                      ? 'text-green-600'
                      : 'text-orange-600'
                  }`}
                >
                  {person.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Helper component */
function StatCard({ title, value, note, danger }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-600">{title}</div>
      <div className={`mt-1 text-3xl font-bold ${danger ? 'text-red-600' : 'text-slate-900'}`}>
        {value}
      </div>
      <div className={`mt-2 text-sm ${danger ? 'text-red-600' : 'text-slate-600'}`}>
        {note}
      </div>
    </div>
  );
}
