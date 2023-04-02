import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const pikachuType = screen.getByTestId('pokemon-type');
    expect(pikachuType).toHaveTextContent(/Electric/i);

    const pikachuAtribute = screen.getByText(/Average weight: 6.0 kg/i);
    expect(pikachuAtribute).toBeInTheDocument();

    const pikachuImg = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(pikachuImg).toBeInTheDocument();
    expect(pikachuImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    userEvent.click(screen.getByRole('link', {
      name: /more details/i,
    }));

    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /More details/i });

    userEvent.click(detailsLink);

    const checkboxBtn = screen.getByRole('checkbox', { name: /Pokémon favoritado/i });

    userEvent.click(checkboxBtn);

    const favoriteBtn = screen.getByAltText('Pikachu is marked as favorite');

    expect(favoriteBtn).toBeInTheDocument();
    expect(favoriteBtn).toHaveAttribute('src', '/star-icon.svg');
  });
});
