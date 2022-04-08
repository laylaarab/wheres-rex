import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

export default function SinglePlayerGamePage() {
    const [socket, setSocket] = useState(null);
    const [img, setImg] = useState('');
    const [score, setScore] = useState(0);

    const [user, _] = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            return;
        }

        const socket = io(`http://${window.location.hostname}:3000`);
        setSocket(socket);

        socket.on("connect", () => {
            socket.emit('newSinglePlayerGame', user.googleId)

            socket.emit('getImage', user.googleId)
            socket.on("newImage", (data, callback) => {
                console.log(`Received game ${data}`);
                setImg(data.img)
            });
            socket.on("score", (data) => {
                console.log(`Received score ${data}`);
                setScore(data)
            });

            socket.on("gameOver", (data, callback) => {
                console.log(`Received game OVER`);
                // socket.close()

                navigate(`/single-player/results/${socket.id}`)
            });
        });
        return () => socket.close();
    }, [navigate, setSocket, user]);

    // socket.emit('newSinglePlayerGame', user.googleId)
    // socket.emit('getImage', user.googleId)


    // socket.on("newImage", (data, callback) => {
    //     console.log(`Received game ${data}`);
    //     setImg(data.img)
    // });



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
                {socket ? (
                    <Grid container spacing={2} id="">
                        <span id="score-box">
                            {score}
                        </span>
                        <Grid item xs={12}>
                            <PhotoSphere imgUrl={'/img_360/' + img} />
                        </Grid>
                        <Grid container id="map-grid">
                            <Grid item md={9} xs={12}>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <MapLocation width={350} height={300} socket={socket} />
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <div className="error">Waiting for socket</div>
                )}

            </Container>
        </div>
    );
}


