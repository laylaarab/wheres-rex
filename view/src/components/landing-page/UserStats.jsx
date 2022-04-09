import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { UserContext } from "../../context/UserContext";
import FlagIcon from '@mui/icons-material/Flag';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import axios from 'axios';

async function fetchUserStats(userId) {
    const { data } = await axios.get(`/api/user-stats/${userId}`)
    return data
}

export default function UserStats() {
    const [user, _] = useContext(UserContext);
    const {data, error, isError, isLoading } = useQuery('userstats', () => fetchUserStats(user.googleId)) 

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
                <CheckCircleOutlineIcon />
                <span className="stat">{data.avgScore}</span> <span className="stat-title">Average Score</span>
            </Grid>
            <Grid item xs={4}>
                <CheckCircleIcon />
                <span className="stat">{data.bestScore}</span> <span className="stat-title">Best Score</span>
            </Grid>
        </Grid>
    );
}
