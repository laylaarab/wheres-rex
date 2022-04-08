import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { UserContext } from "../context/UserContext";
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

async function fetchGameStats(gameId) {
    const { data } = await axios.get(`/api/single-game/result/${gameId}`)
    return data
}

export default function SinglePlayerGameStats({gameId}) {
    const [user, _] = useContext(UserContext);
    const {data, error, isError, isLoading } = useQuery('posts', () => fetchGameStats(gameId)) 

    if(isLoading || isError) {
        return <div>Loading...</div>
    }

    return (
        <Grid item container xs={12} className="scores-box">
            <Grid item xs={12}>
                <h1>Congrats {user.name}!</h1>
                <h2>You scored {data.score} points!</h2>
            </Grid>
           
        </Grid>
    );
}