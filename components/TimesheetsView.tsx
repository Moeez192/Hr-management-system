import React, { useState } from 'react';
import { TimesheetEntry, Project } from '../types';

interface TimesheetsViewProps {
  timesheets: TimesheetEntry[];
  projects: Project[];
  addTimesheetEntry: (entry: Omit<TimesheetEntry, 'id'>) => void;
}

// Mocking current user
const CURRENT_EMPLOYEE_ID = 'emp1';

const TimesheetsView: React.FC<TimesheetsViewProps> = ({ timesheets, projects, addTimesheetEntry }) => {
  const [projectId, setProjectId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState(0);
  const [description, setDescription] = useState('');

  const userProjects = projects.filter(p => p.employeeIds.includes(CURRENT_EMPLOYEE_ID));
  const userTimesheets = timesheets.filter(ts => ts.employeeId === CURRENT_EMPLOYEE_ID);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || hours <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }
    addTimesheetEntry({ employeeId: CURRENT_EMPLOYEE_ID, projectId, date, hours, description });
    // Reset form
    setProjectId('');
    setHours(0);
    setDescription('');
  };

  return (
    <div>
        <h1 className="text-3xl font-bold text-text-main mb-6">Timesheets</h1>
        <div className="max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <h2 className="text-xl font-bold text-text-main mb-4">Log Your Hours</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Project</label>
                    <select value={projectId} onChange={e => setProjectId(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm">
                    <option value="">Select Project</option>
                    {userProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hours</label>
                    <input type="number" step="0.5" min="0" value={hours} onChange={e => setHours(parseFloat(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                </div>
                <div className="md:col-span-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" placeholder="What did you work on?" />
                </div>
                <div className="md:col-span-4 text-right">
                    <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-hover">Log Time</button>
                </div>
                </form>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
                <h3 className="text-lg font-semibold text-text-main mb-4">My Timesheet Entries</h3>
                <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3">Project</th>
                    <th scope="col" className="px-6 py-3">Date</th>
                    <th scope="col" className="px-6 py-3">Hours</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {userTimesheets.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(ts => (
                    <tr key={ts.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{projects.find(p => p.id === ts.projectId)?.name || 'N/A'}</td>
                        <td className="px-6 py-4">{ts.date}</td>
                        <td className="px-6 py-4">{ts.hours}</td>
                        <td className="px-6 py-4">{ts.description}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default TimesheetsView;
