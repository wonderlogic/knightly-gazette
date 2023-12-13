import { render, screen, fireEvent } from '@testing-library/react';
import ThemeDropdown from './ThemeDropdown';
import React from 'react';
import '@testing-library/jest-dom';

const mockSetTheme = jest.fn();

// Mocking the useTheme hook from next-themes to control theme state in tests
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light', // Default theme
    setTheme: mockSetTheme, // Mock function to simulate theme change
  }),
}));

// Grouping tests for the ThemeDropdown component
describe('ThemeDropdown Component', () => {
    // Test to ensure all theme options are rendered correctly
    it('renders theme options correctly', () => {
        // Render the ThemeDropdown component
        render(<ThemeDropdown />);

        // Verify that all available theme options are rendered in the document
        expect(screen.getByLabelText('Light')).toBeInTheDocument();
        expect(screen.getByLabelText('Dark')).toBeInTheDocument();
        expect(screen.getByLabelText('Corporate')).toBeInTheDocument();
        expect(screen.getByLabelText('Business')).toBeInTheDocument();
        expect(screen.getByLabelText('Dim')).toBeInTheDocument();
        expect(screen.getByLabelText('Cyberpunk')).toBeInTheDocument();
        expect(screen.getByLabelText('Retro')).toBeInTheDocument();
    });

    // Test to verify theme changes on user interaction
    it('changes theme on option click', () => {
        // Render the ThemeDropdown component
        render(<ThemeDropdown />);
        
        // Simulate clicking the 'Dark' theme option and verify the theme change
        fireEvent.click(screen.getByLabelText('Dark'));
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
        
        // Clearing the mock function to reset its state
        mockSetTheme.mockClear();
        
        // Simulate clicking the 'Retro' theme option and verify the theme change
        fireEvent.click(screen.getByLabelText('Retro'));
        expect(mockSetTheme).toHaveBeenCalledWith('retro');
    });      
});