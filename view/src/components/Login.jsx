import React, { useContext } from 'react';
// Ref https://github.com/Sivanesh-S/react-google-authentication/

import { GoogleLogin } from 'react-google-login';
// refresh token
// import { refreshTokenSetup } from '../utils/refreshToken';
import { UserContext } from "../context/UserContext";

const clientId =
    '865811088200-9a0foi5rfsf6t4drot8fct8davtn01rm.apps.googleusercontent.com';

function Login() {
    const [_, setUser] = useContext(UserContext);

    const onSuccess = (res) => {
        console.log(res.profileObj)
        setUser(res.profileObj)
        // refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        setUser(null)
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            style={{ marginTop: '100px' }}
            isSignedIn={true}
        />
    );
}

export default Login;