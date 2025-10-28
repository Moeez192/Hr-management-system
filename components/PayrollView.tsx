import React from 'react';
import { PayrollRecord, Employee } from '../types';

interface PayrollViewProps {
  payroll: PayrollRecord[];
  employees: Employee[];
  calculatePayroll: (period: string) => void;
}

const PayrollView: React.FC<PayrollViewProps> = ({ payroll, employees, calculatePayroll }) => {
  const currentPeriod = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
            <h1 className="text-3xl font-bold text-text-main">Payroll</h1>
            <p className="text-text-light mt-1">Process payroll for the current period: {currentPeriod}</p>
        </div>
        <button onClick={() => calculatePayroll(currentPeriod)} className="bg-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-primary-hover">
          Calculate Payroll
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm overflow-x-auto">
        <h3 className="text-lg font-semibold text-text-main mb-4">Payroll Results</h3>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Employee</th>
              <th scope="col" className="px-6 py-3">Total Hours</th>
              <th scope="col" className="px-6 py-3">Gross Pay</th>
              <th scope="col" className="px-6 py-3">Deductions (15%)</th>
              <th scope="col" className="px-6 py-3">Net Pay</th>
            </tr>
          </thead>
          <tbody>
            {payroll.length === 0 ? (
                <tr>
                    <td colSpan={5} className="text-center py-10 text-gray-500">No payroll data calculated for this period.</td>
                </tr>
            ) : (
                payroll.map(rec => (
                <tr key={rec.employeeId} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{employees.find(e => e.id === rec.employeeId)?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{rec.totalHours.toFixed(2)}</td>
                    <td className="px-6 py-4">{formatCurrency(rec.grossPay)}</td>
                    <td className="px-6 py-4 text-red-500">{formatCurrency(rec.deductions)}</td>
                    <td className="px-6 py-4 font-bold text-green-600">{formatCurrency(rec.netPay)}</td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayrollView;
