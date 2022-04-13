import { useState, useContext } from "react";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import { Avatar } from "@mui/material";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Button } from "@mui/material";
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Item from "../components/Item";
import { DataGrid } from '@mui/x-data-grid';
import UserStats from "../components/landing-page/UserStats";
import LeaderBoard from "../components/landing-page/LeaderBoard";

// Main page after logging in 
function LandingPage() {
    // Go to login page if not logged in
    const [user, _] = useContext(UserContext);
    if (!user) {
        return <Navigate to="/login-page" />
    }

    return (

        <div className="App">
            <RexAppBar />
            <Container maxWidth="md"
                style={{
                    maxWidth: '1200px',
                    backgroundColor: '#ffffff',
                    marginTop: '45px',
                    borderRadius: '20px',
                    paddingBottom: '30px',
                }}>
                <Grid container spacing={2} id="">
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12} sm={5} md={2}>
                            <img referrerPolicy="no-referrer" className="avatar-home" src={user.imageUrl} alt={user.name} />
                        </Grid>
                        <Grid item container xs={12} sm={7}>
                            <Grid item xs={12} md={6}>
                                <h1 className="name">
                                    {user.name}
                                </h1>
                            </Grid>
                            <Grid item xs={12}>
                                <UserStats />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12} sm={5} md={2}>
                                <Button fullWidth variant="contained" component={Link} to="/single-player/">Single Player</Button>
                            </Grid>
                            <Grid item xs={12} sm={5} md={2}>
                                <Button fullWidth variant="contained" component={Link} to="/multi-player/">Join a Lobby</Button>
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xs={12} s={12}>
                        <LeaderBoard />
                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}

export default LandingPage;

