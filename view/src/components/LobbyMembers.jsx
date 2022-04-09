import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { UserContext } from "../context/UserContext";
import axios from 'axios';


export default function LobbyMembers({ members }) {
    const [user, _] = useContext(UserContext);

    return (
        <div>
            <h1>Waiting for others to join...</h1>
            <List>
                {members.map((value, index) => {
                    if (!value) return(<></>)
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Avatar src={value.imageUrl}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={value.name}
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
