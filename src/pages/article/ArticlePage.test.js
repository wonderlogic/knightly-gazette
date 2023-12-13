import { render, screen, waitFor } from '@testing-library/react';
import ArticlePage from '@/pages/article/[id]';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import '@testing-library/jest-dom';

// Enable mock for fetch requests
fetchMock.enableMocks();

// Manually mock the useRouter hook from Next.js
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '123' }, // Mock query parameter for article ID
    };
  },
}));

// Mock window.matchMedia for responsive design and media queries
beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated but included for completeness
    removeListener: jest.fn(), // Deprecated but included for completeness
  }));
});

// Group tests for ArticlePage component
describe('ArticlePage Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
        fetch.resetMocks();
    });

    // Test for fetching and displaying article data
    it('fetches and displays article data', async () => {
        // Mock article data to be returned by the fetch call
        const mockArticle = {
        id: '123',
        imageURL: 'images/test-image.jpg',
        title: 'Test Article',
        body: 'This is a test article body.',
        createdAt: '2023-12-13T00:00:00.000Z',
        };

        // Mock fetch response with the article data
        fetch.mockResponseOnce(JSON.stringify(mockArticle));

        // Render the component
        render(<ArticlePage />);

        // Wait and verify each piece of article data is displayed correctly
        await waitFor(() => {
            // Check if the article title is displayed
            expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
            
            // Check if the article body is displayed
            expect(screen.getByText(mockArticle.body)).toBeInTheDocument();
            
            // Check if the article date is displayed in a formatted manner
            const formattedDate = new Date(mockArticle.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
            
            // Check if the article image is displayed with correct attributes
            const image = screen.getByAltText(mockArticle.title);
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/' + mockArticle.imageURL);
        });          
    });
});