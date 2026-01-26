import Link from 'next/link';

export const metadata = {
  title: 'Pages - Start Bootstrap',
  description: 'Pre-built page templates and examples',
};

export default function PagesPage() {
  const pages = [
    {
      id: 1,
      title: 'Login Page',
      description: 'Clean and modern login form with validation',
      href: '/login',
      icon: '🔐',
      badge: 'Authentication',
      badgeColor: 'blue',
    },
    {
      id: 2,
      title: 'Dashboard',
      description: 'Analytics dashboard with charts and widgets',
      href: '/dashboard',
      icon: '📊',
      badge: 'Core',
      badgeColor: 'green',
    },
    {
      id: 3,
      title: 'User Profile',
      description: 'User profile page with editable information',
      href: '/dashboard/profile',
      icon: '👤',
      badge: 'Profile',
      badgeColor: 'purple',
    },
    {
      id: 4,
      title: 'Users List',
      description: 'Data table with search and pagination',
      href: '/dashboard/users',
      icon: '👥',
      badge: 'Data',
      badgeColor: 'orange',
    },
    {
      id: 5,
      title: 'Edit Profile',
      description: 'Profile editing form with image upload',
      href: '/dashboard/profile/edit',
      icon: '✏️',
      badge: 'Forms',
      badgeColor: 'pink',
    },
    {
      id: 6,
      title: 'Landing Page',
      description: 'Marketing landing page with hero section',
      href: '/',
      icon: '🏠',
      badge: 'Marketing',
      badgeColor: 'indigo',
    },
    {
      id: 7,
      title: 'Settings',
      description: 'User settings and preferences panel',
      href: '/dashboard',
      icon: '⚙️',
      badge: 'Settings',
      badgeColor: 'slate',
    },
    {
      id: 8,
      title: 'Error 404',
      description: 'Page not found error template',
      href: '/404-example',
      icon: '❌',
      badge: 'Error',
      badgeColor: 'red',
    },
  ];

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-700',
    green: 'bg-green-100 text-green-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    pink: 'bg-pink-100 text-pink-700',
    indigo: 'bg-indigo-100 text-indigo-700',
    slate: 'bg-slate-100 text-slate-700',
    red: 'bg-red-100 text-red-700',
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
        <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Page Templates</h1>
        <p className="mt-2 text-slate-600">
          Ready-to-use page templates for common use cases
        </p>
      </div>

      {/* Pages Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={page.href}
            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-blue-300 hover:shadow-md"
          >
            {/* Badge */}
            <div className="mb-4 flex items-center justify-between">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${badgeColors[page.badgeColor]}`}>
                {page.badge}
              </span>
              <div className="text-3xl">{page.icon}</div>
            </div>

            {/* Content */}
            <h3 className="mb-2 text-lg font-semibold text-slate-900">
              {page.title}
            </h3>
            <p className="mb-4 text-sm text-slate-600">
              {page.description}
            </p>

            {/* View Link */}
            <div className="flex items-center gap-2 text-sm font-medium text-blue-600">
              View Page
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {/* Hover Border Effect */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></div>
          </Link>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-2 text-3xl font-bold text-blue-600">{pages.length}</div>
          <div className="text-sm text-slate-600">Page Templates</div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-2 text-3xl font-bold text-green-600">50+</div>
          <div className="text-sm text-slate-600">UI Components</div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-2 text-3xl font-bold text-purple-600">100%</div>
          <div className="text-sm text-slate-600">Responsive</div>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-2 text-3xl font-bold text-orange-600">Fast</div>
          <div className="text-sm text-slate-600">Performance</div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-12 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-8 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-3 text-2xl font-bold">Start Building Today</h2>
          <p className="mb-6 text-slate-300">
            All pages are fully responsive and ready to use. Customize them to match your brand and requirements.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View Dashboard
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}