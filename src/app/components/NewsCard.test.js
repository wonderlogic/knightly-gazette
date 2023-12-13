import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from './NewsCard';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for NewsCard component
describe('NewsCard Component', () => {
    const mockId = '123';
    const mockTitle = 'Test Title';
    const mockDescription = 'Test Description';
    const mockImage = 'images/test-image.jpg';
    const originalLocation = window.location;

    // Setup to modify window.location for testing
    beforeAll(() => {
        delete window.location;
        window.location = { href: '' };
    });

    // Cleanup to restore original window.location
    afterAll(() => {
        window.location = originalLocation;
    });

    // Test to check if the NewsCard renders correctly with an image
    it('renders correctly with an image', () => {
        // Render the component with image
        render(<NewsCard id={mockId} image={mockImage} title={mockTitle} description={mockDescription} />);

        // Verify if the image, title, and description are rendered
        expect(screen.getByAltText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    // Test to check if the NewsCard renders correctly without an image
    it('renders correctly without an image', () => {
        // Render the component without image
        render(<NewsCard id={mockId} title={mockTitle} description={mockDescription} />);

        // Verify if the title and description are rendered but not the image
        expect(screen.queryByAltText(mockTitle)).not.toBeInTheDocument();
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    // Test to verify correct navigation on button clicks
    it('navigates correctly on button clicks', () => {
        // Render the component
        render(<NewsCard id={mockId} title={mockTitle} description={mockDescription} />);

        // Simulate click on 'Edit' and verify redirection
        fireEvent.click(screen.getByText('Edit'));
        expect(window.location.href).toBe(`/edit-article/${mockId}`);

        // Simulate click on 'Read More' and verify redirection
        fireEvent.click(screen.getByText('Read More'));
        expect(window.location.href).toBe(`/article/${mockId}`);
    });
});