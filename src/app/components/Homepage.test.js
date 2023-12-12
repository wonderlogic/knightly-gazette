import { render, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Homepage from './Homepage';
import React from 'react';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

describe('Homepage Component', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it('fetches and displays articles', async () => {
      const mockArticles = [
        { id: 1, imageURL: 'url1', title: 'Article 1', description: 'Description 1' },
        { id: 2, imageURL: 'url2', title: 'Article 2', description: 'Description 2' }
      ];

      fetch.mockResponseOnce(JSON.stringify(mockArticles));

      const { getByText } = render(<Homepage />);

      // Wait for the articles to be fetched and rendered
      await waitFor(() => {
        mockArticles.forEach(article => {
          expect(getByText(article.title)).toBeInTheDocument();
          expect(getByText(article.description)).toBeInTheDocument();
        });
      });
    });
});