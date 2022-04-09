import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { UserContext } from "../context/UserContext";
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import MultiPlayerScoresList from './MultiPlayerScoresList'
import UserStats from "./landing-page/UserStats";

async function fetchGameStats(roomId, gameId) {
    const { data } = await axios.get(`/api/multi-game/result/${roomId}/${gameId}`)
    return data
}

export default function SinglePlayerGameStats({ roomId, gameId }) {
    const [user, _] = useContext(UserContext);
    const { data, error, isError, isLoading } = useQuery('posts', () => fetchGameStats(roomId, gameId))

    if (isLoading || isError) {
        return <div>Loading...</div>
    }

    return (
        <Grid item container xs={12} className="scores-box">
            {
                data && data[gameId] ? (
                    <>
                        <Grid item xs={12}>
                            <h1>Congrats {user.name}!</h1>
                            <h2>You scored {data[gameId].score} points!</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <MultiPlayerScoresList scores={data}/>
                        </Grid>
                    </>
                ) : (
                    <div className="error">Loading...</div>
                )
            }
        </Grid>

    );
}
