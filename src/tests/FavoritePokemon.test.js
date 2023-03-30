import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

describe('Testa Componente Favorite Pokemon', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ [] } />);

    const favoriteText = screen.getByText(/No favorite pokémon found/i);

    expect(favoriteText).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const favPokemon = [pokemonList[0]];
    renderWithRouter(<FavoritePokemon pokemonList={ favPokemon } />);

    const favScreen = screen.getByRole('img', {
      name: 'Pikachu is marked as favorite',
    });

    expect(favScreen).toBeInTheDocument();
  });
});
