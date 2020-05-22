import React, {useEffect, useState} from 'react';
import { Link, navigate } from '@reach/router';
import io from 'socket.io-client';
import axios from 'axios';

export default (props) => {
    const {socket, user, setUser } = props;
    const clickStartButton = (user) => {
        socket.emit("new-client-logon", {"sender": "server", "time": new Date(), "message": `${user} has joined the chat`});
        navigate("/chatroom");
    }

    return (
        <div className="row justify-content-center m-4">
            <div className="col-6 border rounded p-5">
                <h4 className="pb-3">Get Started right now!</h4>
                <p className="text-left">I want to start chatting with the name:</p>
                <div className="row">
                    <div className="col-10 pt-3">
                        <input onChange={ (e) => setUser(e.target.value) }type="text" className="form-control"/>
                    </div>
                    <div className="col-auto pt-3">
                        <button onClick={ (e) => clickStartButton(user) } className="btn btn-outline-success">Start Chatting</button>
                    </div>
                </div>
            </div>
        </div>
    )
}