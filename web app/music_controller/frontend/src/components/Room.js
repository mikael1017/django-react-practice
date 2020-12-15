//  handling the room
import React, { Component } from 'react';
import { Grid, Button, Typography } from '@material-ui/core'
import CreateRoomPage from "./CreateRoomPage"

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
            showSettings: false,
            play: false,
            pause: true,
        };
        this.roomCode = this.props.match.params.roomCode;
        this.getRoomDetails();
        this.leaveButtonPressed = this.leaveButtonPressed.bind(this);
        this.updateShowSettings = this.updateShowSettings.bind(this);
        this.renderSettings = this.renderSettings.bind(this);
        this.renderSettingsButton = this.renderSettingsButton.bind(this);
        this.playButtonPressed = this.playButtonPressed.bind(this);
        this.url = "/Users/jaewoocho/Documents/GitHub/django-react-practice/web app/music_controller/music/music1.wav";
        this.audio = new Audio(this.url);
    }

    leaveButtonPressed() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch('/api/leave-room', requestOptions).then((response) => {
                this.props.history.push('/');
                this.props.leaveRoomCallback();
            });
    }

    playButtonPressed() {
        this.setState({
            play: true,
            pause: false
        })
        this.audio.play();
    }

    updateShowSettings(value) {
        this.setState({
            showSettings: value,
        });
    }

    renderSettings() {
        return (
            <Grid container spacing = {1}>
                <Grid item xs = {12} align = "center">
                <CreateRoomPage
                    update = {true}
                    votesToSkip = {this.state.votesToSkip}
                    guestCanPause = {this.state.guestCanPause}
                    roomCode = {this.state.roomCode}
                    updateCallback = {() => {}}
                >
                </CreateRoomPage>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Button
                        variant = "contained"
                        color = "secondary"
                        onClick = {() => this.updateShowSettings(false)}
                    >
                        Close
                    </Button>
                </Grid>
            </Grid>
        );
    }

    renderSettingsButton() {
        return (
            <Grid item xs = {12} align = "center">
                <Button
                    variant = "contained"
                    color = "primary"
                    onClick = {() => this.updateShowSettings(true)}
                >
                    Settings
                </Button>
            </Grid>
        );
    }
    getRoomDetails() {
        fetch('/api/get-room' + '?code=' + this.roomCode)
        .then((response) => {
            if (!response.ok) {
                this.props.leaveRoomCallback();
                this.props.history.push("/");
            }
            return response.json();
        })
        .then((data) => {
            this.setState({
                votesToSkip: data.votes_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host,
            });
        });
    }

    render() {
        if (this.state.showSettings) {
            return this.renderSettings();
        }
        return (
            <Grid container spacing = {1}>
                <Grid item xs = {12} align = "center">
                    <Button
                        variant = "contained"
                        color = "primary"
                        onClick = {}
                    >
                        Play a Song
                    </Button>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h4" component = "h4">
                        Code: {this.roomCode}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h6" component = "h6">
                        Votes: {this.state.votesToSkip}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h6" component = "h6">
                        Guest Can Pause: {this.state.guestCanPause.toString()}
                    </Typography>
                </Grid>
                <Grid item xs = {12} align = "center">
                    <Typography variant = "h6" component = "h6">
                        Host: {this.state.isHost.toString()}
                    </Typography>
                </Grid>
                {/* if user is the host call button method */}
                {this.state.isHost ? this.renderSettingsButton() : null}
                <Grid item xs = {12} align = "center">
                    <Button
                        variant = "contained"
                        color = "secondary"
                        onClick = {this.leaveButtonPressed}
                    >
                        Leave Room
                    </Button>
                </Grid>

            </Grid>
        )

    }
}