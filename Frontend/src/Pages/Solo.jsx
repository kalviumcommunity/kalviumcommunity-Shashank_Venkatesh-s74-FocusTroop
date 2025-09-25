import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Settings from "../Pages/Settings"; // make sure the path is correct

export default function Solo() {
  const navigate = useNavigate();

  const [DURATIONS, setDurations] = useState({
    focus: 25 * 60,
    short: 5 * 60,
    long: 15 * 60,
  });

  const [mode, setMode] = useState("focus");
  const [secondsLeft, setSecondsLeft] = useState(DURATIONS[mode]);
  const [isRunning, setIsRunning] = useState(false);

  const [showSettings, setShowSettings] = useState(false);

  const [taskInput, setTaskInput] = useState("");
  const [priority, setPriority] = useState("High");
  const [tasks, setTasks] = useState([]);
  const [notification, setNotification] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  const priorityColors = {
    High: "text-red-500",
    Medium: "text-amber-500",
    Low: "text-emerald-500",
  };
  const priorityBg = {
    High: "bg-red-50 border-red-200",
    Medium: "bg-amber-50 border-amber-200",
    Low: "bg-emerald-50 border-emerald-200",
  };

  // Load tasks
  useEffect(() => {
    const raw = localStorage.getItem("pomodoro_tasks");
    if (raw) setTasks(JSON.parse(raw));
  }, []);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("pomodoro_tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Reset timer when mode or durations change
  useEffect(() => {
    setSecondsLeft(DURATIONS[mode]);
    setIsRunning(false);
  }, [mode, DURATIONS]);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          new Audio("/notification.mp3").play();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  };

  const handleStartPause = () => setIsRunning((v) => !v);
  const handleReset = () => setSecondsLeft(DURATIONS[mode]);
  const handleModeChange = (newMode) => setMode(newMode);

  const addTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) return;
    const newTask = { id: Date.now(), text: trimmed, done: false, priority };
    const updated = [...tasks, newTask].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
    setTasks(updated);
    setTaskInput("");
    setPriority("High");
  };

  const toggleDone = (id) => {
    setTasks((t) => {
      const updated = t.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
      // Move completed tasks to bottom
      return updated.sort((a, b) => Number(a.done) - Number(b.done));
    });

    const completed = tasks.find((task) => task.id === id);
    if (completed && !completed.done) {
      setNotification(`Task '${completed.text}' completed!`);
    }
  };

  const removeTask = (id) => setTasks((t) => t.filter((task) => task.id !== id));

  const total = DURATIONS[mode];
  const progress = Math.round(((total - secondsLeft) / total) * 100);

  const handleBack = () => {
    if (isRunning) {
      const confirmQuit = window.confirm(
        "A session is currently running. Are you sure you want to quit?"
      );
      if (!confirmQuit) return;
    }
    navigate("/");
  };

  const handleApplySettings = (newDurations) => {
    setDurations((prev) => ({
      focus: newDurations.focus ?? prev.focus,
      short: newDurations.short ?? prev.short,
      long: newDurations.long ?? prev.long,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] text-gray-700 flex flex-col">
      {/* Enhanced Navbar with subtle effects */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow-sm border-b border-purple-100">
        <h1 className="text-2xl font-bold text-purple-700 tracking-wide transition-all duration-300 hover:text-purple-600">
          <span className="ml-2 italic text-lg">FocusTroop</span>
        </h1>
        <div>
          <button
            onClick={handleBack}
            className="bg-gray-100 text-purple-700 font-bold italic px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-600 hover:text-white hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            BACK
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-center text-3xl md:text-4xl font-bold italic text-purple-800 mb-8">
          SOLO POMODORO
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Minimal Timer Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold italic text-purple-800">
                {mode === "focus"
                  ? "Focus"
                  : mode === "short"
                  ? "Short Break"
                  : "Long Break"}
              </h3>

              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                </svg>
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl font-mono font-bold text-purple-800 mb-4 tracking-wide">
                {formatTime(secondsLeft)}
              </div>
              
              {/* Progress Bar */}
              <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                <div
                  className="h-2 bg-purple-400 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 text-right">{progress}%</div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={handleStartPause}
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 font-medium"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 font-medium"
              >
                Reset
              </button>
            </div>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => handleModeChange("focus")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === "focus"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => handleModeChange("short")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === "short"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => handleModeChange("long")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  mode === "long"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Long Break
              </button>
            </div>
          </div>

          {/* Enhanced Tasks Card - Compact Size */}
          <div className="bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold italic text-purple-800 flex items-center gap-2">
                📝 Tasks
              </h3>
              <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                {tasks.filter(t => !t.done).length} active
              </div>
            </div>

            {/* Task Input */}
            <div className="flex gap-2 items-center mb-4">
              <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a new task..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-purple-400 focus:outline-none transition-all duration-200"
              />

              {/* Priority Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className={`w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm text-left bg-white flex justify-between items-center hover:border-gray-300 transition-all duration-200 ${priorityColors[priority]} font-medium`}
                >
                  {priority}
                  <span className={`transform transition-transform duration-200 text-xs ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
                </button>

                {showDropdown && (
                  <ul className="absolute right-0 mt-1 w-24 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                    {["High", "Medium", "Low"].map((p) => (
                      <li
                        key={p}
                        onClick={() => {
                          setPriority(p);
                          setShowDropdown(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${priorityColors[p]} font-medium`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={addTask}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all duration-200 font-medium"
              >
                +
              </button>
            </div>

            {/* Task List */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {tasks.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <div className="text-2xl mb-2">📝</div>
                  <p className="text-sm">No tasks yet</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`group bg-gray-50 rounded-lg border p-3 transition-all duration-200 hover:shadow-sm ${task.done ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleDone(task.id)}
                            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                          />
                        </label>
                        
                        <span className={`text-sm font-medium flex-1 transition-all duration-200 ${
                          task.done
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}>
                          {task.text}
                        </span>
                        
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${priorityBg[task.priority]} ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => removeTask(task.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Notification */}
        {notification && (
          <div className="fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg border border-emerald-400 animate-bounce z-50">
            <div className="flex items-center space-x-2">
              <span>🎉</span>
              <span className="font-medium text-sm">{notification}</span>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          defaultDurations={DURATIONS}
          onApply={handleApplySettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}