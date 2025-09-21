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

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

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

        // 🔔 Play notification sound when timer ends
        const audio = new Audio("/notification.mp3");
        audio.play();

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
    setTasks((t) =>
      t.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );

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

  // Apply settings from Settings.jsx
  const handleApplySettings = (newDurations) => {
    setDurations((prev) => ({
      focus: newDurations.focus ?? prev.focus,
      short: newDurations.short ?? prev.short,
      long: newDurations.long ?? prev.long,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f0d9fc] text-gray-700 flex flex-col">
      {/* Navbar */}
      <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-purple-700 tracking-wide">
          <span className="ml-2 italic text-lg">FocusTroop</span>
        </h1>
        <div>
          <button
            onClick={handleBack}
            className="bg-gray-200 text-purple-700 font-bold italic px-4 py-1 rounded-md cursor-pointer hover:bg-[#8d66da] hover:text-[white] transition"
          >
            BACK
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-center text-3xl md:text-4xl font-bold italic text-purple-800 mb-2">
          SOLO POMODORO
        </h1>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Timer Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex flex-row justify-between">
              <h3 className="text-xl font-bold italic text-purple-800 mb-2">
                {mode === "focus"
                  ? "Focus"
                  : mode === "short"
                  ? "Short Break"
                  : "Long Break"}
              </h3>

              <button onClick={() => setShowSettings(true)}>
                <h2 className="text-2xl cursor-pointer"> ⚙️</h2>
              </button>
            </div>

            <div className="mt-6 text-center">
              <div className="text-6xl font-bold italic text-purple-800 mb-2">
                {formatTime(secondsLeft)}
              </div>
              <div className="mt-6 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-purple-400 transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={handleStartPause}
                className="px-4 py-2 rounded-lg border bg-white shadow-sm cursor-pointer"
              >
                {isRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg border bg-white shadow-sm cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => handleModeChange("focus")}
                className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  mode === "focus" ? "bg-purple-400 text-white" : "bg-white border cursor-pointer"
                }`}
              >
                FOCUS
              </button>
              <button
                onClick={() => handleModeChange("short")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  mode === "short" ? "bg-purple-400 text-white" : "bg-white border cursor-pointer"
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => handleModeChange("long")}
                className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  mode === "long" ? "bg-purple-400 text-white" : "bg-white border cursor-pointer"
                }`}
              >
                Long Break
              </button>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="textext-lg font-bold italic text-purple-800 mb-2">Tasks</h3>

            <div className="mt-4 flex gap-3 items-center">
              <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a new Task.."
                className="flex-1 border rounded px-3 py-2 text-sm"
              />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="border rounded px-2 py-2 text-sm"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <button
                onClick={addTask}
                className="px-4 py-2 bg-purple-400 text-white rounded-lg"
              >
                +
              </button>
            </div>

            <div className="mt-8">
              {tasks.length === 0 ? (
                <div className="text-center text-gray-400">
                  No tasks yet. Add some to get started!
                </div>
              ) : (
                <ul className="space-y-3">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center justify-between gap-3 bg-gray-50 p-3 rounded"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={() => toggleDone(task.id)}
                        />
                        <span className={`text-sm ${task.done ? "line-through text-gray-400" : ""}`}>
                          {task.text}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600"
                              : task.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-sm text-gray-500 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {notification && (
              <div className="mt-4 text-center text-sm text-green-600 font-medium">
                {notification}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          onApply={handleApplySettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
