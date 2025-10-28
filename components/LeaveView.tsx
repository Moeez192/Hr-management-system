import React, { useState } from 'react';
import { LeaveRequest, Employee, LeaveStatus } from '../types';

interface LeaveViewProps {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  requestLeave: (request: Omit<LeaveRequest, 'id' | 'status'>) => void;
  updateLeaveStatus: (leaveId: string, status: LeaveStatus) => void;
}

const CURRENT_EMPLOYEE_ID = 'emp1';

const LeaveView: React.FC<LeaveViewProps> = ({ leaveRequests, employees, requestLeave, updateLeaveStatus }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    requestLeave({ employeeId: CURRENT_EMPLOYEE_ID, startDate, endDate, reason });
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  const statusColorMap: { [key in LeaveStatus]: string } = {
    [LeaveStatus.Pending]: "bg-amber-100 text-amber-700",
    [LeaveStatus.Approved]: "bg-emerald-100 text-emerald-700",
    [LeaveStatus.Rejected]: "bg-red-100 text-red-700",
  };

  return (
    <div>
        <h1 className="text-3xl font-bold text-text-main mb-6">Leave Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-text-main mb-4">Request Leave</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                <label className="block text-sm font-medium text-gray-700">Start Date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">End Date</label>
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                <label className="block text-sm font-medium text-gray-700">Reason</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <button type="submit" className="w-full bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-hover">Submit Request</button>
            </form>
            </div>
        </div>
        <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
            <h3 className="text-lg font-semibold text-text-main mb-4">All Leave Requests</h3>
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3">Employee</th>
                    <th scope="col" className="px-6 py-3">Dates</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3">Actions</th>
                </tr>
                </thead>
                <tbody>
                {leaveRequests.map(req => (
                    <tr key={req.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">{employees.find(e => e.id === req.employeeId)?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{req.startDate} to {req.endDate}</td>
                    <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[req.status]}`}>
                            {req.status}
                        </span>
                    </td>
                    <td className="px-6 py-4">
                        {req.status === LeaveStatus.Pending && (
                        <div className="flex space-x-2">
                            <button onClick={() => updateLeaveStatus(req.id, LeaveStatus.Approved)} className="text-green-600 hover:text-green-900">Approve</button>
                            <button onClick={() => updateLeaveStatus(req.id, LeaveStatus.Rejected)} className="text-red-600 hover:text-red-900">Reject</button>
                        </div>
                        )}
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    </div>
  );
};

export default LeaveView;
