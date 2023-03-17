import React, { useEffect, useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import useStyles from "./styles"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from './Input';
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script"
import Icon from "./Icon";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {signin,signup} from "../../actions/auth";


const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" }

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false)
    const [isSignUp, setisSignUp] = useState(false);


    const [formData, setFormData] = useState(initialState);


    const googleClientId = '855352448872-ihk9dnovq1irojc02j1435eeihjpe3gi.apps.googleusercontent.com'


    useEffect(() => {
        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: googleClientId })
        })
    }, [])


    const state = null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        if(isSignUp){
            dispatch(signup(formData,navigate))
        }
        else{
            dispatch(signin(formData,navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleShowPassword = () => {
        setShowPassword((prevShow) => !prevShow)
    }


    const switchMode = () => {
        setisSignUp((prevVal) => !prevVal)
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: 'AUTH', data: { result, token } });
            navigate("/")

        }
        catch (err) {
            console.log(err);
        }
    }



    const googleFailure = (error) => {
        console.log(error);
        console.log("Google sign in failed")
    }



    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>
                    {
                        isSignUp ? 'SignUp' : 'SignIn'
                    }
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="FirstName" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="LastName" handleChange={handleChange} half />

                                </>
                            )
                        }
                        <Input name="email" label="Email" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>

                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        {
                            isSignUp ? 'SignUp' : 'SignIn'
                        }
                    </Button>

                    <GoogleLogin
                        clientId={googleClientId}
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">Google SignIn</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justifyContent='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignUp ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth