import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { GoogleLogout } from 'react-google-login';
import { UserContext } from "../context/UserContext";

// Ref https://github.com/Sivanesh-S/react-google-authentication/
const clientId =
    '865811088200-9a0foi5rfsf6t4drot8fct8davtn01rm.apps.googleusercontent.com';

function Logout() {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();
    const onSuccess = () => {
        setUser(null)
        navigate(`/`)
    };

    return (
        <GoogleLogout
            clientId={clientId}
            buttonText="Logout"
            onLogoutSuccess={onSuccess}
        ></GoogleLogout>

    );
}

export default Logout;
