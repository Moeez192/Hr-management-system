
export enum LeaveStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum ProjectStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  hourlyRate: number;
  hireDate: string;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  employeeIds: string[];
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  checkIn: string;
  checkOut: string | null;
  date: string;
}

export interface TimesheetEntry {
  id: string;
  employeeId: string;
  projectId: string;
  date: string;
  hours: number;
  description: string;
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: LeaveStatus;
}

export interface PayrollRecord {
  employeeId: string;
  period: string;
  totalHours: number;
  grossPay: number;
  deductions: number;
  netPay: number;
}
