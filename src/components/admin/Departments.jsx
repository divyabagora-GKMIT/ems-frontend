import React from 'react';
import { Card, CardContent, Grid, Typography, Chip } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { Business as BusinessIcon, People as PeopleIcon } from '@mui/icons-material';

const Departments = () => {
  // Sample data - replace with actual API data
  const departments = [
    { id: 1, name: 'Engineering', employees: 25, manager: 'John Doe', description: 'Software development and engineering' },
    { id: 2, name: 'Design', employees: 12, manager: 'Jane Smith', description: 'UI/UX design and creative work' },
    { id: 3, name: 'Marketing', employees: 18, manager: 'Bob Johnson', description: 'Marketing and communications' },
    { id: 4, name: 'HR', employees: 8, manager: 'Alice Williams', description: 'Human resources and recruitment' },
    { id: 5, name: 'Sales', employees: 15, manager: 'Charlie Brown', description: 'Sales and business development' },
    { id: 6, name: 'Finance', employees: 10, manager: 'Diana Prince', description: 'Finance and accounting' },
  ];

  return (
    <div className="p-6">
      <DashboardHeader 
        title="Departments" 
        subtitle="View and manage all departments in your organization"
      />
      
      <Grid container spacing={3}>
        {departments.length > 0 ? (
          departments.map((dept) => (
            <Grid item xs={12} sm={6} md={4} key={dept.id}>
              <Card className="bg-white shadow-md rounded-xl hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <BusinessIcon className="text-blue-600 mr-3" fontSize="large" />
                    <Typography variant="h6" className="font-bold text-gray-900">
                      {dept.name}
                    </Typography>
                  </div>
                  
                  <Typography variant="body2" className="text-gray-600 mb-4">
                    {dept.description}
                  </Typography>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <PeopleIcon className="mr-2 text-gray-500" fontSize="small" />
                      <span className="font-medium">{dept.employees}</span>
                      <span className="ml-1">employees</span>
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Manager:</span> {dept.manager}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
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
                <BusinessIcon className="mx-auto mb-4 text-gray-400" fontSize="large" />
                <Typography variant="body1" className="text-gray-500">
                  No departments found
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default Departments;

