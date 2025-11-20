import React from 'react';
import { Card, CardContent, Grid, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { Business as BusinessIcon, People as PeopleIcon, Person as PersonIcon, Email as EmailIcon } from '@mui/icons-material';

const MyDepartment = () => {
  // Sample data - replace with actual API data
  const departmentInfo = {
    name: 'Engineering',
    description: 'Software development and engineering team responsible for building and maintaining our products.',
    manager: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Engineering Manager'
    },
    totalEmployees: 25,
    location: 'New York Office',
    established: '2020-01-15',
  };

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Senior Developer', email: 'john.doe@example.com' },
    { id: 2, name: 'Alice Johnson', role: 'Frontend Developer', email: 'alice.johnson@example.com' },
    { id: 3, name: 'Bob Williams', role: 'Backend Developer', email: 'bob.williams@example.com' },
    { id: 4, name: 'Charlie Brown', role: 'DevOps Engineer', email: 'charlie.brown@example.com' },
    { id: 5, name: 'Diana Prince', role: 'QA Engineer', email: 'diana.prince@example.com' },
  ];

  return (
    <div className="p-6">
      <DashboardHeader 
        title="My Department" 
        subtitle="View information about your department and team members"
      />
      
      <Grid container spacing={3}>
        {/* Department Overview */}
        <Grid item xs={12} md={8}>
          <Card className="bg-white shadow-md rounded-xl mb-3">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <BusinessIcon className="text-white" fontSize="large" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-gray-900">
                    {departmentInfo.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {departmentInfo.location}
                  </Typography>
                </div>
              </div>
              
              <Typography variant="body1" className="text-gray-700 mb-6">
                {departmentInfo.description}
              </Typography>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <PeopleIcon className="text-blue-600 mr-2" />
                    <Typography variant="body2" className="text-gray-600">
                      Total Employees
                    </Typography>
                  </div>
                  <Typography variant="h6" className="font-bold text-gray-900">
                    {departmentInfo.totalEmployees}
                  </Typography>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <BusinessIcon className="text-blue-600 mr-2" />
                    <Typography variant="body2" className="text-gray-600">
                      Established
                    </Typography>
                  </div>
                  <Typography variant="h6" className="font-bold text-gray-900">
                    {departmentInfo.established}
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Department Manager */}
          <Card className="bg-white shadow-md rounded-xl">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                Department Manager
              </Typography>
              <div className="flex items-center">
                <Avatar className="w-16 h-16 bg-blue-600 mr-4">
                  <PersonIcon />
                </Avatar>
                <div className="flex-1">
                  <Typography variant="h6" className="font-semibold text-gray-900">
                    {departmentInfo.manager.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600 mb-1">
                    {departmentInfo.manager.role}
                  </Typography>
                  <div className="flex items-center text-sm text-gray-600">
                    <EmailIcon className="mr-1" fontSize="small" />
                    {departmentInfo.manager.email}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Team Members */}
        <Grid item xs={12} md={4}>
          <Card className="bg-white shadow-md rounded-xl">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                Team Members
              </Typography>
              <List>
                {teamMembers.map((member) => (
                  <ListItem 
                    key={member.id}
                    className="hover:bg-gray-50 rounded-lg transition-colors mb-2"
                  >
                    <ListItemAvatar>
                      <Avatar className="bg-blue-600">
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" className="font-medium text-gray-900">
                          {member.name}
                        </Typography>
                      }
                      secondary={
                        <div>
                          <Typography variant="body2" className="text-gray-600">
                            {member.role}
                          </Typography>
                          <Typography variant="body2" className="text-gray-500 text-xs">
                            {member.email}
                          </Typography>
                        </div>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Members →
              </button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyDepartment;

