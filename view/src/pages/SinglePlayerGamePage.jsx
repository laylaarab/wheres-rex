import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import Login from '../components/Login'
import { UserContext } from "../context/UserContext";
import PhotoSphere from "../components/PhotoSphere"
import io from "socket.io-client";
import Score from "../components/Score"
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
            socket.emit('newSinglePlayerGame', user)

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
                const id = socket.id
                socket.close()

                navigate(`/single-player/results/${id}`)
            });
        });
        return () => socket.close();
    }, [navigate, setSocket, setScore, user]);

    const submitGuess = function (coords) {
        socket.emit('submitGuess', coords)
    }

    if (!user) {
        return <div className="error">You must be logged in! <Login /></div>
    }

    return (
        <div className="App">
            <RexAppBar />
            {socket ? (
                <Grid container spacing={2} id="">
                    <Score score={score} />
                    <Grid item xs={12} sm={12} md={12}>
                        <PhotoSphere imgUrl={'/img_360/' + img} />
                    </Grid>
                    <Grid container id="map-grid">
                        <Grid item md={9} xs={12}>
                        </Grid>
                        <Grid id="map-loc-fix" item md={3} xs={12}>
                            <MapLocation width={350} height={300} socket={socket} handler={submitGuess} />
                        </Grid>
                    </Grid>
                </Grid>
            ) : (
                <div className="error">Waiting for socket</div>
            )}

        </div>
    );
}


