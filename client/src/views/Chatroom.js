import React, { useState} from 'react';
import { Link, navigate } from '@reach/router';
import io from 'socket.io-client';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';

export default (props) => {
    const {socket, messages, user} = props;
    const [newMessage, setNewMessage] = useState("");

    const submitNewMessage = (newMessage) => {
        socket.emit("new-client-msg", {"sender": user, "time": new Date(), "message": newMessage});
        setNewMessage("");
    }

    return (
        <div className="row justify-content-center m-4">
            <div className="col-6 border rounded" style={{height:'400px'}}>
                <div className="row-col p-2" style={{height: '340px'}}>
                    <ScrollToBottom className="h-100">
                        {messages.map((msgObject, idx) => 
                            msgObject.sender === "server" ?
                                <div className="py-2" style={{textAlign: 'right', fontStyle: 'italic', color: 'gray'}}>
                                    {msgObject.message}
                                </div> 
                                :
                                msgObject.sender === user ?
                                    <div className="d-flex flex-row-reverse py-1">
                                        <div className="col-auto rounded-top rounded-left p-2" style={{background: '#ADD8E6'}}>
                                            {msgObject.message}
                                        </div>
                                    </div> 
                                    :
                                    <div className="py-1">
                                        <div style={{textAlign: 'left', fontSize: 'small', color: 'gray'}}>{msgObject.sender}</div>
                                        <div className="d-flex flex-row">
                                            <div className="col-auto rounded-top rounded-right p-2" style={{border:'solid 1px #ADD8E6'}}>
                                                {msgObject.message}
                                            </div>
                                        </div> 
                                    </div>                      
                        )}
                    </ScrollToBottom>
                </div>
                <div className="row" style={{height: '60px'}}>
                    <div className="col pt-2">
                        <input value={newMessage} onChange={ (e) => setNewMessage(e.target.value) } type="text" className="form-control"/>
                    </div>
                    <div className="col-lg-2 col-md-3 col-sm-4 pt-2">
                        <button onClick={ (e) => submitNewMessage(newMessage) } className="btn btn-outline-primary">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}