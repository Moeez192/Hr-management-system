import React, { useState } from 'react';
import { useHRData } from './hooks/useHRData';
import { Layout } from './components/Layout';
import DashboardView from './components/DashboardView';
import EmployeesView from './components/EmployeesView';
import ProjectsView from './components/ProjectsView';
import AttendanceView from './components/AttendanceView';
import TimesheetsView from './components/TimesheetsView';
import LeaveView from './components/LeaveView';
import PayrollView from './components/PayrollView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('Dashboard');
  const hrData = useHRData();

  const renderActiveView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView employees={hrData.employees} projects={hrData.projects} leaveRequests={hrData.leaveRequests} />;
      case 'Employees':
        return <EmployeesView 
            employees={hrData.employees} 
            addEmployee={hrData.addEmployee} 
            updateEmployee={hrData.updateEmployee}
            attendance={hrData.attendance}
            timesheets={hrData.timesheets}
            projects={hrData.projects}
            leaveRequests={hrData.leaveRequests}
        />;
      case 'Projects':
        return <ProjectsView projects={hrData.projects} employees={hrData.employees} addProject={hrData.addProject} assignEmployeeToProject={hrData.assignEmployeeToProject}/>;
      case 'Attendance':
        return <AttendanceView attendance={hrData.attendance} checkIn={hrData.checkIn} checkOut={hrData.checkOut} />;
      case 'Timesheets':
        return <TimesheetsView timesheets={hrData.timesheets} projects={hrData.projects} addTimesheetEntry={hrData.addTimesheetEntry} />;
      case 'Leave':
        return <LeaveView leaveRequests={hrData.leaveRequests} employees={hrData.employees} requestLeave={hrData.requestLeave} updateLeaveStatus={hrData.updateLeaveStatus} />;
      case 'Payroll':
        return <PayrollView payroll={hrData.payroll} employees={hrData.employees} calculatePayroll={hrData.calculatePayroll} />;
      default:
        return <DashboardView employees={hrData.employees} projects={hrData.projects} leaveRequests={hrData.leaveRequests} />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderActiveView()}
    </Layout>
  );
};

export default App;