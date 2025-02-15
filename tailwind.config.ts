import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out forwards',
        slideOut: 'slideOut 0.3s ease-out forwards'
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        first:'#201E43',
        second:'#134B70',
        third:'#508C9B',
        text:'#EEEEEE'
      },
    },
  },
  plugins: [],
} satisfies Config;
