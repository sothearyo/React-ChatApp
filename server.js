const express = require("express");
const app = express();

const server = app.listen(8000, () =>
    console.log("The server is all fired up on port 8000")
);

// To initialize the socket, we need to pass invoke a new instance of socket.io
// and pass it our express server
const io = require("socket.io")(server);

io.on("connection", socket => {
    // Each client that connects get thier own socket id
    // If this is logged in our node terminal, that means that a new client has successfully completed the handshake
    console.log("Nice to meet you.(shake hand)")
    console.log(socket.id);

    // -- Add all additional event listeners here --

    // console log what whas sent from the client
    socket.on("new-client-logon", (data) => {
        console.log(data);
        console.log(data.username);
        io.emit("message-from-server", {"msgData": data});
    })

    socket.on("new-client-msg", (data) => {
        console.log(data);
        io.emit("message-from-server", {"msgData": data});
    })

})