import React, {useEffect} from 'react';
import {useSelector} from "react-redux"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/Header"
import Main from './pages/Main/Main';
import Dashboard from './pages/Dachboard/DashBoard';
import { IRootState, useAppDispatch } from './store';
import { getProfile } from './store/auth/authCreators';

function App() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(getProfile()); 
    }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard/> : <Navigate to="/"/>} />
      </Routes>
    </Router>
  );
}

export default App;
