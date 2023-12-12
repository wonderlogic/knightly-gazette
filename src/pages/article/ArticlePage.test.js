import { render, screen, waitFor } from '@testing-library/react';
import ArticlePage from '@/pages/article/[id]';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      query: { id: '123' },
    };
  },
}));

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated but included for completeness
    removeListener: jest.fn(), // Deprecated but included for completeness
  }));
});

describe('ArticlePage Component', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('fetches and displays article data', async () => {
        const mockArticle = {
        id: '123',
        imageURL: 'test-image.jpg',
        title: 'Test Article',
        body: 'This is a test article body.',
        createdAt: '2021-01-01T00:00:00.000Z',
        };

        fetch.mockResponseOnce(JSON.stringify(mockArticle));

        render(<ArticlePage />);

        await waitFor(() => {
            // Check if the article title is displayed
            expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
            
            // Check if the article body is displayed
            expect(screen.getByText(mockArticle.body)).toBeInTheDocument();
            
            // Check if the article date is displayed
            const formattedDate = new Date(mockArticle.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
            expect(screen.getByText(formattedDate)).toBeInTheDocument();
            
            // Check if the article image is displayed
            const image = screen.getByAltText(mockArticle.title);
            expect(image).toBeInTheDocument();
            expect(image).toHaveAttribute('src', '/' + mockArticle.imageURL);
        });          
    });
});