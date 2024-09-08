import React from 'react';
import { Card, CardContent, CardMedia, Typography, Divider } from '@mui/material';

const TeamMemberCard = ({ imageSrc, name, role, description }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 'auto',
        borderRadius: 2,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      }}
    >
      <CardMedia
        sx={{
          height: 500, // Adjust this to fit the card
          width: '100%', // Make sure it fills the width of the card
          objectFit: 'cover', // This will ensure the image covers the container without distortion
        }}
        image={imageSrc || 'https://via.placeholder.com/345x140?text=Image+Placeholder'}
        title={name}
      />
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ color: 'gray' }}>
          {role}
        </Typography>
        <Divider sx={{ my: 2 }} /> {/* Margin top and bottom */}
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
