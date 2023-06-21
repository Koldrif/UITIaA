import React from 'react';
import {useSelector} from "react-redux"
import {IRootState, useAppDispatch} from "../../store"
import {logoutUser} from "../../store/auth/authCreators"
import Login from './components/Login/Login';
import { getProfile } from '../../api/auth';

const Main = () => {
    const dispatch = useAppDispatch();

    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.profile
    );

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const renderProfile = () =>(
        <div>
            <div>Вы успешно авторизовались, {profile}</div>
            <button onClick = {() => dispatch(logoutUser())}>Logout</button>
            <button onClick = {() => dispatch(getProfile)}>update profile</button>
        </div>
    );

    return (
        <div>
            <h1>Main</h1> 
            {isLoggedIn ? renderProfile() : <Login />}
        </div>
    );
};

export default Main;