import React, { useState, useEffect } from "react";

export default function Settings({ onApply, onClose, defaultDurations }) {
  const [focusTime, setFocusTime] = useState("25");
  const [shortBreak, setShortBreak] = useState("5");
  const [longBreak, setLongBreak] = useState("15");

  // ✅ Load default values when modal opens
  useEffect(() => {
    if (defaultDurations) {
      setFocusTime(defaultDurations.focus / 60);   // convert sec → min
      setShortBreak(defaultDurations.short / 60);
      setLongBreak(defaultDurations.long / 60);
    }
  }, [defaultDurations]);

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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-[350px] text-center">
        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center justify-center gap-2">
          SETTINGS
        </h2>

        {/* Focus Time */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 font-medium text-purple-700">
            📖 Focus timer
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={focusTime}
              onChange={(e) => setFocusTime(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-sm text-center"
            />
            <span className="text-gray-500 text-sm">mins</span>
          </div>
        </div>

        {/* Short Break */}
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 font-medium text-purple-700">
            ☕ Short Break
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={shortBreak}
              onChange={(e) => setShortBreak(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-sm text-center"
            />
            <span className="text-gray-500 text-sm">mins</span>
          </div>
        </div>

        {/* Long Break */}
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 font-medium text-purple-700">
            🔄 Long Break
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={longBreak}
              onChange={(e) => setLongBreak(e.target.value)}
              className="w-16 border rounded px-2 py-1 text-sm text-center"
            />
            <span className="text-gray-500 text-sm">mins</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleApply}
            className="w-full py-2 rounded-lg bg-purple-500 text-white font-semibold hover:bg-purple-600 transition"
          >
            APPLY
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
  );
}
