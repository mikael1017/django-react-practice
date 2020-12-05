//  handling the room
import React, { Component } from 'react';
export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false,
        };
        this.roomCode = this.props.match.params.roomCode;
    }

    render() {
        return <div>
            <h3>{this.roomCode}</h3>
            <p>Votes: {this.stae.votesToSkip}</p>
            <p>Guest Can Pause: {this.stae.guestCanPause}</p>
            <p>Host: {this.stae.isHost}</p>
        </div>
    }
}