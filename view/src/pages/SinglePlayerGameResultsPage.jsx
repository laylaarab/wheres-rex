import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import Login from '../components/Login'
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
import PhotoSphere from "../components/PhotoSphere"
import io from "socket.io-client";
import MapLocation from "../components/MapLocation";
import SinglePlayerGameStats from "../components/SinglePlayerGameStats";

export default function SinglePlayerGameResultsPage() {

    const [user, _] = useContext(UserContext);
    let { gameId } = useParams();


    if (!user) {
        return <div className="error">You must be logged in! <Login /></div>
    }

    return (
        <div className="App">
            <RexAppBar />
            <Container maxWidth="false"
                style={{
                    marginTop: '6px',
                }}>
                <Grid container spacing={2} id="">
                    <Grid item xs={12}>
                        <SinglePlayerGameStats gameId={gameId} />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" component={Link} to="/landing-page">HOME</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

