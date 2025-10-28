import React, { useState } from 'react';
import Modal from './common/Modal';
import { Employee, AttendanceRecord, TimesheetEntry, Project, LeaveRequest, ProjectStatus, LeaveStatus } from '../types';

interface EmployeesViewProps {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (employee: Employee) => void;
  attendance: AttendanceRecord[];
  timesheets: TimesheetEntry[];
  projects: Project[];
  leaveRequests: LeaveRequest[];
}

const EmployeeForm: React.FC<{ onSave: (employee: Omit<Employee, 'id'>) => void; onClose: () => void, employee?: Employee }> = ({ onSave, onClose, employee }) => {
    const [name, setName] = useState(employee?.name || '');
    const [email, setEmail] = useState(employee?.email || '');
    const [role, setRole] = useState(employee?.role || '');
    const [hourlyRate, setHourlyRate] = useState(employee?.hourlyRate || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, email, role, hourlyRate, hireDate: employee?.hireDate || new Date().toISOString().split('T')[0] });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <input type="text" value={role} onChange={e => setRole(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                    <input type="number" value={hourlyRate} onChange={e => setHourlyRate(parseFloat(e.target.value))} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover">Save Employee</button>
            </div>
        </form>
    );
};

const statusColorMapProject: { [key in ProjectStatus]: string } = {
    [ProjectStatus.NotStarted]: "bg-slate-100 text-slate-700",
    [ProjectStatus.InProgress]: "bg-indigo-100 text-indigo-700",
    [ProjectStatus.Completed]: "bg-emerald-100 text-emerald-700",
};

const statusColorMapLeave: { [key in LeaveStatus]: string } = {
    [LeaveStatus.Pending]: "bg-amber-100 text-amber-700",
    [LeaveStatus.Approved]: "bg-emerald-100 text-emerald-700",
    [LeaveStatus.Rejected]: "bg-red-100 text-red-700",
};

const InfoCard: React.FC<{title: string, children: React.ReactNode, className?: string}> = ({title, children, className}) => (
    <div className={`bg-white p-6 rounded-xl shadow-sm ${className}`}>
        <h3 className="text-lg font-semibold text-text-main mb-4">{title}</h3>
        {children}
    </div>
);


const EmployeeDetail: React.FC<{
    employee: Employee;
    attendance: AttendanceRecord[];
    timesheets: TimesheetEntry[];
    projects: Project[];
    leaveRequests: LeaveRequest[];
    onUpdate: (employee: Employee) => void;
    onBack: () => void;
}> = ({ employee, attendance, timesheets, projects, leaveRequests, onUpdate, onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(employee);
    const assignedProjects = projects.filter(p => p.employeeIds.includes(employee.id));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'hourlyRate' ? parseFloat(value) || 0 : value }));
    };

    const handleSave = () => {
        onUpdate(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData(employee);
        setIsEditing(false);
    };

    const formatTime = (isoString: string | null) => {
        if (!isoString) return '--:--';
        return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-start mb-4">
                <button onClick={onBack} className="flex items-center text-sm font-medium text-gray-600 hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    Back to All Employees
                </button>
            </div>

            {/* Profile Header */}
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <img className="h-24 w-24 rounded-full object-cover ring-2 ring-primary p-1" src={`https://i.pravatar.cc/150?u=${employee.email}`} alt={employee.name} />
                    <div>
                        <h2 className="text-3xl font-bold text-text-main">{employee.name}</h2>
                        <p className="text-lg text-primary font-medium">{employee.role}</p>
                        <div className="flex items-center text-text-light mt-2 space-x-4">
                             <div className="flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <span>{employee.email}</span>
                             </div>
                             <div className="flex items-center space-x-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <span>Hired: {employee.hireDate}</span>
                             </div>
                        </div>
                    </div>
                </div>
                 {!isEditing && <button onClick={() => setIsEditing(true)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm font-medium flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>Edit Profile</button>}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <InfoCard title={isEditing ? 'Edit Employee Details' : 'Personal Information'}>
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Role</label>
                                    <input type="text" name="role" value={formData.role} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Hourly Rate ($)</label>
                                    <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" />
                                </div>
                                <div className="flex justify-end space-x-3 pt-2">
                                <button onClick={handleCancel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                                <button onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover">Save Changes</button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                <div><p className="text-sm text-text-light">Full Name</p><p className="font-semibold text-text-main">{employee.name}</p></div>
                                <div><p className="text-sm text-text-light">Email</p><p className="font-semibold text-text-main">{employee.email}</p></div>
                                <div><p className="text-sm text-text-light">Role</p><p className="font-semibold text-text-main">{employee.role}</p></div>
                                <div><p className="text-sm text-text-light">Hourly Rate</p><p className="font-semibold text-text-main">${employee.hourlyRate}/hr</p></div>
                            </div>
                        )}
                    </InfoCard>
                    <InfoCard title="Timesheet History" className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Project</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {timesheets.length > 0 ? timesheets.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map(ts => (
                                    <tr key={ts.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{projects.find(p => p.id === ts.projectId)?.name || 'N/A'}</td>
                                        <td className="px-6 py-4">{ts.date}</td>
                                        <td className="px-6 py-4">{ts.hours}</td>
                                    </tr>
                                )) : (
                                    <tr><td colSpan={3} className="text-center py-4 text-gray-500">No timesheet entries.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </InfoCard>
                </div>

                <div className="lg:col-span-1 space-y-6">
                    <InfoCard title="Assigned Projects">
                        {assignedProjects.length > 0 ? (
                            <ul className="space-y-3">
                                {assignedProjects.map(proj => (
                                    <li key={proj.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">{proj.name}</p>
                                            <p className="text-sm text-gray-500">{proj.client}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMapProject[proj.status]}`}>{proj.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : ( <p className="text-gray-500">Not assigned to any projects.</p> )}
                    </InfoCard>
                    <InfoCard title="Attendance History">
                        <table className="w-full text-sm text-left text-gray-500">
                             <tbody>
                                {attendance.length > 0 ? attendance.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map(rec => (
                                    <tr key={rec.id} className="border-b last:border-b-0">
                                        <td className="py-2 font-medium">{rec.date}</td>
                                        <td className="py-2 text-right">{formatTime(rec.checkIn)} - {formatTime(rec.checkOut)}</td>
                                    </tr>
                                )) : ( <tr><td colSpan={2} className="text-center py-4 text-gray-500">No attendance records.</td></tr> )}
                            </tbody>
                        </table>
                    </InfoCard>
                     <InfoCard title="Leave Request History">
                        {leaveRequests.length > 0 ? (
                            <ul className="space-y-3">
                                {leaveRequests.sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).slice(0, 5).map(req => (
                                    <li key={req.id} className="flex justify-between items-center">
                                        <div>
                                            <p className="font-medium text-gray-900">{req.startDate}</p>
                                            <p className="text-sm text-gray-500">{req.reason}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMapLeave[req.status]}`}>{req.status}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : ( <p className="text-gray-500">No leave requests found.</p> )}
                    </InfoCard>
                </div>
            </div>
        </div>
    );
};

const EmployeesView: React.FC<EmployeesViewProps> = ({ employees, addEmployee, updateEmployee, attendance, timesheets, projects, leaveRequests }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    updateEmployee(updatedEmployee);
    setSelectedEmployee(updatedEmployee);
  };

  if (selectedEmployee) {
    return (
      <EmployeeDetail 
        employee={selectedEmployee}
        attendance={attendance.filter(a => a.employeeId === selectedEmployee.id)}
        timesheets={timesheets.filter(t => t.employeeId === selectedEmployee.id)}
        projects={projects}
        leaveRequests={leaveRequests.filter(lr => lr.employeeId === selectedEmployee.id)}
        onUpdate={handleUpdateEmployee}
        onBack={() => setSelectedEmployee(null)}
      />
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main">Employees</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-hover flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
          Add Employee
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <div className="p-4">
            <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Email</th>
                <th scope="col" className="px-6 py-3">Role</th>
                <th scope="col" className="px-6 py-3">Hire Date</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(emp => (
                <tr key={emp.id} className="bg-white border-b hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedEmployee(emp)}>
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center space-x-3">
                        <img className="h-8 w-8 rounded-full object-cover" src={`https://i.pravatar.cc/40?u=${emp.email}`} alt={emp.name}/>
                        <span>{emp.name}</span>
                    </td>
                    <td className="px-6 py-4">{emp.email}</td>
                    <td className="px-6 py-4">{emp.role}</td>
                    <td className="px-6 py-4">{emp.hireDate}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Onboard New Employee">
        <EmployeeForm onSave={addEmployee} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default EmployeesView;
