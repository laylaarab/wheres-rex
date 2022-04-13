import { useContext } from "react";
import { useQuery } from 'react-query'
import { DataGrid } from '@mui/x-data-grid';
import { UserContext } from "../../context/UserContext";
import { Avatar } from '@mui/material'
import Stack from '@mui/material/Stack';
import axios from 'axios';

async function fetchLeaderboard() {
    const { data } = await axios.get('/api/leaderboard')
    return data
}

const columns = [
    {
        field: 'imageURL',
        headerName: '',
        maxWidth: 100,
        align: 'center',
        flex: 1,
        sortable: false,
        renderCell: (params) => <Avatar src={params.value} />, // renderCell will render the component
    },
    {
        field: 'name',
        headerName: 'Name',
        flex: 1,
        sortable: false,


    },
    {
        field: 'gamesPlayed',
        headerName: 'Games Played',
        flex: 1,
        sortable: false,


    },
    {
        field: 'bestScore',
        headerName: 'Best Score',
        flex: 1,
        sortable: false,

    },


];

export default function LeaderBoard() {
    const [user, _] = useContext(UserContext);
    const { data, isError, isLoading } = useQuery('leaderboard', () => fetchLeaderboard())
    console.log("loading is: " + isLoading + " error is: " + isError)
    return (
        <div>
            <h1>Leaderboard</h1>
            {
                isLoading || isError ? <div /> :
                    <DataGrid
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        rowHeight={80}
                        autoHeight
                        disableSelectionOnClick
                        disableColumnMenu
                        sortModel={[{ field: 'bestScore', sort: 'desc' }]}
                        components={{
                            NoRowsOverlay: () => (
                                <Stack height="100%" alignItems="center" justifyContent="center">
                                    No one's in the Leaderboard yet! Go find Rex!
                                </Stack>
                            ),
                        }}
                    />
            }
        </div>
    );
}
