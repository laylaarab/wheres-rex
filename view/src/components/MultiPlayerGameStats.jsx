import { useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import MultiPlayerScoresList from './MultiPlayerScoresList'

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
                            <h2 style={{ color: 'rgb(115 154 34)    ' }}>You scored {data[gameId].score} points!</h2>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <MultiPlayerScoresList scores={data} />
                        </Grid>
                    </>
                ) : (
                    <div className="error">Loading...</div>
                )
            }
        </Grid>

    );
}
