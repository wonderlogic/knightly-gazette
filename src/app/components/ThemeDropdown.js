import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react'
import React from 'react';

/**
 * ThemeDropdown - A dropdown component for selecting a UI theme.
 */

const ThemeDropdown = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  

  
  return (
    <div className="dropdown">
      {/* Dropdown button with an arrow icon */}
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg width="12px" height="12px" className="h-2 w-2 fill-current opacity-60 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>

      {/* Dropdown content with theme options */}
      <ul tabIndex={0} className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52">
        {/* List of theme options as radio buttons */}
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Light" value="light" onClick={() => setTheme('light')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dark" value="dark" onClick={() => setTheme('dark')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Corporate" value="corporate" onClick={() => setTheme('corporate')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Business" value="business" onClick={() => setTheme('business')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Dim" value="dim" onClick={() => setTheme('dim')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk" value="cyberpunk" onClick={() => setTheme('cyberpunk')}/>
        </li>
        <li>
          <input type="radio" name="theme-dropdown" className="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro" value="retro" onClick={() => setTheme('retro')}/>
        </li>
      </ul>
    </div>
  );
}

export default ThemeDropdown;