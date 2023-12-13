import { render, screen, fireEvent } from '@testing-library/react';
import SingleArticle from './SingleArticle';
import React from 'react';
import '@testing-library/jest-dom';

// Grouping tests for SingleArticle component
describe('SingleArticle Component', () => {
    // Mock article data
    const mockArticle = {
        id: '1',
        title: 'Test Article',
        body: 'This is a test article.\nIt has multiple paragraphs.',
        date: '2021-01-01',
        image: 'images/test-image.jpg'
    };

    // Setup to modify window.location for testing
    const originalLocation = window.location;
    beforeAll(() => {
        delete window.location;
        window.location = { href: '' };
    });

    // Cleanup to restore original window.location
    afterAll(() => {
        window.location = originalLocation;
    });

    // Test to render the article details correctly
    it('renders the article details correctly', () => {
        // Render the component with mock data
        render(<SingleArticle {...mockArticle} />);
        
        // Verify that article details are displayed correctly
        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
        const bodyElement = screen.getByTestId('article-body');
        expect(bodyElement).toHaveTextContent('This is a test article.');
        expect(bodyElement).toHaveTextContent('It has multiple paragraphs.');
        expect(screen.getByText('January 1, 2021')).toBeInTheDocument();
        expect(screen.getByAltText(mockArticle.title)).toHaveAttribute('src', '/' + mockArticle.image);
    });

    // Test to verify correct navigation on edit button click
    it('navigates correctly on edit button click', () => {
        // Render the component with mock data
        render(<SingleArticle {...mockArticle} />);

        // Simulate click on 'Edit' and verify redirection
        fireEvent.click(screen.getByText('Edit'));
        expect(window.location.href).toBe(`/edit-article/${mockArticle.id}`);
    });
});