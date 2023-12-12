import { render, screen, fireEvent } from '@testing-library/react';
import NewsCard from './NewsCard';
import React from 'react';
import '@testing-library/jest-dom';

describe('NewsCard Component', () => {
    const mockId = '123';
    const mockTitle = 'Test Title';
    const mockDescription = 'Test Description';
    const mockImage = 'test-image.jpg';
    const originalLocation = window.location;

    beforeAll(() => {
        delete window.location;
        window.location = { href: '' };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    it('renders correctly with an image', () => {
        render(<NewsCard id={mockId} image={mockImage} title={mockTitle} description={mockDescription} />);

        expect(screen.getByAltText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    it('renders correctly without an image', () => {
        render(<NewsCard id={mockId} title={mockTitle} description={mockDescription} />);

        expect(screen.queryByAltText(mockTitle)).not.toBeInTheDocument();
        expect(screen.getByText(mockTitle)).toBeInTheDocument();
        expect(screen.getByText(mockDescription)).toBeInTheDocument();
    });

    it('navigates correctly on button clicks', () => {
        render(<NewsCard id={mockId} title={mockTitle} description={mockDescription} />);

        fireEvent.click(screen.getByText('Edit'));
        expect(window.location.href).toBe(`/edit-article/${mockId}`);

        fireEvent.click(screen.getByText('Read More'));
        expect(window.location.href).toBe(`/article/${mockId}`);
    });
});