import { render, screen, fireEvent } from '@testing-library/react';
import NavbarButtons from './NavbarButtons';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for NavbarButtons component
describe('NavbarButtons Component', () => {
    const mockOnClick = jest.fn(); // Mock function for onClick event

    // Test to ensure button is rendered when href is not provided
    it('renders a button when href is not provided', () => {
        const buttonText = 'Button Text';

        // Render the component as a button
        render(<NavbarButtons text={buttonText} onClick={mockOnClick} />);

        // Verify button is rendered and clickable
        const buttonElement = screen.getByRole('button', { name: buttonText });
        expect(buttonElement).toBeInTheDocument();
        fireEvent.click(buttonElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    // Test to ensure a link is rendered when href is provided
    it('renders a link when href is provided', () => {
        const linkText = 'Link Text';
        const href = '/test-link';

        // Mock the onClick function to prevent default behavior
        const mockOnClick = jest.fn(event => {
          event.preventDefault();
        });

        // Render the component as a link
        render(<NavbarButtons text={linkText} onClick={mockOnClick} href={href} />);

        // Verify link is rendered and clickable
        const linkElement = screen.getByRole('link', { name: linkText });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
        fireEvent.click(linkElement);
        expect(mockOnClick).toHaveBeenCalledTimes(1);
    });      
});