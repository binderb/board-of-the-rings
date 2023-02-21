const registerGameHandlers = (io, socket) => {
  const boardMax = 3;

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
        boardPosition: 0,
        animationState: 'walking'
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
        boardPosition: 0,
        animationState: 'walking'
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

  socket.on("pick_question", (data) => {
    if (data.reset) io.sockets.in(data.room).emit('receive_reset_questions');
    io.sockets.in(data.room).emit('receive_pick_question', data.questionIndex);
  });

  socket.on("picked_correct", ({players, room}) => {
    const correct_player = players.find(e => e.id === socket.id);
    correct_player.boardPosition += 1;
    if (correct_player.boardPosition == boardMax) {

      io.sockets.in(room).emit('receive_win_condition', players);
    } else {
      io.sockets.in(room).emit('receive_picked_correct', players);
    }
    
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