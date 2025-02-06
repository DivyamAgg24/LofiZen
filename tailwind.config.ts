import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },

      fontFamily: {
        vt323: ["VT323", "sans-serif"]
      },

      textShadow: {
        "dim-green-glow": "0px 0px 1px hsl(120, 100%, 80%), 0px 0px 10px green",
        "glow-green-small": "0px 0px 1px hsl(120, 100%, 80%), 0px 0px 2px hsl(120, 100%, 80%), 0px 0px 10px green",
        "glow-green": "0px 0px 2px hsl(120, 100%, 80%), 0px 0px 15px green,0px 0px 60px green",
        "red-glow": "0px 0px 1px hsl(0, 100%, 80%), 0px 0px 2px hsl(0, 100%, 80%), 0px 0px 15px hsl(0, 100%, 50%), 0px 0px 60px red",
        "blue-glow": "0px 0px 1px hsl(192, 100%, 80%), 0px 0px 16px hsl(244, 90%, 49%), 0px 0px 30px hsl(244, 100%, 50%), 0px 0px 60px white"
    },
    
    dropShadow: {
        "green-glow-drop-shadow": "drop-shadow(0px 0px 2px hsl(120, 100%, 80%)) drop-shadow(0px 0px 8px green)",
    },
    
    boxShadow: {
        "dim-green-glow": "0px 0px 1px hsl(120, 100%, 80%), 0px 0px 10px green",
        "glow-green-small": "0px 0px 1px hsl(120, 100%, 80%), 0px 0px 2px hsl(120, 100%, 80%), 0px 0px 10px green",
        "glow-green": "0px 0px 2px hsl(120, 100%, 80%), 0px 0px 15px green,0px 0px 60px green",
    }

    },
  },
  plugins: [
    require("tailwindcss-textshadow")
  ],
} satisfies Config;
