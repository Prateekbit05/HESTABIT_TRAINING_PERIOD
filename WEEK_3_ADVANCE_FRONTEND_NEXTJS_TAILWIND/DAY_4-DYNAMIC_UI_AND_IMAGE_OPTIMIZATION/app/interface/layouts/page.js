import Link from 'next/link';

export const metadata = {
  title: 'Layouts - Start Bootstrap',
  description: 'Different layout examples and templates',
};

export default function LayoutsPage() {
  const layouts = [
    {
      id: 1,
      title: 'Dashboard Layout',
      description: 'Main dashboard layout with sidebar and top navigation',
      preview: '/dashboard',
      icon: '📊',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Sidebar Navigation',
      description: 'Left sidebar navigation with collapsible menu items',
      preview: '/dashboard',
      icon: '📑',
      color: 'green',
    },
    {
      id: 3,
      title: 'Top Navigation',
      description: 'Horizontal navigation bar with dropdown menus',
      preview: '/dashboard',
      icon: '🧭',
      color: 'purple',
    },
    {
      id: 4,
      title: 'Full Width Layout',
      description: 'Full width content area without sidebar',
      preview: '/dashboard/users',
      icon: '📐',
      color: 'orange',
    },
    {
      id: 5,
      title: 'Card Grid Layout',
      description: 'Responsive card grid for displaying content',
      preview: '/dashboard',
      icon: '🎴',
      color: 'pink',
    },
    {
      id: 6,
      title: 'Split Layout',
      description: 'Two-column layout with fixed sidebar',
      preview: '/dashboard/profile',
      icon: '⚡',
      color: 'indigo',
    },
  ];

  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    orange: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    pink: 'from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="mb-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Layout Templates</h1>
        <p className="mt-2 text-slate-600">
          Choose from a variety of pre-built layouts for your project
        </p>
      </div>

      {/* Layouts Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {layouts.map((layout) => (
          <Link
            key={layout.id}
            href={layout.preview}
            className="group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-lg"
          >
            {/* Preview Area */}
            <div className={`flex h-48 items-center justify-center bg-gradient-to-br ${colorClasses[layout.color]} p-8 text-6xl transition-all`}>
              {layout.icon}
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="mb-2 text-lg font-semibold text-slate-900">
                {layout.title}
              </h3>
              <p className="mb-4 text-sm text-slate-600">
                {layout.description}
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
                View Layout
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
        ))}
      </div>

      {/* Additional Info Section */}
      <div className="mt-12 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <h2 className="mb-3 text-2xl font-bold">Need a Custom Layout?</h2>
        <p className="mb-6 text-blue-100">
          All layouts are fully customizable and responsive. Mix and match components to create your perfect design.
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}