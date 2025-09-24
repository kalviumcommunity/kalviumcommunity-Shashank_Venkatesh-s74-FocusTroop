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
    High: "text-red-600",
    Medium: "text-orange-500",
    Low: "text-green-600",
  };
  const priorityBg = {
    High: "bg-red-100",
    Medium: "bg-orange-100",
    Low: "bg-green-100",
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
                <span
                  className="text-2xl cursor-pointer"
                  aria-label="settings"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 640"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z" />
                  </svg>
                </span>
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
                  mode === "focus"
                    ? "bg-purple-400 text-white"
                    : "bg-white border cursor-pointer"
                }`}
              >
                Focus
              </button>
              <button
                onClick={() => handleModeChange("short")}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  mode === "short"
                    ? "bg-purple-400 text-white"
                    : "bg-white border cursor-pointer"
                }`}
              >
                Short Break
              </button>
              <button
                onClick={() => handleModeChange("long")}
                className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                  mode === "long"
                    ? "bg-purple-400 text-white"
                    : "bg-white border cursor-pointer"
                }`}
              >
                Long Break
              </button>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold italic text-purple-800 mb-2">
              Tasks
            </h3>

            <div className="mt-4 flex gap-3 items-center">
              <input
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                placeholder="Add a new Task.."
                className="flex-1 border rounded px-3 py-2 text-sm"
              />

              {/* Custom dropdown with colors */}
              <div className="relative w-32">
                <button
                  type="button"
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className={`w-full border rounded px-3 py-2 text-sm text-left bg-white flex justify-between items-center ${priorityColors[priority]}`}
                >
                  {priority}
                  <span className="text-gray-500">▼</span>
                </button>

                {showDropdown && (
                  <ul className="absolute left-0 mt-1 w-full bg-white border rounded shadow-lg z-10">
                    {["High", "Medium", "Low"].map((p) => (
                      <li
                        key={p}
                        onClick={() => {
                          setPriority(p);
                          setShowDropdown(false);
                        }}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-purple-100 ${priorityColors[p]}`}
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                onClick={addTask}
                className="px-4 py-2 bg-purple-400 text-white rounded-lg hover:bg-purple-500 transition"
              >
                +
              </button>
            </div>

            {/* Task list with colored priority badges */}
            <ul className="mt-6 space-y-3 max-h-64 overflow-y-auto pr-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-center justify-between border rounded px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task.id)}
                    />
                    <span
                      className={`${
                        task.done
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                    <span
                      className={`ml-2 px-2 py-1 text-xs rounded-full ${priorityBg[task.priority]} ${priorityColors[task.priority]}`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {notification && (
            <div className="mt-4 text-center text-sm text-green-600 font-medium">
              {notification}
            </div>
          )}
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
