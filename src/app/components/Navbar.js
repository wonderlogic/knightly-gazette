import React from 'react';
import NavbarButtons from './NavbarButtons';
import ThemeDropdown from './ThemeDropdown';

/**
 * Navbar - A component that renders the navigation bar of the application.
 */

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 justify-between">
      {/* Logo and title section */}
      <div className="flex items-center space-x-4 py-8">
        {/* Link to homepage with logo */}
        <a href='/'>
          <img
            src="/images/knightly-gazette.png"
            alt="Knightly Gazette logo"
            className="h-24 w-24 rounded-md"
          />
        </a>
        {/* Link to homepage with title */}
        <a href='/'>
          <h1 className="text-4xl font-bold text-base-content">
            Knightly Gazette
          </h1>
        </a>
      </div>

      {/* Navigation buttons and theme dropdown */}
      <div>
        {/* Navigation buttons with links */}
        <NavbarButtons text="Home" href="/" />
        <NavbarButtons text="Create Article" href="/create-article" />
        {/* Theme dropdown component */}
        <ThemeDropdown />
      </div>
    </div>
  );
};

export default Navbar;