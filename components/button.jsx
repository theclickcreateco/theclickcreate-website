import React from "react";

export function Button({ children, variant = "primary", className = "", ...props }) {
  const baseStyles = "inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#2A9D8F] via-[#264653] to-[#F4A261] bg-[length:200%_auto] hover-gradient-x transition-all duration-500 text-white shadow-lg",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    outline: "border border-input bg-background hover:bg-gradient-to-r hover:from-[#2A9D8F] hover:via-[#264653] hover:to-[#F4A261] hover:bg-[length:200%_auto] hover-gradient-x hover:text-white hover:border-transparent transition-all duration-500 shadow-sm hover:shadow-md",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
