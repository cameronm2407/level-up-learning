import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
        <h1 className="text-2xl font-semibold">Level‑Up Learning</h1>
        <p className="text-slate-600 mt-2">
          Tailwind is installed and working ✅
        </p>
        <button className="mt-6 inline-flex items-center rounded-xl px-4 py-2 border border-slate-300 hover:bg-slate-50">
          Continue
        </button>
      </div>
    </div>
  );
}
export default App;
