import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Teste o Componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', {
      level: 2,
      name: /Encountered Pokémon/i,
    });
    expect(pokedexTitle).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    pokemonList.forEach(({ name }) => {
      const pokemon = screen.getByText(name);
      expect(pokemon).toBeInTheDocument();
      userEvent.click(nextBtn);
    });

    const firstPokemon = screen.getByText(/pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const checkLenght = screen.getAllByRole('img');

    expect(checkLenght).toHaveLength(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterPokemon = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    const filterBtn = screen.getAllByTestId('pokemon-type-button');

    expect(filterPokemon.length).toEqual(filterBtn.length);
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', {
      name: /all/i,
    });
    expect(allBtn).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const bugType = screen.getByRole('button', { name: /bug/i });

    userEvent.click(bugType);
    expect(pokemonType).toHaveTextContent('Fire');

    userEvent.click(allBtn);
    expect(pokemonType).toHaveTextContent('Electric');
  });
});
