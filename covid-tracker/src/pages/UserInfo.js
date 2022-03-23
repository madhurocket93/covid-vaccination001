import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function UserInfo(props) {

    //Pop up window
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let splitBirthDate = props.birthdate.toString();

    if (splitBirthDate == "") {
        splitBirthDate = "N/A";
    } else {
        splitBirthDate = props.birthdate.toString();
        splitBirthDate = splitBirthDate.replaceAll(" ", "/")
    }

    console.log(props.birthdate);
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    let navigate = useNavigate();
    const logOut = async () => {
        await fetch('http://localhost:4000/v1/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        props.setName('');
        props.setEmail('');
        props.set2Name('');

        navigate('/');
    }

    function deleteBooking() {
        const requestOptions = {
            method: "POST",
            body: props.email + " " + props.vaccineId,
        };
        fetch("http://localhost:4000/v1/deleteBooking", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);

            });
        window.location.reload();
    }

    let showOrNot;
    let showOrNot2;
    let logout;
    let vaccine;
    let nothing = ", please sign in";
    let appointment;
    if (!props.name) {
        showOrNot = <Button color="inherit" component={Link}
            to="/login">Login</Button>
        showOrNot2 = <Button color="inherit" component={Link}
            to="/signup">Sign up</Button>
        vaccine = <>{props.vaccine}</>
    } else {

        logout = <Button color="inherit" component={Link} to="/login" onClick={logOut}>log out</Button>
        vaccine = <>Nothing bro</>
    }

    if (props.vaccineId) {
        appointment = <><span className="app-text">Your current appointment: <>
            <div className="space40">Vaccine Name: {props.vaccine}</div>
            <div className="space40">Dose Num: {props.vaccineNum}</div>
            <div className="space40">State: {props.state}</div>
            <div className="space40">Zip Code: {props.zipCode}</div>
            <div className="space40"></div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Cancel Appointment
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to cancel your appointment?"}
                </DialogTitle>

                <DialogActions>
                    <Button onClick={deleteBooking}>
                        Yes
                    </Button>
                    <Button onClick={handleClose}>No</Button>

                </DialogActions>
            </Dialog>

        </></span></>
    } else {
        appointment = <p>You do not have any appointment!</p>
    }

    return (
        <>
            <div>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar>
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                <a component={Link} href="/user" className="home">Co<span className="colorchange" >Vi</span>-Book</a>
                            </Typography>
                            {showOrNot}
                            {showOrNot2}
                            <Button color="inherit" component={Link}
                                to="/list">Vaccine List</Button>
                            {logout}
                        </Toolbar>
                    </AppBar>
                </Box>
                <div className="space"></div>
                <h1>
                    Welcome {props.name ? props.name : nothing}

                </h1>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>

                        <Grid item xs={4} md={4}>
                            <Item>
                                <p>Below are your basic information:</p>
                                <p>First Name: {props.name}</p>
                                <p>Last Name: {props.name2}</p>
                                <p>Email address: {props.email}</p>
                                <p>Birth date: {splitBirthDate}</p>

                            </Item>

                        </Grid>
                        <Grid item xs={3} md={3}>
                            <Item>
                                {appointment}

                            </Item>

                        </Grid>
                        <Grid item xs={4} md={4}>
                            <Item>
                                <h3>What would you like to do?</h3>
                                <div className="space40"></div>
                                <Button variant="contained" component={Link}
                                    to="/list">Click me to schedule an appointment! </Button>
                                <div className="space40" ></div>
                                <Button variant="contained" component={Link}
                                    to="/update">Click me to update information! (WIP)</Button>
                                <div className="space40"></div>
                                <Button variant="contained" component={Link}
                                    to="/records">Click me to get your certificate! (WIP)</Button>
                                <div className="space40"></div>
                                <a target="_blank" href="https://www.google.com/search?q=covid+cases&oq=covid+cases&aqs=chrome.0.69i59j0i402l2j0i433i512l2j69i60l3.1015j0j7&sourceid=chrome&ie=UTF-8"><Button variant="contained">Click me to check covid cases/news! (WIP)</Button></a>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    );

}

export default UserInfo;