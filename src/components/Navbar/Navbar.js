import React, {useState, useEffect} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Avatar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import styles from './mystyle.module.css';
import * as actionType from "../../constants/actionTypes";

const Navbar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT});
        navigate("/");
        setUser(null);
    }
    useEffect(() => {
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    return (
        <AppBar className={styles.appBar} position="static" color="inherit">
            <Link to="/" className={styles.brandContainer}>
                <img component={Link} to="/" src={memoriesText} alt="icon" height="45px" />
                <img src={memoriesLogo} alt="Memories" height="40px" />
            </Link>
            <Toolbar className={styles.toolbar} >
                {user?.result ? (
                    <div className={styles.profile}>
                        <Avatar className={styles.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={styles.userName} variant="h6">{user?.result.name}</Typography>
                        <Button variant="contained" className={styles.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (<Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>)}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;