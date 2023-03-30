import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Testa componente NotFound', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('', () => {
    renderWithRouter(<NotFound />);
    const IMG_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const notFoundImg = screen.getByRole('img');

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', IMG_URL);
  });
});
