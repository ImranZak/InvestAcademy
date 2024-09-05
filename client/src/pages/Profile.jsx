import React, { useContext, useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from '../contexts/UserContext';

function Profile() {
  const { user } = useContext(UserContext);
  const [highScore, setHighScore] = useState(null);

  useEffect(() => {
    http.get(`/users/${user.id}`).then((res) => {
      setHighScore(res.data.highScore);
      console.log(highScore);
    });
  }, []);

  return (
    <Container>
      <Typography variant='h4'>Financial Literacy Quiz</Typography>
      { highScore ? 
        <Typography>High score: {highScore}</Typography>
        :
        <Typography>You do not have a high score</Typography>
      }
    </Container>
  )
}

export default Profile;