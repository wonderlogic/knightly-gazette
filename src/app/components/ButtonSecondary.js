import React from 'react';

/**
 * ButtonSecondary - A reusable button component.
 * 
 * @param {string} text - The text to be displayed on the button.
 * @param {string} className - The CSS class for styling the button.
 */

const ButtonSecondary = ({ text, className, onClick }) => {
  return (
    <button onClick={onClick} className={className}>{text}</button>
  );
}

export default ButtonSecondary;