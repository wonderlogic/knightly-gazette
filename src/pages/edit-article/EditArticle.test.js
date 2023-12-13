import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import EditArticle from '@/pages/edit-article/[id]';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

jest.useFakeTimers();

// Mock for window.matchMedia
window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('EditArticle Component', () => {
    const mockRouterPush = jest.fn();
    const mockRouter = {
        push: mockRouterPush,
        query: { id: '123' },
    };

    beforeEach(() => {
        fetch.resetMocks();
        mockRouterPush.mockReset(); // Reset the mockRouterPush between tests
        jest.spyOn(require('next/router'), 'useRouter').mockReturnValue(mockRouter);
    });

    it('renders the form and submits edited data', async () => {
        fetch.mockResponseOnce(JSON.stringify({ id: '123', title: 'Test Title', description: 'Test Description', body: 'Test Body', imageURL: 'test-image.jpg' }));
        
        render(<EditArticle />);

        // Wait for the article to be loaded
        await waitFor(() => {
            expect(screen.getByLabelText('Title:')).toHaveValue('Test Title');
            expect(screen.getByLabelText('Description:')).toHaveValue('Test Description');
            expect(screen.getByLabelText('Body:')).toHaveValue('Test Body');
        });

        // Edit the article
        fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'Updated Title' } });
        fireEvent.change(screen.getByLabelText('Description:'), { target: { value: 'Updated Description' } });
        fireEvent.change(screen.getByLabelText('Body:'), { target: { value: 'Updated Body' } });

        // Mock successful edit response
        fetch.mockResponseOnce(JSON.stringify({ id: '123' }));

        // Wrap interactions leading to state updates in act()
        await act(async () => {
            fireEvent.click(screen.getByText('Edit Article'));
        });

        // Check if fetch was called correctly
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/articles/edit/123', expect.anything());
        });

        // Check for the success toast message
        await waitFor(() => {
            expect(screen.getByText('Article edited successfully!')).toBeInTheDocument();
        });

        // Advance timers by the delay used in the component
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Check for redirection
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/article/123');
        });
    });

    it('handles article deletion', async () => {
        window.confirm = jest.fn().mockImplementation(() => true); // Mock confirmation

        fetch.mockResponseOnce(JSON.stringify({ id: '123', title: 'Test Title', description: 'Test Description', body: 'Test Body', imageURL: 'test-image.jpg' }));
        
        render(<EditArticle />);

        // Wait for the article to be loaded
        await waitFor(() => {
            expect(screen.getByLabelText('Title:')).toHaveValue('Test Title');
        });

        // Mock successful delete response
        fetch.mockResponseOnce(JSON.stringify({}));

        // Wrap interactions leading to state updates in act()
        await act(async () => {
            fireEvent.click(screen.getByText('Delete article'));
        });

        // Check if fetch was called correctly for delete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/articles/delete/123', expect.anything());
        });

        // Check for the success toast message
        await waitFor(() => {
            expect(screen.getByText('Article deleted successfully!')).toBeInTheDocument();
        });

        // Advance timers by the delay used in the component
        act(() => {
            jest.advanceTimersByTime(3000);
        });

        // Check for redirection to home
        await waitFor(() => {
            expect(mockRouterPush).toHaveBeenCalledWith('/');
        });
    });
});