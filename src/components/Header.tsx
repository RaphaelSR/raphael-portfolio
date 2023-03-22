import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export function Header() {
  const { changeLanguage } = useLanguage();
  const [lastScroll, setLastScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setVisible(currentScroll <= lastScroll || currentScroll === 0);
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <header
      className={`fixed top-0 z-50 left-0 w-full bg-white shadow-md p-4 transition-opacity duration-300 ease-in-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
          onClick={() => changeLanguage("en")}
        >
          English
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => changeLanguage("pt")}
        >
          Português
        </button>
      </div>
    </header>
  );
}
