import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import React from 'react';
import '@testing-library/jest-dom';

describe('Navbar Component', () => {
    beforeAll(() => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated but included for completeness
            removeListener: jest.fn(), // Deprecated but included for completeness
        }));
    });

    it('renders the navbar with logo, title, and navigation elements', () => {
        render(<Navbar />);

        // Check for logo
        const logoImage = screen.getByAltText('Knightly Gazette logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', '/images/knightly-gazette.png');

        // Check for title
        const title = screen.getByText('Knightly Gazette');
        expect(title).toBeInTheDocument();

        // Check for navigation buttons
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Create Article')).toBeInTheDocument();

        // Check for theme dropdown - this might need to be adjusted based on how ThemeDropdown renders
        expect(screen.getByLabelText('Light')).toBeInTheDocument();
    });
});
