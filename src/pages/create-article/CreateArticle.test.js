import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import CreateArticle from '@/pages/create-article/index';
import fetchMock from 'jest-fetch-mock';
import React from 'react';
import '@testing-library/jest-dom';

// Enable mock for fetch requests
fetchMock.enableMocks();

// Manually mock the useRouter hook from Next.js
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Use fake timers for controlling setTimeout and other timer-based functions
jest.useFakeTimers();

// Mock window.matchMedia for responsive design and media queries
beforeAll(() => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
    }));
});

// Group tests for CreateArticle component
describe('CreateArticle Component', () => {
    // Reset mocks before each test
    beforeEach(() => {
        fetch.resetMocks();
    });

    // Test for rendering the form correctly
    it('renders the form correctly', () => {
        // Render the component
        render(<CreateArticle />);

        // Verify if all form fields and the submit button are rendered
        expect(screen.getByLabelText('Title:')).toBeInTheDocument();
        expect(screen.getByLabelText('Description:')).toBeInTheDocument();
        expect(screen.getByLabelText('Body:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Create Article' })).toBeInTheDocument();
    });

    // Test for submitting the form correctly
    it('submits the form correctly', async () => {
        // Mock response data for the created article
        const mockResponseData = { id: '123' };
        fetch.mockResponseOnce(JSON.stringify(mockResponseData));

        // Mock the useRouter function for redirection
        const mockRouterPush = jest.fn();
        jest.spyOn(require('next/router'), 'useRouter').mockImplementation(() => ({
            push: mockRouterPush,
        }));

        // Render the component
        render(<CreateArticle />);
        
        // Simulate user input for creating an article
        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Test Title' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Test Description' } });
        fireEvent.change(screen.getByLabelText('Body:'), { target: { value: 'Test Body' } });

        // Perform click action in an act block to ensure state updates are flushed
        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Create Article' }));
        });

        // Verify if the fetch call is made correctly
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
            expect(fetch).toHaveBeenCalledWith('/api/articles', expect.objectContaining({
                method: 'POST',
                body: expect.any(FormData)
            }));
        });

        // Confirm the display of the success toast message
        await screen.findByText('Article created successfully!');

        // Simulate delay for redirection
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Check for redirection after successful article creation
        expect(mockRouterPush).toHaveBeenCalledWith(`/article/${mockResponseData.id}`);
    });
});