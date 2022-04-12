import { useState, useContext, useEffect } from "react";
import { useQuery } from 'react-query'
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { UserContext } from "../context/UserContext";
import axios from 'axios';
import PhotoSphere from "./PhotoSphere";
import MapLocation from "./MapLocation";
import Score from "./Score";


export default function MultiPlayerGame({ socket, lobbyId }) {
    const [user, _] = useContext(UserContext);
    const [img, setImg] = useState('');
    const [guessPlaced, setGuessPlaced] = useState(false);
    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            return;
        }


        socket.on("newImage", (data, callback) => {
            console.log(`Received game ${data}`);
            setImg(data.img)
            setGuessPlaced(false);
        });
        socket.on("score", (data) => {
            console.log(`Received score ${data}`);
            setScore(data)
        });

        socket.on("gameOver", (data, callback) => {
            console.log(`Received game OVER`);
            const id = socket.id
            socket.close()

            navigate(`/multi-player/results/${lobbyId}/${id}`)
        });

        return () => socket.close();
    }, [navigate, socket, user, setGuessPlaced, lobbyId]);


    const submitGuess = function (coords) {
        setGuessPlaced(true);

        socket.emit('multiPlayerSubmitGuess', { lobbyId: lobbyId, coords: coords })

    }

    return (
        <div>
            {socket ? (
                <Grid container spacing={2} id="">
                    <Score score={score} />
                    <Grid item xs={12}>
                        <PhotoSphere imgUrl={'/img_360/' + img} />
                    </Grid>
                    <Grid container id="map-grid">
                        <Grid item md={9} xs={12}>
                        </Grid>
                        <Grid id="map-loc-fix" item md={3} xs={12}>
                            {
                                guessPlaced ? (
                                    <></>
                                ) : (
                                    <MapLocation width={350} height={300} handler={submitGuess} disabled />
                                )
                            }
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div className="error">Waiting for socket</div>
            )}
        </div>
    );
}
