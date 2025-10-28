import React, { useState } from 'react';
import Modal from './common/Modal';
import { Project, Employee, ProjectStatus } from '../types';

interface ProjectsViewProps {
  projects: Project[];
  employees: Employee[];
  addProject: (project: Omit<Project, 'id' | 'employeeIds' | 'status'> & { status: ProjectStatus }) => void;
  assignEmployeeToProject: (projectId: string, employeeId: string) => void;
}

const ProjectForm: React.FC<{ onSave: (project: Omit<Project, 'id' | 'employeeIds' | 'status'> & { status: ProjectStatus }) => void; onClose: () => void }> = ({ onSave, onClose }) => {
    const [name, setName] = useState('');
    const [client, setClient] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ name, client, status: ProjectStatus.NotStarted });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Project Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <input type="text" value={client} onChange={e => setClient(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm" required />
                </div>
            </div>
             <div className="mt-6 flex justify-end space-x-3">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">Cancel</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-hover">Save Project</button>
            </div>
        </form>
    );
};

const statusColorMap: { [key in ProjectStatus]: string } = {
    [ProjectStatus.NotStarted]: "bg-slate-100 text-slate-700",
    [ProjectStatus.InProgress]: "bg-indigo-100 text-indigo-700",
    [ProjectStatus.Completed]: "bg-emerald-100 text-emerald-700",
};

const ProjectsView: React.FC<ProjectsViewProps> = ({ projects, employees, addProject, assignEmployeeToProject }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-text-main">Projects</h1>
        <button onClick={() => setIsModalOpen(true)} className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-hover flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>
            Add Project
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(proj => (
          <div key={proj.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-text-main">{proj.name}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorMap[proj.status]}`}>
                {proj.status}
              </span>
            </div>
            <p className="text-sm text-text-light mt-1">{proj.client}</p>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Team Members</h4>
              <div className="flex -space-x-2">
                {proj.employeeIds.map(empId => {
                  const emp = employees.find(e => e.id === empId);
                  return emp ? <img key={empId} className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={`https://i.pravatar.cc/40?u=${emp.email}`} alt={emp.name} title={emp.name} /> : null;
                })}
              </div>
            </div>
            {/* Simple assignment UI for demo */}
            <div className="mt-4">
                <select onChange={(e) => assignEmployeeToProject(proj.id, e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md">
                    <option>Assign Employee...</option>
                    {employees.filter(e => !proj.employeeIds.includes(e.id)).map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Project">
        <ProjectForm onSave={addProject} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ProjectsView;
