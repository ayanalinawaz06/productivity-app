/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light Mode Palette
        'app-light': '#F8F8F8', // Softer off-white background
        'text-light': '#333333', // Dark text for light mode
        'primary-light': '#60A5FA', // Sky blue primary
        'primary-darker-light': '#3B82F6', // Darker sky blue for hover/active
        'border-light': '#D1D5DB', // Subtle light border

        // Dark Mode Palette
        'app-dark': '#2C2C2C', // Dark charcoal gray background
        'text-dark': '#E0E0E0', // Light text for dark mode
        'primary-dark': '#3B82F6', // Sky blue primary (can be same or slightly different)
        'primary-lighter-dark': '#60A5FA', // Lighter sky blue for hover/active
        'border-dark': '#4B5563', // Subtle dark border

        // Specific shades for modules (can be adjusted later)
        blue: { // For Tasks
          light: '#93C5FD', // Light blue
          DEFAULT: '#3B82F6', // Sky blue
          dark: '#2563EB', // Darker blue
        },
        purple: { // For Notes
          light: '#C4B5FD',
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        indigo: { // For Pomodoro
          light: '#A5B4FC',
          DEFAULT: '#6366F1',
          dark: '#4F46E5',
        },
        green: { // For Habits
          light: '#A7F3D0',
          DEFAULT: '#10B981',
          dark: '#059669',
        },
        yellow: { // For Favorites/Warnings
          light: '#FDE68A',
          DEFAULT: '#FBBF24',
          dark: '#D97706',
        },

        // Define CSS variables for global use (e.g., in index.css)
        // These will be compiled as `--color-name: #hexvalue;`
        'css': {
          'app-light': 'var(--color-app-light)',
          'text-light': 'var(--color-text-light)',
          'primary-light': 'var(--color-primary-light)',
          'primary-darker-light': 'var(--color-primary-darker-light)',
          'border-light': 'var(--color-border-light)',
          'app-dark': 'var(--color-app-dark)',
          'text-dark': 'var(--color-text-dark)',
          'primary-dark': 'var(--color-primary-dark)',
          'primary-lighter-dark': 'var(--color-primary-lighter-dark)',
          'border-dark': 'var(--color-border-dark)',
          'blue-DEFAULT': 'var(--color-blue-DEFAULT)',
          'blue-light': 'var(--color-blue-light)',
          'blue-dark': 'var(--color-blue-dark)',
          'purple-DEFAULT': 'var(--color-purple-DEFAULT)',
          'purple-light': 'var(--color-purple-light)',
          'purple-dark': 'var(--color-purple-dark)',
          'indigo-DEFAULT': 'var(--color-indigo-DEFAULT)',
          'indigo-light': 'var(--color-indigo-light)',
          'indigo-dark': 'var(--color-indigo-dark)',
          'green-DEFAULT': 'var(--color-green-DEFAULT)',
          'green-light': 'var(--color-green-light)',
          'green-dark': 'var(--color-green-dark)',
          'yellow-DEFAULT': 'var(--color-yellow-DEFAULT)',
          'yellow-light': 'var(--color-yellow-light)',
          'yellow-dark': 'var(--color-yellow-dark)',
        },
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'], // Define Roboto font family
      },
      keyframes: {
        'pulse-warning': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' },
        },
      },
      animation: {
        'pulse-warning': 'pulse-warning 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}