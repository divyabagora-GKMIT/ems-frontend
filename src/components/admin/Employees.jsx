import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { People as PeopleIcon } from '@mui/icons-material';

const Employees = () => {
  // Sample data - replace with actual API data
  const employees = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', department: 'Engineering', role: 'Developer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', department: 'Design', role: 'Designer' },
    { id: 3, name: 'Bob Johnson', email: 'bob.johnson@example.com', department: 'Marketing', role: 'Manager' },
    { id: 4, name: 'Alice Williams', email: 'alice.williams@example.com', department: 'Engineering', role: 'Senior Developer' },
  ];

  return (
    <div className="p-6">
      <DashboardHeader 
        title="All Employees" 
        subtitle="Manage and view all employees in your organization"
      />
      
      <Card className="bg-white shadow-md rounded-xl overflow-hidden">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold text-gray-700">Name</TableCell>
                <TableCell className="font-semibold text-gray-700">Email</TableCell>
                <TableCell className="font-semibold text-gray-700">Department</TableCell>
                <TableCell className="font-semibold text-gray-700">Role</TableCell>
                <TableCell className="font-semibold text-gray-700">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length > 0 ? (
                employees.map((employee) => (
                  <TableRow 
                    key={employee.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">{employee.name}</TableCell>
                    <TableCell className="text-gray-600">{employee.email}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {employee.department}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-600">{employee.role}</TableCell>
                    <TableCell>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <PeopleIcon className="mb-2 text-gray-400" />
                      <span>No employees found</span>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default Employees;

