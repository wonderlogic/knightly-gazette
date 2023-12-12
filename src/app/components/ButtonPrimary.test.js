import { render, screen, fireEvent } from '@testing-library/react';
import ButtonPrimary from './ButtonPrimary';
import React from 'react';
import '@testing-library/jest-dom';

describe('ButtonPrimary Component', () => {
    const mockOnClick = jest.fn();

    it('renders with correct text and className', () => {
      const buttonText = 'Click Me';
      const buttonClass = 'primary-button';

      render(<ButtonPrimary text={buttonText} className={buttonClass} onClick={mockOnClick} />);

      const buttonElement = screen.getByText(buttonText);
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement).toHaveClass(buttonClass);
    });

    it('calls onClick prop when clicked', () => {
      render(<ButtonPrimary text="Click Me" className="primary-button" onClick={mockOnClick} />);
      const buttonElement = screen.getByText('Click Me');

      fireEvent.click(buttonElement);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
});