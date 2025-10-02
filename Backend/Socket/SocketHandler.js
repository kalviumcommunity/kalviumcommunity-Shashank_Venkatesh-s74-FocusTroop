// Backend/socket/socketHandler.js
const rooms = new Map(); // Store active rooms in memory

const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a room
    socket.on('join-room', ({ roomId, user }) => {
      socket.join(roomId);
      
      // Get or create room
      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          id: roomId,
          members: [],
          timer: {
            mode: 'focus',
            secondsLeft: 25 * 60,
            isRunning: false,
            durations: {
              focus: 25 * 60,
              short: 5 * 60,
              long: 15 * 60
            }
          },
          tasks: [],
          chat: []
        });
      }

      const room = rooms.get(roomId);
      
      // Add user to room if not already present
      const existingUser = room.members.find(m => m.id === user.id);
      if (!existingUser) {
        room.members.push(user);
      }

      // Send current room state to the joining user
      socket.emit('room-state', room);

      // Notify other users in the room
      socket.to(roomId).emit('user-joined', {
        user,
        members: room.members
      });

      console.log(`User ${user.name} joined room ${roomId}`);
    });

    // Timer control events
    socket.on('timer-start', ({ roomId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.isRunning = true;
        io.to(roomId).emit('timer-update', room.timer);
      }
    });

    socket.on('timer-pause', ({ roomId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.isRunning = false;
        io.to(roomId).emit('timer-update', room.timer);
      }
    });

    socket.on('timer-reset', ({ roomId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.secondsLeft = room.timer.durations[room.timer.mode];
        room.timer.isRunning = false;
        io.to(roomId).emit('timer-update', room.timer);
      }
    });

    socket.on('timer-mode-change', ({ roomId, mode }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.mode = mode;
        room.timer.secondsLeft = room.timer.durations[mode];
        room.timer.isRunning = false;
        io.to(roomId).emit('timer-update', room.timer);
      }
    });

    socket.on('timer-tick', ({ roomId, secondsLeft }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.secondsLeft = secondsLeft;
        socket.to(roomId).emit('timer-update', room.timer);
        
        // Check if timer completed
        if (secondsLeft === 0) {
          room.timer.isRunning = false;
          io.to(roomId).emit('timer-complete');
        }
      }
    });

    socket.on('timer-settings-update', ({ roomId, durations }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.timer.durations = durations;
        io.to(roomId).emit('timer-settings-updated', durations);
      }
    });

    // Task events
    socket.on('task-add', ({ roomId, task }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.tasks.push(task);
        io.to(roomId).emit('task-added', task);
      }
    });

    socket.on('task-toggle', ({ roomId, taskId, userName }) => {
      const room = rooms.get(roomId);
      if (room) {
        const task = room.tasks.find(t => t.id === taskId);
        if (task) {
          const index = task.completedBy.indexOf(userName);
          if (index > -1) {
            task.completedBy.splice(index, 1);
          } else {
            task.completedBy.push(userName);
          }
          io.to(roomId).emit('task-updated', task);
        }
      }
    });

    socket.on('task-remove', ({ roomId, taskId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.tasks = room.tasks.filter(t => t.id !== taskId);
        io.to(roomId).emit('task-removed', taskId);
      }
    });

    // Chat events
    socket.on('chat-message', ({ roomId, message }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.chat.push(message);
        io.to(roomId).emit('chat-message-received', message);
      }
    });

    // Leave room
    socket.on('leave-room', ({ roomId, userId }) => {
      const room = rooms.get(roomId);
      if (room) {
        room.members = room.members.filter(m => m.id !== userId);
        socket.leave(roomId);
        
        // Notify other users
        io.to(roomId).emit('user-left', {
          userId,
          members: room.members
        });

        // Clean up empty rooms
        if (room.members.length === 0) {
          rooms.delete(roomId);
          console.log(`Room ${roomId} deleted (empty)`);
        }
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};

module.exports = socketHandler;