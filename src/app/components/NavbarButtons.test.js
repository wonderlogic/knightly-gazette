import { render, screen, fireEvent } from '@testing-library/react';
import NavbarButtons from './NavbarButtons';
import React from 'react';
import '@testing-library/jest-dom';

describe('NavbarButtons Component', () => {
    const mockOnClick = jest.fn();

    it('renders a button when href is not provided', () => {
        const buttonText = 'Button Text';

        render(<NavbarButtons text={buttonText} onClick={mockOnClick} />);

        const buttonElement = screen.getByRole('button', { name: buttonText });
        expect(buttonElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('renders a link when href is provided', () => {
        const linkText = 'Link Text';
        const href = '/test-link';
      
        // Mock the onClick function to include preventDefault
        const mockOnClick = jest.fn(event => {
          event.preventDefault();
        });
      
        render(<NavbarButtons text={linkText} onClick={mockOnClick} href={href} />);
      
        const linkElement = screen.getByRole('link', { name: linkText });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
      
        fireEvent.click(linkElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
      });      
});