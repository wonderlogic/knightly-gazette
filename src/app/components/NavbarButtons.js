import React from 'react';

/**
 * NavbarButtons - A component that renders a button or a link.
 * 
 * @param {string} text - The text to be displayed on the button or link.
 * @param {function} onClick - The function to be executed on click.
 * @param {string} [href] - The URL to which the link should direct. If provided, the component renders an anchor tag.
 */

const NavbarButtons = ({ text, onClick, href }) => {
  return (
    <div>
      {/* Conditionally render either an anchor tag or a button based on the presence of 'href' */}
      {href ? (
        <a href={href} className="btn btn-ghost text-xl" onClick={onClick}>
          {text}
        </a>
      ) : (
        <button className="btn btn-ghost text-xl" onClick={onClick}>
          {text}
        </button>
      )}
    </div>
  );
}

export default NavbarButtons;