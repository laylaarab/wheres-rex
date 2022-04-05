import { useState, useContext } from "react";
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";

function LandingPage() {
    // const [response, setResponse] = useState("");

    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //         setResponse(data);
    //     });
    // }, []);

    const [user, _] = useContext(UserContext);
    if (!user) {
        return <Navigate to="/login-page" />
    }
    
    return (

        <div className="App">
            <RexAppBar />
            <Container
                style={{
                    minWidth: "100%",
                    height: "1000vh",
                    backgroundColor: '#ebebeb'
                }}
            >
                Pls play
            </Container>
        </div>

    );
}

export default LandingPage;

