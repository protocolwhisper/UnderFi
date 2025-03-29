import { ReactNode } from 'react';
import { Navbar } from '../dashboard/navbar';
type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
}
