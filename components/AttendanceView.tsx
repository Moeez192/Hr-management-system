import React from 'react';
import { AttendanceRecord } from '../types';

interface AttendanceViewProps {
  attendance: AttendanceRecord[];
  checkIn: (employeeId: string) => void;
  checkOut: (employeeId: string) => void;
}

// Mocking current user
const CURRENT_EMPLOYEE_ID = 'emp1'; 

const AttendanceView: React.FC<AttendanceViewProps> = ({ attendance, checkIn, checkOut }) => {
  const today = new Date().toISOString().split('T')[0];
  const todaysRecord = attendance.find(a => a.employeeId === CURRENT_EMPLOYEE_ID && a.date === today);

  const canCheckIn = !todaysRecord;
  const canCheckOut = todaysRecord && !todaysRecord.checkOut;

  const formatTime = (isoString: string | null) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div>
        <h1 className="text-3xl font-bold text-text-main mb-6">Attendance</h1>
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-text-main">Today's Attendance</h2>
                        <p className="text-text-light">{new Date().toDateString()}</p>
                    </div>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <button onClick={() => checkIn(CURRENT_EMPLOYEE_ID)} disabled={!canCheckIn} className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            Check In
                        </button>
                        <button onClick={() => checkOut(CURRENT_EMPLOYEE_ID)} disabled={!canCheckOut} className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            Check Out
                        </button>
                    </div>
                </div>
                <div className="mt-6 flex justify-around text-center border-t pt-4">
                    <div>
                        <p className="text-text-light">Check In Time</p>
                        <p className="text-2xl font-bold text-text-main">{formatTime(todaysRecord?.checkIn || null)}</p>
                    </div>
                    <div>
                        <p className="text-text-light">Check Out Time</p>
                        <p className="text-2xl font-bold text-text-main">{formatTime(todaysRecord?.checkOut)}</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
                <h3 className="text-lg font-semibold text-text-main mb-4">Attendance History</h3>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">Check In</th>
                            <th scope="col" className="px-6 py-3">Check Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.filter(a => a.employeeId === CURRENT_EMPLOYEE_ID).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(rec => (
                            <tr key={rec.id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4">{rec.date}</td>
                                <td className="px-6 py-4">{formatTime(rec.checkIn)}</td>
                                <td className="px-6 py-4">{formatTime(rec.checkOut)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default AttendanceView;
