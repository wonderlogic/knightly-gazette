import { render, screen, fireEvent } from '@testing-library/react';
import ButtonPrimary from './ButtonPrimary';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for ButtonPrimary component
describe('ButtonPrimary Component', () => {
    const mockOnClick = jest.fn(); // Mock function for onClick event

    // Test to ensure the button renders with correct text and class
    it('renders with correct text and className', () => {
      const buttonText = 'Click Me';
      const buttonClass = 'primary-button';

      // Render the component with props
      render(<ButtonPrimary text={buttonText} className={buttonClass} onClick={mockOnClick} />);

      // Verify the button text and class
      const buttonElement = screen.getByText(buttonText);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(buttonClass);
    });

    // Test to check if onClick event is called when the button is clicked
    it('calls onClick prop when clicked', () => {
      // Render the component
      render(<ButtonPrimary text="Click Me" className="primary-button" onClick={mockOnClick} />);
      const buttonElement = screen.getByText('Click Me');

      // Simulate click event
      fireEvent.click(buttonElement);

      // Verify the mock function was called
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});