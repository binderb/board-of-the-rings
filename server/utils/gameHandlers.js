const registerGameHandlers = (io, socket) => {

  socket.on("join_room", async (data) => {
    await socket.join(data.roomId);
    socket.data.playerName = data.playerName;
    socket.data.isHost = data.isHost;
    const roommateSockets = await io.in(data.roomId).fetchSockets();
    const players = [];
    for (roommate of roommateSockets) {
      players.push({
        id: roommate.id,
        name: roommate.data.playerName,
        isHost: roommate.data.isHost,
        boardPosition: 0
      });
    }
    console.log(`User ${socket.data.playerName} (${socket.id}) joined room ${data.roomId}.`);
    console.log(players.length);
    io.sockets.in(data.roomId).emit('receive_current_players',players);
  });

  socket.on("leave_room", async (data) => {
    await socket.leave(data);
    const roommateSockets = await io.in(data.roomId).fetchSockets();
    const players = [];
    for (roommate of roommateSockets) {
      players.push({
        id: roommate.id,
        name: roommate.data.playerName,
        isHost: roommate.data.isHost,
        boardPosition: 0
      });
    }
    console.log(`User ${socket.data.playerName} (${socket.id}) left room ${data}.`);
    console.log(players.length);
    io.sockets.in(data).emit('receive_current_players',players);
  });

  socket.on("host_left", (room) => {
    socket.to(room).emit('receive_host_left');
  });

  socket.on("start_game", (room) => {
    io.sockets.in(room).emit('receive_start_game');
  });

  socket.on("advance_turn", (room) => {
    io.sockets.in(room).emit('receive_advance_turn');
  });
  
  socket.on("send_message", (data) => {
    socket.broadcast.emit("receive_message", data);
  })

  socket.on("disconnect", (reason) => {
    console.log(`User ${socket.id} disconnected - ${reason}`);
  });

}

module.exports = registerGameHandlers;