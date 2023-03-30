import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

const URL_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Teste o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutTitle).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const aboutText1 = screen.getByText(/This application simulates a Pokédex, a digital encyclopedia containing all Pokémon/i);

    const aboutText2 = screen.getByText(/One can filter Pokémon by type, and see more details for each one of them/i);

    expect(aboutText1).toBeInTheDocument();
    expect(aboutText2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const imgAbout = screen.getByRole('img');

    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', URL_IMG);
  });
});
