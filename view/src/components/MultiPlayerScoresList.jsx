import { useContext } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { UserContext } from "../context/UserContext";


export default function MultiPlayerScoresList({ scores }) {
    const [user, _] = useContext(UserContext);
    const flattenScores = (scoreObj) => {
        let scoresArr = [];
        Object.keys(scoreObj).map((key, index) => {
            scoresArr.push(scoreObj[key]);
        });
        return scoresArr.sort((a, b) => (a.score < b.score) ? 1 : -1)
    }
    return (
        <div>
            <h2 style={{ color: 'grey', textAlign: 'left', marginLeft: '15px' }}>Players</h2>
            <List >
                {flattenScores(scores).map((userScore, index) => {
                    if (!userScore) return (<></>)
                    let winner = index == 0

                    return (
                        <ListItem className={winner ? 'winner' : ''} style={{ borderBottom: "1px solid rgb(212, 212, 212)" }} key={userScore.user.googleId}>
                            <ListItemIcon>
                                <Avatar src={userScore.user.imageUrl} />
                            </ListItemIcon>
                            <ListItemText
                                primary={userScore.user.name}
                                secondary={`Scored ${userScore.score} points`}
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
