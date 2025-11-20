import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = ({ message = "No data available", icon }) => {
  return (
    <Box className="flex flex-col items-center justify-center py-12 px-4">
      {icon && <Box className="mb-4 text-gray-400">{icon}</Box>}
      <Typography variant="body1" className="text-gray-500 text-center">
        {message}
      </Typography>
    </Box>
  );
};

export default EmptyState;

