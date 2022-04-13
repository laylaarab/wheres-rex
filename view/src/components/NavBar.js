import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link'
import Dino from "../assets/dino.png";
import { UserContext } from "../context/UserContext";
import Login from './Login';
import Logout from './Logout';


// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const RexAppBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, _] = useContext(UserContext);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" style={{ backgroundColor: '#ebebeb' }}>
            <Container maxWidth="100vh">
                <Toolbar sx={{
                    maxHeight: '3vh',
                    overflow: 'visible'
                }} disableGutters>
                    <Link href="/landing-page">
                        <Box
                            component="img"
                            sx={{
                                height: 60,
                                marginTop: 2,
                                overflow: 'visible',
                            }}
                            alt="Logo"
                            src={Dino}

                        />
                    </Link>
                    <Link href="/landing-page">
                        <Typography
                            variant="h4"
                            noWrap
                            fontWeight={1000}
                            color='#CE204D'
                            component="div"
                            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                        >
                            Where's Rex?
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>

                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar src={user.imageUrl} />
                        </IconButton>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="logout" onClick={handleCloseUserMenu}>
                                {user ? <Logout /> : <Login />}
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default RexAppBar;