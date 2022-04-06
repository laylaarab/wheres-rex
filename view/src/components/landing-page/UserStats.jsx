import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { UserContext } from "../../context/UserContext";
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

async function fetchUserStats() {
    const { data } = await axios.get('/api/user-stats')
    return data
}

export default function UserStats() {
    const [user, _] = useContext(UserContext);
    const {data, error, isError, isLoading } = useQuery('posts', fetchUserStats) 

    if(isLoading || isError) {
        return <div>Loading...</div>
    }

    return (
        <Grid item container xs={12} className="scores-box">
            <Grid item xs={4}>
                <FlagIcon />
                <span className="stat">{data.gamesPlayed}</span> <span className="stat-title">Games Played</span>
            </Grid>
            <Grid item xs={4}>
                <AccessTimeIcon />
                <span className="stat">{data.fastestTime} min</span> <span className="stat-title">Fastest Time</span>
            </Grid>
            <Grid item xs={4}>
                <CheckCircleIcon />
                <span className="stat">{data.bestScore}</span> <span className="stat-title">Best Score</span>
            </Grid>
        </Grid>
    );
}
