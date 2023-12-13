import { render, screen, fireEvent } from '@testing-library/react';
import ButtonSecondary from './ButtonSecondary';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for ButtonSecondary component
describe('ButtonSecondary Component', () => {
    const mockOnClick = jest.fn(); // Mock function for onClick event

    // Test to ensure the button renders with correct text and class
    it('renders with correct text and className', () => {
      const buttonText = 'Click Me';
      const buttonClass = 'secondary-button';

      // Render the component with props
      render(<ButtonSecondary text={buttonText} className={buttonClass} onClick={mockOnClick} />);

      // Verify the button text and class
      const buttonElement = screen.getByText(buttonText);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(buttonClass);
    });

    // Test to check if onClick event is called when the button is clicked
    it('calls onClick prop when clicked', () => {
      // Render the component
      render(<ButtonSecondary text="Click Me" className="secondary-button" onClick={mockOnClick} />);
      const buttonElement = screen.getByText('Click Me');

      // Simulate click event
      fireEvent.click(buttonElement);

      // Verify the mock function was called
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});