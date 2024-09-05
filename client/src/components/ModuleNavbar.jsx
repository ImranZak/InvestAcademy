import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    navbar: {
      backgroundColor: 'white',
      boxShadow: 'none',
    },
    button: {
      color: 'white',
      margin: '0 10px',
    },
  });

const ModuleNavbar = () => {
    const classes = useStyles();

    return (
        <AppBar position="fixed" className={classes.navbar}>
            <Toolbar>
                <Typography variant="h6" sx={{mr: 2}}>InvestAcademy</Typography>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#section1">Lesson 1</Button>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#section2">Lesson 2</Button>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#section3">Lesson 3</Button>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#section4">Lesson 4</Button>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#section5">Lesson 5</Button>
                <Button sx={{mr: 2}} variant="contained" color="primary" href="#quiz">Quiz</Button>
            </Toolbar>
        </AppBar>
    );
};

export default ModuleNavbar;
