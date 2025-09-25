import React, { useState, useEffect } from "react";

export default function Settings({ onApply, onClose, defaultDurations }) {
  const [focusTime, setFocusTime] = useState("25");
  const [shortBreak, setShortBreak] = useState("5");
  const [longBreak, setLongBreak] = useState("15");
  
  // ✅ Load default values when modal opens
  useEffect(() => {
    if (defaultDurations) {
      setFocusTime(Math.floor(defaultDurations.focus / 60)); // convert sec → min
      setShortBreak(Math.floor(defaultDurations.short / 60));
      setLongBreak(Math.floor(defaultDurations.long / 60));
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

  const presets = [
    { name: "Classic", focus: 25, short: 5, long: 15 },
    { name: "Extended", focus: 50, short: 10, long: 30 },
    { name: "Quick", focus: 15, short: 3, long: 10 },
    { name: "Deep Work", focus: 90, short: 15, long: 45 }
  ];

  const applyPreset = (preset) => {
    setFocusTime(preset.focus);
    setShortBreak(preset.short);
    setLongBreak(preset.long);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md overflow-hidden">
        {/* Minimal Header */}
        <div className="bg-purple-600 p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Timer Settings</h2>
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
              <label className="font-medium text-gray-700 text-sm">
                Focus timer
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={focusTime}
                  onChange={(e) => setFocusTime(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>
            
            {/* Short Break */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 text-sm">
                Short Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={shortBreak}
                  onChange={(e) => setShortBreak(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>
            
            {/* Long Break */}
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-700 text-sm">
                Long Break
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={longBreak}
                  onChange={(e) => setLongBreak(e.target.value)}
                  className="w-16 border border-gray-300 rounded-lg px-2 py-1 text-sm text-center focus:border-purple-400 focus:outline-none"
                />
                <span className="text-gray-500 text-sm">mins</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
