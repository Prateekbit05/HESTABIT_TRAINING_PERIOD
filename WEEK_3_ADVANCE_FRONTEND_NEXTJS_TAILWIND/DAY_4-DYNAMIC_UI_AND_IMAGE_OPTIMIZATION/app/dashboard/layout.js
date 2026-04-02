import DashboardClientLayout from './DashboardClientLayout';

export const metadata = {
  title: 'Dashboard',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-slate-900">
      <DashboardClientLayout>
        {children}
      </DashboardClientLayout>
    </div>
  );
}
