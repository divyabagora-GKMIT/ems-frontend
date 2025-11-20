import React from 'react';
import { Card, CardContent, Grid, Typography, Divider } from '@mui/material';
import DashboardHeader from '../common/DashboardHeader';
import { Person as PersonIcon, Email as EmailIcon, Phone as PhoneIcon, Business as BusinessIcon, LocationOn as LocationIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';

const MyDetails = () => {
  // Sample data - replace with actual API data
  const userDetails = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    employeeId: 'EMP-001',
    department: 'Engineering',
    role: 'Senior Developer',
    position: 'Software Engineer',
    joinDate: '2022-03-15',
    location: 'New York, USA',
    manager: 'Jane Smith',
    address: '123 Main Street, New York, NY 10001',
  };

  const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start py-3 border-b border-gray-100 last:border-0">
      <div className="mr-4 mt-1 text-gray-500">
        {icon}
      </div>
      <div className="flex-1">
        <Typography variant="body2" className="text-gray-500 mb-1">
          {label}
        </Typography>
        <Typography variant="body1" className="font-medium text-gray-900">
          {value}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <DashboardHeader 
        title="My Details" 
        subtitle="View your personal information and profile"
      />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card className="bg-white shadow-md rounded-xl">
            <CardContent className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                  <PersonIcon className="text-white" fontSize="large" />
                </div>
                <div>
                  <Typography variant="h5" className="font-bold text-gray-900">
                    {userDetails.name}
                  </Typography>
                  <Typography variant="body2" className="text-gray-600">
                    {userDetails.position}
                  </Typography>
                </div>
              </div>
              
              <Divider className="my-4" />
              
              <div className="space-y-1">
                <InfoRow 
                  icon={<EmailIcon fontSize="small" />}
                  label="Email"
                  value={userDetails.email}
                />
                <InfoRow 
                  icon={<PhoneIcon fontSize="small" />}
                  label="Phone"
                  value={userDetails.phone}
                />
                <InfoRow 
                  icon={<BusinessIcon fontSize="small" />}
                  label="Department"
                  value={userDetails.department}
                />
                <InfoRow 
                  icon={<PersonIcon fontSize="small" />}
                  label="Role"
                  value={userDetails.role}
                />
                <InfoRow 
                  icon={<BusinessIcon fontSize="small" />}
                  label="Employee ID"
                  value={userDetails.employeeId}
                />
                <InfoRow 
                  icon={<LocationIcon fontSize="small" />}
                  label="Location"
                  value={userDetails.location}
                />
                <InfoRow 
                  icon={<PersonIcon fontSize="small" />}
                  label="Manager"
                  value={userDetails.manager}
                />
                <InfoRow 
                  icon={<CalendarIcon fontSize="small" />}
                  label="Join Date"
                  value={userDetails.joinDate}
                />
                <InfoRow 
                  icon={<LocationIcon fontSize="small" />}
                  label="Address"
                  value={userDetails.address}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card className="bg-white shadow-md rounded-xl">
            <CardContent className="p-6">
              <Typography variant="h6" className="font-bold text-gray-900 mb-4">
                Quick Actions
              </Typography>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-blue-700 font-medium">
                  Edit Profile
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium">
                  Change Password
                </button>
                <button className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700 font-medium">
                  Download Profile
                </button>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default MyDetails;

