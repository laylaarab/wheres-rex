import { useState, useContext } from "react";
import { useQuery } from 'react-query'
import Grid from '@mui/material/Grid';
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from "../../context/UserContext";
import axios from 'axios';

// async function fetchUserStats() {
//     const { data } = await axios.get('/api/user-stats')
//     return data
// }


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

export default function LeaderBoard() {
    const [user, _] = useContext(UserContext);

    return (
        <div>
            <h1>Leaderboard</h1>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
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
