import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import EditArticle from '@/pages/edit-article/[id]';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

// Enable mocks for fetch requests
fetchMock.enableMocks();

// Mock the useRouter hook from Next.js
jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

// Use fake timers for controlling setTimeout and other timer-based functions
jest.useFakeTimers();

// Mock for window.matchMedia (used for responsive design and media queries)
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

// Group tests for EditArticle component
describe('EditArticle Component', () => {
    // Mock variables for router functions and query parameters
    const mockRouterPush = jest.fn();
    const mockRouter = {
        push: mockRouterPush,
        query: { id: '123' }, // Simulate an ID passed via query
    };

    // Reset mocks and spies before each test
    beforeEach(() => {
        fetch.resetMocks();
        mockRouterPush.mockReset(); // Reset the mockRouterPush between tests
        jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(mockRouter);
    });

    // Test for rendering and submitting edited data
    it('renders the form and submits edited data', async () => {
        // Mock fetch response for loading the article
        fetch.mockResponseOnce(JSON.stringify({ id: '123', title: 'Test Title', description: 'Test Description', body: 'Test Body', imageURL: 'test-image.jpg' }));

        // Render the component
        render(<EditArticle />);

        // Verify if the article is loaded correctly
        await waitFor(() => {
            expect(screen.getByLabelText('Title:')).toHaveValue('Test Title');
            expect(screen.getByLabelText('Description:')).toHaveValue('Test Description');
            expect(screen.getByLabelText('Body:')).toHaveValue('Test Body');
        });

        // Simulate user input for editing the article
        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Updated Title' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Updated Description' } });
        fireEvent.change(screen.getByLabelText('Body:'), { target: { value: 'Updated Body' } });

        // Mock response for successful article edit
        fetch.mockResponseOnce(JSON.stringify({ id: '123' }));

        // Perform click action in an act block to ensure state updates are flushed
        await act(async () => {
            fireEvent.click(screen.getByText('Edit Article'));
        });

        // Verify if the fetch call is made correctly
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/articles/edit/123', expect.anything());
        });

        // Verify the display of success toast message
        await waitFor(() => {
            expect(screen.getByText('Article edited successfully!')).toBeInTheDocument();
        });

        // Simulate delay for redirection
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Verify redirection after successful edit
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/article/123');
        });
    });

    // Test for handling article deletion
    it('handles article deletion', async () => {
        // Mock user confirmation for deletion
        window.confirm = jest.fn().mockImplementation(() => true);

        // Mock fetch response for loading the article
        fetch.mockResponseOnce(JSON.stringify({ id: '123', title: 'Test Title', description: 'Test Description', body: 'Test Body', imageURL: 'images/test-image.jpg' }));
        
        // Render the component
        render(<EditArticle />);

        // Verify if the article is loaded correctly
        await waitFor(() => {
            expect(screen.getByLabelText('Title:')).toHaveValue('Test Title');
        });

        // Mock response for successful article deletion
        fetch.mockResponseOnce(JSON.stringify({}));

        // Perform click action for deletion in an act block
        await act(async () => {
            fireEvent.click(screen.getByText('Delete article'));
        });

        // Verify if the fetch call for delete is made correctly
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/articles/delete/123', expect.anything());
        });

        // Verify the display of success toast message for deletion
        await waitFor(() => {
            expect(screen.getByText('Article deleted successfully!')).toBeInTheDocument();
        });

        // Simulate delay for redirection to home after deletion
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Verify redirection to home after deletion
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/');
        });
    });
});