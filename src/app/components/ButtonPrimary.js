import React from 'react';

/**
 * ButtonPrimary - A reusable button component.
 * 
 * @param {string} text - The text to be displayed on the button.
 * @param {string} className - The CSS class for styling the button.
 * @param {string} id - The ID of the button, useful for identification in DOM.
 * @param {function} onClick - The function to be executed when the button is clicked.
 */

const ButtonPrimary = ({ text, className, id, onClick }) => {
  return (
    <button id={id} onClick={onClick} className={className}>{text}</button>
  );
}

export default ButtonPrimary;