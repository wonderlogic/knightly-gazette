import { render, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Homepage from './Homepage';
import React from 'react';
import '@testing-library/jest-dom';

// Enable fetch mocking
fetchMock.enableMocks();

// Group tests for Homepage component
describe('Homepage Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
      fetch.resetMocks();
    });

    // Test to check if articles are fetched and displayed
    it('fetches and displays articles', async () => {
      // Mock article data
      const mockArticles = [
        { id: 1, imageURL: 'url1', title: 'Article 1', description: 'Description 1' },
        { id: 2, imageURL: 'url2', title: 'Article 2', description: 'Description 2' }
      ];

      // Mock fetch response
      fetch.mockResponseOnce(JSON.stringify(mockArticles));

      // Render the component
      render(<Homepage />);

      // Wait for articles to be fetched and verify if they are displayed
      await waitFor(() => {
        mockArticles.forEach(article => {
          expect(screen.getByText(article.title)).toBeInTheDocument();
          expect(screen.getByText(article.description)).toBeInTheDocument();
        });
      });
    });
});