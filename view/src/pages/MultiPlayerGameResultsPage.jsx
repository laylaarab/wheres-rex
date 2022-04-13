import { useContext } from "react";
import { useParams } from "react-router-dom";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom'
import Login from '../components/Login'
import { UserContext } from "../context/UserContext";
import { Button } from "@mui/material";
import MultiPlayerGameStats from "../components/MultiPlayerGameStats";


export default function MultiPlayerGameResultsPage() {

    const [user, _] = useContext(UserContext);
    let { gameId, roomId } = useParams();


    if (!user) {
        return <div className="error">You must be logged in! <Login /></div>
    }

    return (
        <div className="App">
            <RexAppBar />
            <Container maxWidth="md"
                style={{
                    maxWidth: '1200px',
                    backgroundColor: '#ffffff',
                    marginTop: '45px',
                    borderRadius: '20px'
                }}>
                <Grid container spacing={2} id="">
                    <Grid item xs={12}>
                        <MultiPlayerGameStats gameId={gameId} roomId={roomId} />
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: '20px' }}>
                        <Button variant="contained" component={Link} to="/landing-page">HOME</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

