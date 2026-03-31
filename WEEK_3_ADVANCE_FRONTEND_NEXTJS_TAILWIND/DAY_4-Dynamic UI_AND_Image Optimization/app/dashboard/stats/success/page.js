'use client';

import Link from 'next/link';

export default function SuccessCardDetails() {
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
            <div className="rounded-lg bg-green-600 p-3 text-white">
              <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Success Metrics</h1>
              <p className="text-slate-600">Performance highlights and achievements</p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Current Value</div>
            <div className="text-3xl font-bold text-green-600">$12,000</div>
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>+8.1% from last month</span>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Goals Achieved</div>
            <div className="text-3xl font-bold text-slate-900">15/18</div>
            <div className="mt-2 text-sm text-green-600">83% completion</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Customer Satisfaction</div>
            <div className="text-3xl font-bold text-slate-900">4.8/5</div>
            <div className="mt-2 text-sm text-slate-600">⭐⭐⭐⭐⭐</div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-2 text-sm font-medium text-slate-600">Team Performance</div>
            <div className="text-3xl font-bold text-slate-900">98%</div>
            <div className="mt-2 text-sm text-green-600">Excellent</div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-green-50 border border-green-200 p-6">
          <div className="flex items-start gap-3">
            <svg className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-green-900">Outstanding Performance!</h3>
              <p className="mt-1 text-sm text-green-700">
                Your team has exceeded expectations this month. Keep up the excellent work!
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-slate-900">Recent Achievements</h2>
          <div className="space-y-4">
            {[
              { title: 'Exceeded monthly sales target', date: '2 days ago', icon: '🎯', description: 'Achieved 112% of monthly revenue goal' },
              { title: 'Perfect customer reviews this week', date: '3 days ago', icon: '⭐', description: 'All 25 customer reviews were 5-star ratings' },
              { title: 'Launched new product successfully', date: '1 week ago', icon: '🚀', description: 'Product launch exceeded first-week targets by 45%' },
              { title: 'Team performance milestone reached', date: '2 weeks ago', icon: '👥', description: 'All team members completed quarterly objectives' },
              { title: 'Customer retention record', date: '3 weeks ago', icon: '💚', description: '95% customer retention rate this quarter' },
            ].map((achievement, index) => (
              <div key={index} className="flex items-start gap-4 rounded-lg border border-green-100 bg-green-50 p-4 hover:bg-green-100 transition-colors">
                <div className="text-3xl">{achievement.icon}</div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900">{achievement.title}</div>
                  <div className="text-sm text-slate-600 mt-1">{achievement.description}</div>
                  <div className="text-xs text-slate-500 mt-2">{achievement.date}</div>
                </div>
                <svg className="h-5 w-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Performance Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Sales Target Achievement</span>
                  <span className="font-semibold text-green-600">112%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-full bg-green-600"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Customer Satisfaction</span>
                  <span className="font-semibold text-green-600">96%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[96%] bg-green-500"></div>
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">Project Completion</span>
                  <span className="font-semibold text-green-600">88%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[88%] bg-green-400"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-slate-900">Top Performers</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Johnson', role: 'Sales Lead', score: 98 },
                { name: 'Michael Chen', role: 'Developer', score: 95 },
                { name: 'Emily Davis', role: 'Designer', score: 93 },
                { name: 'James Wilson', role: 'Marketing', score: 91 },
              ].map((person, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 font-semibold">
                      #{index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{person.name}</div>
                      <div className="text-sm text-slate-600">{person.role}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">{person.score}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}