import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, CardMedia, Button, Divider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Info as InfoIcon, Person as PersonIcon, History as HistoryIcon } from '@mui/icons-material';
import TeamMemberCard from '../components/TeamMemberCard';
import './AboutUs.css';  // Import the CSS file

// Images
import MissionImage from '../assets/images/mission.png';
import TeamImage from '../assets/images/team.png';
import HistoryImage from '../assets/images/timeline.png';
import JakeImage from '../assets/images/jake.png';
import JeraldImage from '../assets/images/jerald.png';
import ImranImage from '../assets/images/imran.png';
import BrianImage from '../assets/images/brian.png';
import AmsyarImage from '../assets/images/amsyar.png';
import AbsentImage from '../assets/images/absent.png';

const milestones = [
    { year: 1991, event: 'Founded InvestAcademy Inc.' },
    { year: 2000, event: 'Launched first educational program for high school students' },
    { year: 2010, event: 'Expanded to online platforms' },
    { year: 2020, event: 'Introduced interactive trading simulations' },
];

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#002d5e',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#f4f4f4',
            paper: '#ffffff',
        },
        text: {
            primary: '#000000',
        },
    },
    typography: {
        fontFamily: 'Poppins, sans-serif',
    },
});

const AboutUs = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container className="container">
                <Typography variant="h3" gutterBottom sx={{ textAlign: 'center', color: '#002d5e' }} >
                    <strong>About Us</strong>
                </Typography>

                <Box className="mission-section" mb={4}>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={4}>
                            <img src={MissionImage} style={{ width: '150px', height: 'auto', maxWidth: '300px' }} />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{ mb: 2, color: '#002d5e' }}>
                                <PersonIcon className="icon" /> <strong>Our Mission</strong>
                            </Typography>
                            <Typography variant="h6">
                                At InvestAcademy, our mission is to empower teenagers with the knowledge and skills needed to make informed decisions in the stock market. We believe that early education in stock trading can foster financial literacy, responsibility, and strategic thinking. Established on September 1, 1991, InvestAcademy Inc. has been at the forefront of educational innovation, aiming to prepare the next generation of investors with the tools they need to succeed.
                            </Typography>
                        </Grid>

                    </Grid>

                </Box>

                <Box className="history-section" mb={4}>
                    <Grid container spacing={4} sx={{ mt: 2 }}>
                        <Grid item xs={8}>
                            <Typography variant="h5" sx={{ mb: 2, color: '#002d5e' }}>
                                <HistoryIcon className="icon" /> <strong>Our History</strong>
                            </Typography>
                            <Box>
                                {milestones.map((milestone, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <Typography variant="h5">{milestone.year}</Typography>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {milestone.event}
                                        </Typography>
                                        {index < milestones.length - 1 && <Divider sx={{ my: 2 }} />}
                                    </Box>
                                ))}
                            </Box>

                        </Grid>
                        <Grid item xs={4}>
                            <img src={HistoryImage} />
                        </Grid>

                    </Grid>

                </Box>

                <Box className="team-section" mb={4}>
                    <Typography variant="h5" sx={{ mb: 2, color: '#002d5e' }}>
                        <PersonIcon className="icon" /><strong>Meet Our Team</strong>
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={JakeImage}
                                name="Jake"
                                role="Software Engineer"
                                description="Jane is a passionate software engineer with a knack for building user-friendly applications. She loves solving complex problems and is always eager to learn new technologies."
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={JeraldImage}
                                name="Jerald"
                                role="Product Manager"
                                description="John is an experienced product manager who excels at driving product vision and strategy. He is skilled in managing cross-functional teams and delivering impactful results."
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={ImranImage}
                                name="Imran"
                                role="Product Manager"
                                description="John is an experienced product manager who excels at driving product vision and strategy. He is skilled in managing cross-functional teams and delivering impactful results."
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={4} sx={{ mt: 4 }}>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={AmsyarImage}
                                name="Amsyar"
                                role="Product Manager"
                                description="John is an experienced product manager who excels at driving product vision and strategy. He is skilled in managing cross-functional teams and delivering impactful results."
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={BrianImage}
                                name="Brian"
                                role="Product Manager"
                                description="John is an experienced product manager who excels at driving product vision and strategy. He is skilled in managing cross-functional teams and delivering impactful results."
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <TeamMemberCard
                                imageSrc={AbsentImage}
                                name="Absent"
                                role="Product Manager"
                                description="John is an experienced product manager who excels at driving product vision and strategy. He is skilled in managing cross-functional teams and delivering impactful results."
                            />

                        </Grid>
                    </Grid>



                </Box>

    
            </Container>
        </ThemeProvider>
    );
};

export default AboutUs;
