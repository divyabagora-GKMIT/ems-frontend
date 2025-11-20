import React from 'react';
import { Card, CardContent, Grid, Typography, Chip } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { Folder as FolderIcon, CalendarToday as CalendarIcon, People as PeopleIcon } from '@mui/icons-material';

const MyProjects = () => {
  // Sample data - replace with actual API data
  const myProjects = [
    { 
      id: 1, 
      name: 'Website Redesign', 
      status: 'In Progress', 
      department: 'Design', 
      startDate: '2024-01-15', 
      endDate: '2024-04-30',
      role: 'Lead Designer',
      progress: 65
    },
    { 
      id: 2, 
      name: 'Mobile App Development', 
      status: 'Active', 
      department: 'Engineering', 
      startDate: '2024-02-01', 
      endDate: '2024-06-30',
      role: 'Frontend Developer',
      progress: 40
    },
    { 
      id: 3, 
      name: 'Marketing Campaign Q2', 
      status: 'Planning', 
      department: 'Marketing', 
      startDate: '2024-03-01', 
      endDate: '2024-05-31',
      role: 'Content Creator',
      progress: 15
    },
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
        title="My Projects" 
        subtitle="View all projects assigned to you"
      />
      
      <Grid container spacing={3}>
        {myProjects.length > 0 ? (
          myProjects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
              <Card className="bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FolderIcon className="text-blue-600 mr-3" fontSize="large" />
                    <div className="flex-1">
                      <Typography variant="h6" className="font-bold text-gray-900">
                        {project.name}
                      </Typography>
                      <Chip 
                        label={project.status} 
                        className={`${getStatusColor(project.status)} mt-2`}
                        size="small"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-700">
                      <PeopleIcon className="mr-2 text-gray-500" fontSize="small" />
                      <span className="font-medium">Role:</span>
                      <span className="ml-2">{project.role}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-700">
                      <CalendarIcon className="mr-2 text-gray-500" fontSize="small" />
                      <span>{project.startDate} - {project.endDate}</span>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Card className="bg-white shadow-md rounded-xl">
              <CardContent className="text-center py-12">
                <FolderIcon className="mx-auto mb-4 text-gray-400" fontSize="large" />
                <Typography variant="body1" className="text-gray-500">
                  No projects assigned to you
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default MyProjects;

