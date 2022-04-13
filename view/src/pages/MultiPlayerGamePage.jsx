import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import Login from '../components/Login'
import { UserContext } from "../context/UserContext";
import { Button } from "@mui/material";
import MultiPlayerGame from "../components/MultiPlayerGame"
import io from "socket.io-client";
import LobbyMembers from "../components/LobbyMembers";

export default function MultiPlayerGamePage() {
    const [socket, setSocket] = useState(null);

    const [members, setMembers] = useState([])
    const [lobbyId, setLobbyId] = useState('')
    const [gameStarted, setGameStarted] = useState(false)

    const [user, _] = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (user == null) {
            return;
        }

        const socket = io(`http://${window.location.hostname}:3000`);
        setSocket(socket);

        socket.on("connect", () => {
            socket.emit('multiPlayerGame', user);
        });

        socket.on("multiPlayerLobbyId", (data, callback) => {
            console.log(`Received lobby id`, data);
            setLobbyId(data)
        });


        socket.on("updateMembers", (data, callback) => {
            console.log(`Received members list`, data);
            setMembers(data)
        });

        socket.on("multiPlayerStarted", (data, callback) => {
            console.log('Lobby is starting the game!')
            setGameStarted(true);
        });

        // return () => socket.close();
    }, [navigate, setSocket, setMembers, setGameStarted, setLobbyId, user]);

    const startGame = function() {
        console.log('start game message sent to lobby')
        socket.emit('startMultiPlayer', user)
    }

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
                    !gameStarted ? (
                    <Grid container spacing={2} id="">
                        <Grid item xs={12}>
                            {members ? (
                                <LobbyMembers members={members} />
                            ) : (
                                <div className="error">Waiting for others to join...</div>
                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" disabled={members.length < 2} onClick={startGame}>Start Game</Button>
                        </Grid>
                    </Grid>
                    ) :(
                        <MultiPlayerGame socket={socket} lobbyId={lobbyId}/>
                    )
                ) : (
                    <div className="error">Waiting for socket</div>
                )}

            </Container>
        </div>
    );
}


