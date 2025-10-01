import React, { useState, useEffect } from 'react';

// GroupSettings component for timer settings
const GroupSettings = ({ onApply, onClose }) => {
  const [focusTime, setFocusTime] = useState("25");
  const [shortBreak, setShortBreak] = useState("5");
  const [longBreak, setLongBreak] = useState("15");

  const handleApply = () => {
    if (onApply) {
      onApply({
        focus: focusTime ? parseInt(focusTime, 10) * 60 : null,
        short: shortBreak ? parseInt(shortBreak, 10) * 60 : null,
        long: longBreak ? parseInt(longBreak, 10) * 60 : null,
      });
    }
    if (onClose) onClose();
  };

  const presets = [
    { name: "Classic", focus: 25, short: 5, long: 15 },
    { name: "Extended", focus: 50, short: 10, long: 30 },
    { name: "Quick", focus: 15, short: 3, long: 10 },
    { name: "Deep Work", focus: 90, short: 15, long: 45 },
  ];

  const applyPreset = (preset) => {
    setFocusTime(preset.focus);
    setShortBreak(preset.short);
    setLongBreak(preset.long);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden">
        
        {/* Header */}
        <div className="bg-purple-600 p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              Group Timer Settings ⚙️
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-all duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm mt-2 text-purple-200 font-medium">
            👑 Only the room creator can modify these settings
          </p>
        </div>

        <div className="p-6">
          {/* Quick Presets */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Quick Presets
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 text-left"
                >
                  <div className="font-medium text-gray-800 text-sm">
                    {preset.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {preset.focus}m / {preset.short}m / {preset.long}m
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Settings */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-gray-800 mb-3">
              Custom Times
            </h3>

            {/* Focus Time */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 text-sm flex items-center gap-1">
                📖 Focus
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={focusTime}
                  onChange={(e) => setFocusTime(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                  placeholder="25"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>

            {/* Short Break */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 text-sm flex items-center gap-1">
                ☕ Short Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                  placeholder="5"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>

            {/* Long Break */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 text-sm flex items-center gap-1">
                🌴 Long Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={longBreak}
                  onChange={(e) => setLongBreak(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                  placeholder="15"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-6">
            <p className="text-xs text-blue-700">
              💡 Timer changes will apply to all members in the room
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleApply}
              className="w-full py-2 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              APPLY CHANGES
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


// GroupSelection component
const GroupSelection = ({ onNavigateToSession, onBack }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [roomId, setRoomId] = useState('');
  const [maxMembers, setMaxMembers] = useState(4);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleJoinRoom = async () => {
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate room existence check (in real app, this would be an API call)
    const existingRooms = JSON.parse(window.localStorage?.getItem('focustroop_rooms') || '{}');
    
    if (!existingRooms[roomId]) {
      setError('Room ID does not exist. Please check the ID and try again.');
      setLoading(false);
      return;
    }

    // Check if room is full
    const room = existingRooms[roomId];
    if (room.members.length >= room.maxMembers) {
      setError('Room is full. Cannot join this session.');
      setLoading(false);
      return;
    }

    // Add current user to room
    const currentUser = {
      id: Date.now(),
      name: `User${Math.floor(Math.random() * 1000)}`, // In real app, this would be from auth
      joinedAt: new Date().toISOString()
    };

    room.members.push(currentUser);
    existingRooms[roomId] = room;
    if (window.localStorage) {
      window.localStorage.setItem('focustroop_rooms', JSON.stringify(existingRooms));
    }

    // Navigate to group session
    onNavigateToSession(room, false, currentUser);
  };

  const handleCreateRoom = () => {
    if (maxMembers < 2 || maxMembers > 20) {
      setError('Room size must be between 2 and 20 members');
      return;
    }

    setLoading(true);
    setError('');

    // Generate unique room ID
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const currentUser = {
      id: Date.now(),
      name: `User${Math.floor(Math.random() * 1000)}`, // In real app, this would be from auth
      joinedAt: new Date().toISOString()
    };

    const newRoom = {
      id: newRoomId,
      creatorId: currentUser.id,
      maxMembers: maxMembers,
      members: [currentUser],
      createdAt: new Date().toISOString(),
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
    };

    // Save to memory (in real app, this would be saved to server)
    const existingRooms = JSON.parse(window.localStorage?.getItem('focustroop_rooms') || '{}');
    existingRooms[newRoomId] = newRoom;
    if (window.localStorage) {
      window.localStorage.setItem('focustroop_rooms', JSON.stringify(existingRooms));
    }

    // Navigate to group session
    onNavigateToSession(newRoom, true, currentUser);
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {!selectedOption && (
        <div className="space-y-4">
          <p className="text-gray-600 text-center mb-6">
            Choose how you want to join a group session:
          </p>
          
          <button
            onClick={() => setSelectedOption('join')}
            className="w-full p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔗</span>
              <div>
                <h3 className="font-semibold text-purple-800">Join Existing Room</h3>
                <p className="text-sm text-gray-600">Enter a room ID to join an existing session</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setSelectedOption('create')}
            className="w-full p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">➕</span>
              <div>
                <h3 className="font-semibold text-purple-800">Create New Room</h3>
                <p className="text-sm text-gray-600">Start a new session and invite others</p>
              </div>
            </div>
          </button>
        </div>
      )}

      {selectedOption === 'join' && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedOption('')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            ← Back to options
          </button>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room ID
            </label>
            <input
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value.toUpperCase())}
              placeholder="Enter room ID (e.g., ABC123)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleJoinRoom}
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Joining...' : 'JOIN ROOM'}
          </button>
        </div>
      )}

      {selectedOption === 'create' && (
        <div className="space-y-4">
          <button
            onClick={() => setSelectedOption('')}
            className="text-purple-600 hover:text-purple-800 text-sm"
          >
            ← Back to options
          </button>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Members
            </label>
            <select
              value={maxMembers}
              onChange={(e) => setMaxMembers(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {[...Array(19)].map((_, i) => (
                <option key={i + 2} value={i + 2}>
                  {i + 2} members
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleCreateRoom}
            disabled={loading}
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'CREATE ROOM'}
          </button>
        </div>
      )}
    </div>
  );
};

// GroupSession component
const GroupSession = ({ roomData, isCreator, currentUser, onBack }) => {
  const [room, setRoom] = useState(roomData);
  const [showSettings, setShowSettings] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [priority, setPriority] = useState('High');
  const [chatMessage, setChatMessage] = useState('');
  const [notification, setNotification] = useState('');

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  // Timer management
  const [secondsLeft, setSecondsLeft] = useState(room.timer.secondsLeft);
  const [isRunning, setIsRunning] = useState(room.timer.isRunning);
  const [mode, setMode] = useState(room.timer.mode);
  const [durations, setDurations] = useState(room.timer.durations);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Timer effect - only for creator
  useEffect(() => {
    if (!isCreator || !isRunning) return;
    
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          
          // Play notification sound when timer ends
          try {
            const audio = new Audio('/notification.mp3');
            audio.play().catch(() => {
              // Fallback if audio fails
              console.log('Timer completed!');
            });
          } catch (e) {
            console.log('Timer completed!');
          }
          
          // Update room data
          updateRoomData({
            ...room,
            timer: {
              ...room.timer,
              secondsLeft: 0,
              isRunning: false
            }
          });
          
          return 0;
        }
        
        // Update room data with new time
        const newTime = prev - 1;
        updateRoomData({
          ...room,
          timer: {
            ...room.timer,
            secondsLeft: newTime
          }
        });
        
        return newTime;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isRunning, isCreator, room]);

  // Reset timer when mode or durations change
  useEffect(() => {
    setSecondsLeft(durations[mode]);
    setIsRunning(false);
  }, [mode, durations]);

  const updateRoomData = (newRoomData) => {
    setRoom(newRoomData);
    
    // Update localStorage (in real app, this would sync with server)
    if (window.localStorage) {
      const existingRooms = JSON.parse(window.localStorage.getItem('focustroop_rooms') || '{}');
      existingRooms[room.id] = newRoomData;
      window.localStorage.setItem('focustroop_rooms', JSON.stringify(existingRooms));
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (!isCreator) {
      setNotification('Only the room creator can control the timer');
      return;
    }
    
    const newRunningState = !isRunning;
    setIsRunning(newRunningState);
    
    updateRoomData({
      ...room,
      timer: {
        ...room.timer,
        isRunning: newRunningState,
        secondsLeft: secondsLeft
      }
    });
  };

  const handleReset = () => {
    if (!isCreator) {
      setNotification('Only the room creator can control the timer');
      return;
    }
    
    const newTime = durations[mode];
    setSecondsLeft(newTime);
    setIsRunning(false);
    
    updateRoomData({
      ...room,
      timer: {
        ...room.timer,
        secondsLeft: newTime,
        isRunning: false
      }
    });
  };

  const handleModeChange = (newMode) => {
    if (!isCreator) {
      setNotification('Only the room creator can change timer mode');
      return;
    }
    
    setMode(newMode);
    const newTime = durations[newMode];
    setSecondsLeft(newTime);
    setIsRunning(false);
    
    updateRoomData({
      ...room,
      timer: {
        ...room.timer,
        mode: newMode,
        secondsLeft: newTime,
        isRunning: false,
        durations: durations
      }
    });
  };

  const handleApplySettings = (newDurations) => {
    if (!isCreator) {
      setNotification('Only the room creator can change timer settings');
      return;
    }
    
    const updatedDurations = {
      focus: newDurations.focus ?? durations.focus,
      short: newDurations.short ?? durations.short,
      long: newDurations.long ?? durations.long,
    };
    
    setDurations(updatedDurations);
    
    updateRoomData({
      ...room,
      timer: {
        ...room.timer,
        durations: updatedDurations
      }
    });
  };

  const addTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    
    const newTask = { 
      id: Date.now(), 
      text: trimmed, 
      priority,
      createdBy: currentUser.name,
      completedBy: []
    };
    
    const updatedTasks = [...room.tasks, newTask].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    
    updateRoomData({
      ...room,
      tasks: updatedTasks
    });
    
    setTaskInput('');
    setPriority('High');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = room.tasks.map(task => {
      if (task.id === taskId) {
        const isCompleted = task.completedBy.includes(currentUser.name);
        const newCompletedBy = isCompleted 
          ? task.completedBy.filter(name => name !== currentUser.name)
          : [...task.completedBy, currentUser.name];
        
        return { ...task, completedBy: newCompletedBy };
      }
      return task;
    });
    
    updateRoomData({
      ...room,
      tasks: updatedTasks
    });
    
    const task = room.tasks.find(t => t.id === taskId);
    if (!task.completedBy.includes(currentUser.name)) {
      setNotification(`You completed: ${task.text}`);
    }
  };

  const removeTask = (taskId) => {
    const updatedTasks = room.tasks.filter(task => task.id !== taskId);
    updateRoomData({
      ...room,
      tasks: updatedTasks
    });
  };

  const sendMessage = () => {
    const trimmed = chatMessage.trim();
    if (!trimmed) return;
    
    const newMessage = {
      id: Date.now(),
      text: trimmed,
      sender: currentUser.name,
      timestamp: new Date().toISOString()
    };
    
    updateRoomData({
      ...room,
      chat: [...room.chat, newMessage]
    });
    
    setChatMessage('');
  };

  const handleLeaveRoom = () => {
    if (isRunning && isCreator) {
      const confirmQuit = window.confirm(
        'A session is currently running. Are you sure you want to quit?'
      );
      if (!confirmQuit) return;
    }
    
    // Remove user from room
    const updatedMembers = room.members.filter(member => member.id !== currentUser.id);
    updateRoomData({
      ...room,
      members: updatedMembers
    });
    
    onBack();
  };

  const total = durations[mode];
  const progress = Math.round(((total - secondsLeft) / total) * 100);

  return (
    <div className="space-y-6">
      {/* Room Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-purple-800">Room: {room.id}</h2>
            <p className="text-sm text-gray-600">
              {isCreator ? '👑 You are the room creator' : '👤 You are a member'}
            </p>
          </div>
          <button
            onClick={handleLeaveRoom}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Leave Room
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold italic text-purple-800">
              {mode === 'focus' ? 'Focus' : mode === 'short' ? 'Short Break' : 'Long Break'}
              {isCreator && ' (Universal Timer)'}
            </h3>
            {isCreator && (
              <button onClick={() => setShowSettings(true)} className="text-2xl cursor-pointer">
                ⚙️
              </button>
            )}
          </div>

          <div className="text-center mb-6">
            <div className="text-6xl font-bold italic text-purple-800 mb-4">
              {formatTime(secondsLeft)}
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            {!isCreator && (
              <p className="text-sm text-gray-500 mt-2">Timer controlled by room creator</p>
            )}
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={handleStartPause}
              disabled={!isCreator}
              className={`px-6 py-2 rounded-lg font-semibold ${
                isCreator 
                  ? 'bg-purple-500 text-white hover:bg-purple-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition`}
            >
              {isRunning ? '⏸️ Pause' : '▶️ Start'}
            </button>
            <button
              onClick={handleReset}
              disabled={!isCreator}
              className={`px-6 py-2 rounded-lg font-semibold ${
                isCreator 
                  ? 'bg-gray-500 text-white hover:bg-gray-600 cursor-pointer' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              } transition`}
            >
              🔄 Reset
            </button>
          </div>

          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleModeChange('focus')}
              disabled={!isCreator}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                mode === 'focus' 
                  ? 'bg-purple-500 text-white' 
                  : isCreator 
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              FOCUS
            </button>
            <button
              onClick={() => handleModeChange('short')}
              disabled={!isCreator}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                mode === 'short' 
                  ? 'bg-purple-500 text-white' 
                  : isCreator 
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              SHORT BREAK
            </button>
            <button
              onClick={() => handleModeChange('long')}
              disabled={!isCreator}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                mode === 'long' 
                  ? 'bg-purple-500 text-white' 
                  : isCreator 
                    ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              LONG BREAK
            </button>
          </div>
        </div>

        {/* Tasks Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold italic text-purple-800 mb-4">Group Tasks</h3>

          <div className="flex gap-2 mb-6">
            <input
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a group task..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={addTask}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
            >
              ➕
            </button>
          </div>
          

          {/* TaskList */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {room.tasks.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No group tasks yet. Add some to get started!
              </div>
            ) : (
              room.tasks.map((task) => (
                <div key={task.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.completedBy.includes(currentUser.name)}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1"
                      />
                      <div>
                        <span className={`font-medium ${task.completedBy.includes(currentUser.name) ? 'line-through text-gray-400' : ''}`}>
                          {task.text}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded ${
                            task.priority === 'High' ? 'bg-red-100 text-red-600' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-green-100 text-green-600'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-gray-500">by {task.createdBy}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-gray-400 hover:text-red-500 text-sm"
                    >
                      🗑️
                    </button>
                  </div>
                  {task.completedBy.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-200">
                      <p className="text-xs text-gray-600 mb-1">Completed by:</p>
                      <div className="flex flex-wrap gap-1">
                        {task.completedBy.map((name, index) => (
                          <span key={index} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                            ✅ {name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Members Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold italic text-purple-800 mb-4">
            Room Members ({room.members.length}/{room.maxMembers})
          </h3>
          
          <div className="space-y-3">
            {room.members.map((member) => (
              <div key={member.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-purple-200 rounded-full flex items-center justify-center">
                  {member.id === room.creatorId ? '👑' : '👤'}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-xs text-gray-500">
                    {member.id === room.creatorId ? 'Room Creator' : 'Member'}
                  </p>
                </div>
                {member.id === currentUser.id && (
                  <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">You</span>
                )}
              </div>
            ))}
          </div>

          {room.members.length < room.maxMembers && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-700 font-medium mb-2">Invite Others</p>
              <p className="text-xs text-blue-600">Share Room ID: <span className="font-mono font-bold">{room.id}</span></p>
            </div>
          )}
        </div>

        {/* Chat Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold italic text-purple-800 mb-4">Group Chat</h3>
          
          <div className="h-60 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg">
            {room.chat.length === 0 ? (
              <div className="text-center text-gray-400 py-8">
                No messages yet. Start the conversation!
              </div>
            ) : (
              <div className="space-y-3">
                {room.chat.map((message) => (
                  <div key={message.id} className={`flex gap-2 ${
                    message.sender === currentUser.name ? 'justify-end' : 'justify-start'
                  }`}>
                    <div className={`max-w-xs px-3 py-2 rounded-lg ${
                      message.sender === currentUser.name 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-white border border-gray-200'
                    }`}>
                      {message.sender !== currentUser.name && (
                        <p className="text-xs font-medium text-gray-600 mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === currentUser.name ? 'text-purple-200' : 'text-gray-400'
                      }`}>
                        {new Date(message.timestamp).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition font-semibold"
            >
              💬
            </button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-40">
          {notification}
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <GroupSettings
          onApply={handleApplySettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

// Main Group component
const Final = () => {
  const [currentView, setCurrentView] = useState('selection'); // 'selection' or 'session'
  const [sessionData, setSessionData] = useState(null);

  const handleNavigateToSession = (roomData, isCreator, currentUser) => {
    setSessionData({ roomData, isCreator, currentUser });
    setCurrentView('session');
  };

  const handleBackToHome = () => {
    setCurrentView('selection');
    setSessionData(null);
    // In a real app, this would navigate to home page
    window.location.href = '/';
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSessionData(null);
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-800 tracking-wide">
          <span className="font-extrabold text-xl">F</span>
          <span className="font-extrabold text-xl">T</span>
          <span className="ml-2 italic text-lg">FocusTroop</span>
        </h1>
        <button
          onClick={currentView === 'selection' ? handleBackToHome : handleBackToSelection}
          className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-[white] transition"
        >
          {currentView === 'selection' ? 'BACK' : 'BACK TO SELECTION'}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        {currentView === 'selection' ? (
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold italic text-purple-800 mb-6 text-center">
              GROUP SESSION
            </h2>
            <GroupSelection
              onNavigateToSession={handleNavigateToSession}
              onBack={handleBackToHome}
            />
          </div>
        ) : (
          <div className="w-full max-w-7xl">
            <GroupSession
              roomData={sessionData.roomData}
              isCreator={sessionData.isCreator}
              currentUser={sessionData.currentUser}
              onBack={handleBackToSelection}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Final;