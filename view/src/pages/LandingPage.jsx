import { useState, useContext } from "react";
import Grid from '@mui/material/Grid';
import RexAppBar from '../components/NavBar';
import Container from '@mui/material/Container';
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


function LandingPage() {


    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 90,
        },
        {
            field: 'fullName',
            headerName: 'Full name',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,
            valueGetter: (params) =>
                `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
    ];

    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    ];


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
            <Container maxWidth="md"
                style={{
                    maxWidth: '1200px',
                    backgroundColor: '#ffffff',
                    marginTop: '45px',
                    borderRadius: '20px'
                }}>
                <Grid container spacing={2} id="">
                    <Grid item container spacing={2} xs={12}>
                        <Grid item xs={12} md={3}>
                            <img referrerPolicy="no-referrer" className="avatar-home" src={user.imageUrl} alt={user.name} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <h1 className="name">
                                {user.name}
                            </h1>
                        </Grid>
                        <Grid item container xs={12} md={3}>
                            <Grid item xs={12}>
                                <Button variant="contained">Single Player</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained">Create a Lobby</Button>
                            </Grid>
                        </Grid>
                        <UserStats />
                    </Grid>
                    <Grid item xs={12} s={12}>
                        <h1>Leaderboard</h1>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                        />
                    </Grid>
                    <Grid item xs={12} id="">

                    </Grid>
                </Grid>
            </Container>
        </div>

    );
}

export default LandingPage;

