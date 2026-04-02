'use client';

import Sidebar from '@/components/ui/Sidebar';
import Navbar from '@/components/ui/Navbar';

export default function DashboardClientLayout({ children }) {
  return (
    <>
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0">
        <Navbar />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </>
  );
}
