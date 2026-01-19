"use client";

import { useState, useEffect } from "react";

export function TypewriterEffect({ words, className }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    
    // Determine speed based on action
    // Typing: 100ms, Deleting: 50ms, Pausing: handle separately
    let typeSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      // If fully typed
      if (!isDeleting && currentText === word) {
        setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before deleting
        return;
      }

      // If fully deleted
      if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      // Typing or Deleting
      const nextText = isDeleting 
        ? word.substring(0, currentText.length - 1) 
        : word.substring(0, currentText.length + 1);

      setCurrentText(nextText);

    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {currentText}
      <span className="inline-block w-[2px] h-[1em] bg-blue-500 ml-1 align-middle animate-blink"></span>
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </span>
  );
}
