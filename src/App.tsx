// App.tsx
import React from "react";
import "../tailwind.css";
import Resume from "./components/Resume";
import { Header } from "./components/Header";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <Header />
      <div className="relative py-3 sm:max-w-4xl sm:mx-auto mt-16">
        <Resume />
      </div>
    </div>
  );
}

export default App;
