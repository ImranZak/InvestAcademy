// KnowledgeCheck.js
import React, { useState } from 'react';
import { Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button, Box, Paper } from '@mui/material';
import { useSnackbar } from 'notistack';

const ModuleKnowledgeCheck = ({ question, options, correctAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedAnswer === correctAnswer) {
      enqueueSnackbar('Correct! Well done!', { variant: 'success' });
    } else {
      enqueueSnackbar('Incorrect. Please try again.', { variant: 'error' });
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: '20px', borderRadius: '10px', mb: '20px' }}>
      <Typography variant="h6" sx={{ mb: '20px' }}>
        <strong>Knowledge Check:</strong>
      </Typography>

      <FormControl component="fieldset">
        <FormLabel component="legend">{question}</FormLabel>
        <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
          {options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={`${option.label}`}
            />
          ))}
        </RadioGroup>
      </FormControl>

      <Box sx={{ mt: '20px', textAlign: 'center' }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Paper>
  );
};

export default ModuleKnowledgeCheck;
