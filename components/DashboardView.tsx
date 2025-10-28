import React from 'react';
import Card from './common/Card';
import { Employee, Project, LeaveRequest, LeaveStatus } from '../types';

interface DashboardViewProps {
  employees: Employee[];
  projects: Project[];
  leaveRequests: LeaveRequest[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ employees, projects, leaveRequests }) => {
  const pendingLeaveCount = leaveRequests.filter(lr => lr.status === LeaveStatus.Pending).length;

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-main mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          title="Total Employees"
          value={employees.length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          color="bg-indigo-500"
        />
        <Card
          title="Total Projects"
          value={projects.length}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
          color="bg-emerald-500"
        />
        <Card
          title="Pending Leave"
          value={pendingLeaveCount}
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>}
          color="bg-amber-500"
        />
        <Card
          title="Onboarding"
          value="2 New"
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>}
          color="bg-pink-500"
        />
      </div>

      <div className="mt-8 bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold text-text-main mb-4">Company Updates</h3>
        <p className="text-text-light">Welcome to the new ZenithHR system! All modules are now live. Please familiarize yourself with the new interface. Training sessions will be held next week.</p>
      </div>
    </div>
  );
};

export default DashboardView;
