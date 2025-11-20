import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, Chip } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { Folder as FolderIcon } from '@mui/icons-material';

const Projects = () => {
  // Sample data - replace with actual API data
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'In Progress', department: 'Design', startDate: '2024-01-15', endDate: '2024-04-30', teamSize: 5 },
    { id: 2, name: 'Mobile App Development', status: 'Active', department: 'Engineering', startDate: '2024-02-01', endDate: '2024-06-30', teamSize: 8 },
    { id: 3, name: 'Marketing Campaign Q2', status: 'Planning', department: 'Marketing', startDate: '2024-03-01', endDate: '2024-05-31', teamSize: 4 },
    { id: 4, name: 'HR System Upgrade', status: 'Completed', department: 'HR', startDate: '2023-11-01', endDate: '2024-01-31', teamSize: 3 },
    { id: 5, name: 'Data Analytics Platform', status: 'In Progress', department: 'Engineering', startDate: '2024-01-20', endDate: '2024-07-31', teamSize: 6 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Active':
        return 'bg-purple-100 text-purple-800';
      case 'Planning':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <DashboardHeader 
        title="Projects" 
        subtitle="Track and manage all projects across your organization"
      />
      
      <Card className="bg-white shadow-md rounded-xl overflow-hidden">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-50">
                <TableCell className="font-semibold text-gray-700">Project Name</TableCell>
                <TableCell className="font-semibold text-gray-700">Status</TableCell>
                <TableCell className="font-semibold text-gray-700">Department</TableCell>
                <TableCell className="font-semibold text-gray-700">Start Date</TableCell>
                <TableCell className="font-semibold text-gray-700">End Date</TableCell>
                <TableCell className="font-semibold text-gray-700">Team Size</TableCell>
                <TableCell className="font-semibold text-gray-700">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <TableRow 
                    key={project.id} 
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <FolderIcon className="mr-2 text-blue-600" fontSize="small" />
                        {project.name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={project.status} 
                        className={getStatusColor(project.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell className="text-gray-600">{project.department}</TableCell>
                    <TableCell className="text-gray-600">{project.startDate}</TableCell>
                    <TableCell className="text-gray-600">{project.endDate}</TableCell>
                    <TableCell className="text-gray-600">{project.teamSize} members</TableCell>
                    <TableCell>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    <FolderIcon className="mx-auto mb-2 text-gray-400" />
                    No projects found
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

export default Projects;

