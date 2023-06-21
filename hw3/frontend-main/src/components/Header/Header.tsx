import React from "react"
import {useSelector} from "react-redux"
import { IRootState } from "../../store"
import { Link } from "react-router-dom"

const Header = () =>{
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    return(
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
                
    );
};

export default Header;