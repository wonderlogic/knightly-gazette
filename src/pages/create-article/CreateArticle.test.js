import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/router';
import CreateArticle from '@/pages/create-article/index';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

// Mock the entire Next.js router module
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    }));
});

describe('CreateArticle Component', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('renders the form correctly', () => {
        render(<CreateArticle />);

        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        expect(screen.getByLabelText('Description:')).toBeInTheDocument();
        expect(screen.getByLabelText('Body:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Article' })).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        const mockResponseData = { id: '123' };
        fetch.mockResponseOnce(JSON.stringify(mockResponseData));

        const mockRouterPush = jest.fn();
        jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
            push: mockRouterPush,
        }));

        render(<CreateArticle />);
        
        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText('Body:'), { target: { value: 'Test Body' } });
        
        fireEvent.click(screen.getByText('Create Article'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('/api/articles', expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData)
            }));
        });
        
        // Check for the success toast message
        expect(screen.getByText('Article created successfully!')).toBeInTheDocument();
        
        // Check for redirection after form submission
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith(`/article/${mockResponseData.id}`);
        });
    });      
});