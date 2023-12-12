import { render, screen, fireEvent } from '@testing-library/react';
import ThemeDropdown from './ThemeDropdown';
import React from 'react';
import '@testing-library/jest-dom';

const mockSetTheme = jest.fn();

// Mock the useTheme hook
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: mockSetTheme,
  }),
}));

describe('ThemeDropdown Component', () => {
    it('renders theme options correctly', () => {
        render(<ThemeDropdown />);

        // Verify that all theme options are in the document
        expect(screen.getByLabelText('Light')).toBeInTheDocument();
        expect(screen.getByLabelText('Dark')).toBeInTheDocument();
        expect(screen.getByLabelText('Corporate')).toBeInTheDocument();
        expect(screen.getByLabelText('Business')).toBeInTheDocument();
        expect(screen.getByLabelText('Dim')).toBeInTheDocument();
        expect(screen.getByLabelText('Cyberpunk')).toBeInTheDocument();
        expect(screen.getByLabelText('Retro')).toBeInTheDocument();
    });

    it('changes theme on option click', () => {
        render(<ThemeDropdown />);
        
        // Simulate clicking a theme option
        fireEvent.click(screen.getByLabelText('Dark'));
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
        
        // Reset the mock function
        mockSetTheme.mockClear();
        
        // Simulate clicking another theme option
        fireEvent.click(screen.getByLabelText('Retro'));
        expect(mockSetTheme).toHaveBeenCalledWith('retro');
    });      
});