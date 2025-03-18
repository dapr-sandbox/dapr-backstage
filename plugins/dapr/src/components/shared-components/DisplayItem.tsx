import { Box, Typography } from '@material-ui/core';
import React from 'react';

export function DisplayItem({
  label,
  children,
  style,
}: {
  label: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <Box style={{ marginBottom: '0.5rem', ...style }}>
      <Typography
        variant="h6"
        style={{ fontSize: style?.fontSize ?? '1.2rem' }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}
