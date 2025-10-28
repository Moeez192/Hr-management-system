import { useState } from 'react';
import { Employee, Project, AttendanceRecord, TimesheetEntry, LeaveRequest, PayrollRecord, LeaveStatus, ProjectStatus } from '../types';

const MOCK_EMPLOYEES: Employee[] = [
  { id: 'emp1', name: 'John Doe', email: 'john.doe@example.com', role: 'Software Engineer', hourlyRate: 50, hireDate: '2023-01-15' },
  { id: 'emp2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Project Manager', hourlyRate: 65, hireDate: '2022-11-20' },
  { id: 'emp3', name: 'Peter Jones', email: 'peter.jones@example.com', role: 'UX Designer', hourlyRate: 55, hireDate: '2023-03-10' },
];

const MOCK_PROJECTS: Project[] = [
  { id: 'proj1', name: 'E-commerce Platform', client: 'Retail Inc.', status: ProjectStatus.InProgress, employeeIds: ['emp1', 'emp3'] },
  { id: 'proj2', name: 'Mobile Banking App', client: 'Fintech Co.', status: ProjectStatus.Completed, employeeIds: ['emp1', 'emp2'] },
  { id: 'proj3', name: 'Internal CRM', client: 'Internal', status: ProjectStatus.NotStarted, employeeIds: [] },
];

const MOCK_TIMESHEETS: TimesheetEntry[] = [
    { id: 'ts1', employeeId: 'emp1', projectId: 'proj1', date: '2024-07-22', hours: 8, description: 'Developed checkout feature' },
    { id: 'ts2', employeeId: 'emp3', projectId: 'proj1', date: '2024-07-22', hours: 6, description: 'Designed user profile page' },
];

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
    { id: 'leave1', employeeId: 'emp1', startDate: '2024-08-05', endDate: '2024-08-07', reason: 'Vacation', status: LeaveStatus.Pending },
    { id: 'leave2', employeeId: 'emp3', startDate: '2024-07-25', endDate: '2024-07-25', reason: 'Medical Appointment', status: LeaveStatus.Approved },
]

export const useHRData = () => {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [timesheets, setTimesheets] = useState<TimesheetEntry[]>(MOCK_TIMESHEETS);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(MOCK_LEAVE_REQUESTS);
  const [payroll, setPayroll] = useState<PayrollRecord[]>([]);

  // --- Employee Management ---
  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = { ...employee, id: `emp${Date.now()}` };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
  };

  // --- Project Management ---
  const addProject = (project: Omit<Project, 'id' | 'employeeIds'>) => {
    const newProject: Project = { ...project, id: `proj${Date.now()}`, employeeIds: [] };
    setProjects(prev => [...prev, newProject]);
  };

  const assignEmployeeToProject = (projectId: string, employeeId: string) => {
    setProjects(prev => prev.map(p => 
      p.id === projectId ? { ...p, employeeIds: [...p.employeeIds, employeeId] } : p
    ));
  };

  // --- Attendance ---
  const checkIn = (employeeId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const existingRecord = attendance.find(a => a.employeeId === employeeId && a.date === today);
    if (!existingRecord) {
      const newRecord: AttendanceRecord = {
        id: `att${Date.now()}`,
        employeeId,
        date: today,
        checkIn: new Date().toISOString(),
        checkOut: null,
      };
      setAttendance(prev => [...prev, newRecord]);
    }
  };

  const checkOut = (employeeId: string) => {
    const today = new Date().toISOString().split('T')[0];
    setAttendance(prev => prev.map(a => 
      (a.employeeId === employeeId && a.date === today && !a.checkOut) 
        ? { ...a, checkOut: new Date().toISOString() } 
        : a
    ));
  };
  
  // --- Timesheets ---
  const addTimesheetEntry = (entry: Omit<TimesheetEntry, 'id'>) => {
    const newEntry: TimesheetEntry = { ...entry, id: `ts${Date.now()}` };
    setTimesheets(prev => [...prev, newEntry]);
  };

  // --- Leave Management ---
  const requestLeave = (request: Omit<LeaveRequest, 'id' | 'status'>) => {
    const newRequest: LeaveRequest = { ...request, id: `leave${Date.now()}`, status: LeaveStatus.Pending };
    setLeaveRequests(prev => [...prev, newRequest]);
  };

  const updateLeaveStatus = (leaveId: string, status: LeaveStatus) => {
    setLeaveRequests(prev => prev.map(req => req.id === leaveId ? { ...req, status } : req));
  };

  // --- Payroll ---
  const calculatePayroll = (period: string) => {
    const newPayroll: PayrollRecord[] = employees.map(emp => {
      const totalHours = timesheets
        .filter(ts => ts.employeeId === emp.id /* && ts.date is in period */)
        .reduce((sum, entry) => sum + entry.hours, 0);
      
      const grossPay = totalHours * emp.hourlyRate;
      const deductions = grossPay * 0.15; // Simplified 15% deduction
      const netPay = grossPay - deductions;

      return {
        employeeId: emp.id,
        period,
        totalHours,
        grossPay,
        deductions,
        netPay
      };
    });
    setPayroll(newPayroll);
  };

  return {
    employees,
    projects,
    attendance,
    timesheets,
    leaveRequests,
    payroll,
    addEmployee,
    updateEmployee,
    addProject,
    assignEmployeeToProject,
    checkIn,
    checkOut,
    addTimesheetEntry,
    requestLeave,
    updateLeaveStatus,
    calculatePayroll
  };
};