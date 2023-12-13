import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for Navbar component
describe('Navbar Component', () => {
    // Setup for matchMedia mock
    beforeAll(() => {
        window.matchMedia = jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Included for completeness
            removeListener: jest.fn(), // Included for completeness
        }));
    });

    // Test to render the navbar with necessary elements
    it('renders the navbar with logo, title, and navigation elements', () => {
        // Render the Navbar component
        render(<Navbar />);

        // Verify logo is rendered
        const logoImage = screen.getByAltText('Knightly Gazette logo');
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute('src', '/images/knightly-gazette.png');

        // Verify title is rendered
        const title = screen.getByText('Knightly Gazette');
        expect(title).toBeInTheDocument();

        // Verify navigation buttons are rendered
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('Create Article')).toBeInTheDocument();

        // Verify theme dropdown options are rendered
        expect(screen.getByLabelText('Light')).toBeInTheDocument();
        expect(screen.getByLabelText('Dark')).toBeInTheDocument();
        expect(screen.getByLabelText('Corporate')).toBeInTheDocument();
        expect(screen.getByLabelText('Business')).toBeInTheDocument();
        expect(screen.getByLabelText('Dim')).toBeInTheDocument();
        expect(screen.getByLabelText('Cyberpunk')).toBeInTheDocument();
        expect(screen.getByLabelText('Retro')).toBeInTheDocument();
    });
});