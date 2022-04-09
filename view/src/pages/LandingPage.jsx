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


function LandingPage() {

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
                    borderRadius: '20px'
                }}>
                <Grid container spacing={2} id="">
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12} md={3}>
                            <img referrerPolicy="no-referrer" className="avatar-home" src={user.imageUrl} alt={user.name} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <h1 className="name">
                                {user.name}
                            </h1>
                        </Grid>
                        <Grid item container xs={12} md={3}>
                            <Grid item xs={12}>
                                <Button variant="contained" component={Link} to="/single-player/">Single Player</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" component={Link} to="/multi-player/">Join a Lobby</Button>
                            </Grid>
                        </Grid>
                        <UserStats />
                    </Grid>
                    <Grid item xs={12} s={12}>
                        <LeaderBoard />
                    </Grid>
                    <Grid item xs={12} id="">

                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}

export default LandingPage;

