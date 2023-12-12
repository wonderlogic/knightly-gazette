import { render, screen, fireEvent } from '@testing-library/react';
import SingleArticle from './SingleArticle';
import React from 'react';
import '@testing-library/jest-dom';

describe('SingleArticle Component', () => {
    const mockArticle = {
        id: '1',
        title: 'Test Article',
        body: 'This is a test article.\nIt has multiple paragraphs.',
        date: '2021-01-01',
        image: 'test-image.jpg'
    };

    const originalLocation = window.location;

    beforeAll(() => {
        delete window.location;
        window.location = { href: '' };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    it('renders the article details correctly', () => {
        render(<SingleArticle {...mockArticle} />);
        
        expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
        const bodyElement = screen.getByTestId('article-body');
        expect(bodyElement).toHaveTextContent('This is a test article.');
        expect(bodyElement).toHaveTextContent('It has multiple paragraphs.');
        expect(screen.getByText('January 1, 2021')).toBeInTheDocument();
        expect(screen.getByAltText(mockArticle.title)).toHaveAttribute('src', '/' + mockArticle.image);
    });

    it('navigates correctly on edit button click', () => {
        render(<SingleArticle {...mockArticle} />);

        fireEvent.click(screen.getByText('Edit'));
        expect(window.location.href).toBe(`/edit-article/${mockArticle.id}`);
    });
});