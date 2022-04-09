import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { UserContext } from "../context/UserContext";
import axios from 'axios';


export default function MultiPlayerScoresList({ scores }) {
    const [user, _] = useContext(UserContext);

    return (
        <div>
            <h1>Players</h1>
            <List>
                {Object.keys(scores).map((key, index) => {
                    if (!scores[key]) return(<></>)
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Avatar src={scores[key].user.imageUrl}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={scores[key].user.name}
                                secondary={`Scored ${scores[key].score} points`}
                            />
                        </ListItem>
                    )
                })}


            </List>
        </div>
    );

    // const {data, error, isError, isLoading } = useQuery('posts', fetchUserStats) 

    // if(isLoading || isError) {
    //     return <div>Loading...</div>
    // }

    // return (
    //     <Grid item container xs={12} className="scores-box">
    //         <Grid item xs={4}>
    //             <FlagIcon />
    //             <span className="stat">{data.gamesPlayed}</span> <span className="stat-title">Games Played</span>
    //         </Grid>
    //         <Grid item xs={4}>
    //             <AccessTimeIcon />
    //             <span className="stat">{data.fastestTime} min</span> <span className="stat-title">Fastest Time</span>
    //         </Grid>
    //         <Grid item xs={4}>
    //             <CheckCircleIcon />
    //             <span className="stat">{data.bestScore}</span> <span className="stat-title">Best Score</span>
    //         </Grid>
    //     </Grid>
    // );
}
