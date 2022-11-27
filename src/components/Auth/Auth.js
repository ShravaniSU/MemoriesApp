import React, {useState} from "react";
import { Avatar, Button, Grid, Typography, Container, Paper } from "@mui/material";
import {GoogleLogin} from "react-google-login";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import Icon from "./icon";
import styles from "./mystyle.module.css";
import LockIcon from '@mui/icons-material/Lock';
import Input from "./Input";
import { signin, signup } from "../../actions/auth"
import {AUTH} from "../../constants/actionTypes";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        }
    }
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate('/');
        } catch (error) {
        console.log(error);
        }
    };
    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Please Try Again Later");
    }

    return(
        <Container component="main" maxWidth="xs">
            <Paper className={styles.paper} elevation={6}>
                <Avatar className={styles.avatar}>
                    <LockIcon />
                </Avatar>
                <Typography component="h1" variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup ? 
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half  />
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half  />
                            </> : null
                        }
                        <Input name="email" label="Email Id" handleChange={handleChange} type="email" />
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid>
                    
                    <Button type="submit" fullWidth variant="contained" color="primary" className={styles.submit}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin 
                    clientId="27378368171-egavk1fns1egfvp36d2okhd95a0b2kn0.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button className={styles.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained" >Google Sign In</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy="single_host_origin"
                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {  
                                    isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" 
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
}

export default Auth;