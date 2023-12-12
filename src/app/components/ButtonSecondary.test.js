import { render, screen, fireEvent } from '@testing-library/react';
import ButtonSecondary from './ButtonSecondary';
import React from 'react';
import '@testing-library/jest-dom';

describe('ButtonSecondary Component', () => {
    const mockOnClick = jest.fn();

    it('renders with correct text and className', () => {
      const buttonText = 'Click Me';
      const buttonClass = 'secondary-button';

      render(<ButtonSecondary text={buttonText} className={buttonClass} onClick={mockOnClick} />);

      const buttonElement = screen.getByText(buttonText);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(buttonClass);
    });

    it('calls onClick prop when clicked', () => {
      render(<ButtonSecondary text="Click Me" className="secondary-button" onClick={mockOnClick} />);
      const buttonElement = screen.getByText('Click Me');

      fireEvent.click(buttonElement);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});