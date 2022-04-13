import { useContext } from "react";
import { List, ListItem, ListItemIcon, ListItemText, Avatar } from '@mui/material'
import { UserContext } from "../context/UserContext";

export default function LobbyMembers({ members }) {
    const [user, _] = useContext(UserContext);

    return (
        <div>
            <h1>Waiting for others to join...</h1>
            <List>
                {members.map((value, index) => {
                    if (!value) return(<></>)
                    return (
                        <ListItem key={index}>
                            <ListItemIcon>
                                <Avatar src={value.imageUrl}/>
                            </ListItemIcon>
                            <ListItemText
                                primary={value.name}
                            />
                        </ListItem>
                    )
                })}


            </List>
        </div>
    );
}
