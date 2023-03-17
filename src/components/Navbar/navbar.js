import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Avatar, Button } from '@material-ui/core'
import useStyles from "./styles";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import decode from "jwt-decode";

const Navbar = () => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // const user = null;

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user);

    useEffect(() => {

        const token = user?.token;


        if(token) {
            const decodedToken = decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                  logout();
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    }, [location])

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
        setUser(null);
    }

    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer}>
                <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>
                    POST
                </Typography>
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
                            {user.result.name.charAt(0)}
                        </Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button className={classes.logout} variant="contained" color="secondary" onClick={logout}>LogOut</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">SignIn</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar