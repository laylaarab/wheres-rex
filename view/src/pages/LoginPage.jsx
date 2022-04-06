import { useState, useContext } from "react";

import Container from '@mui/material/Container';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Item from "../components/Item";
import Grid from '@mui/material/Grid';
import Dino from "../assets/dino.png";
import background from "../assets/campus.jpg"
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import Login from "../components/Login";

export default function LoginPage() {


    const [user, _] = useContext(UserContext);
    if (user) {
        return <Navigate to="/landing-page" />
    }
    return (
        <Grid container spacing={2} id="login-page-box" style={{ backgroundImage: `url(${background})` }}>
            <Grid item xs={4} md={2}>
                <img src={Dino} alt="Rex" id="rex-logo" />
            </Grid>
            <Grid item xs={8} s={10} id="login-title">
                <h1>
                    Where's Rex?
                </h1>
            </Grid>
            <Grid item xs={12} id="login-title">
                <div id="login-explore">
                    <h2>EXPLORE THE UNIVERSITY OF CALGARY</h2>    
                    <h3>Can you help find Rex all around our campus?</h3>
                </div>
            </Grid>
            <Grid item xs={12} id="login-google-button">
                <Login />
            </Grid>
        </Grid>
    );
}



