import './App.css';

import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useEffect, useContext } from "react";
import { QueryClient, QueryClientProvider } from 'react-query'
import { UserContext } from './context/UserContext';
// import socketIOClient from "socket.io-client";

import CssBaseline from "@mui/material/CssBaseline";

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SinglePlayerGamePage from './pages/SinglePlayerGamePage';
import SinglePlayerGameResultsPage from './pages/SinglePlayerGameResultsPage';

const queryClient = new QueryClient()

const ENDPOINT = "http://127.0.0.1:4001";

export default function App() {
  const [user, _] = useContext(UserContext);


  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.title = "Where's Rex";
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);


  return (
    <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Routes>
            <Route path="/landing-page" element={<LandingPage />} />
            <Route path="/login-page" element={<LoginPage />} />
            <Route path="/single-player" element={<SinglePlayerGamePage />} />
            <Route path="/single-player/results/:gameId" element={<SinglePlayerGameResultsPage />} />
            <Route path="/" element={
              user == null ? <Navigate to="/login-page" /> : <Navigate to="landing-page" />
            } />
          </Routes>
    </QueryClientProvider>
  );  
}

