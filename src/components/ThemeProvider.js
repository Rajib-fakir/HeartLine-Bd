// app/components/ThemeProvider.js
"use client";
import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  return null; // শুধু side-effect
}