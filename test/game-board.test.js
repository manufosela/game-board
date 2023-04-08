import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../game-board.js';

/*
Code Analysis

Main functionalities:
The GameBoard class is a LitElement that creates a grid-based game board with customizable dimensions and cells. It renders the grid using CSS grid and populates it with child elements based on their position and size data attributes. The class also has properties for the grid width, height, and number of cells in each direction, which can be set via attributes or in the constructor.

Methods:
- constructor(): sets default values for grid properties
- connectedCallback(): populates the grid with child elements based on their data attributes
- render(): returns a LitElement template with CSS grid styles based on the grid properties

Fields:
- gridWidth: string representing the width of the grid
- gridHeight: string representing the height of the grid
- gridCellsX: string representing the number of cells in the x direction of the grid
- gridCellsY: string representing the number of cells in the y direction of the grid
*/

describe('GameBoard_class', () => {
  // Tests that a gameboard instance is created with default values.
  it('test_default_values', async () => {
    const gameBoard = await fixture(html`<game-board></game-board>`);
    expect(gameBoard.gridCellsX).to.equal('12');
    expect(gameBoard.gridCellsY).to.equal('12');
    expect(gameBoard.gridWidth).to.equal('100vw');
    expect(gameBoard.gridHeight).to.equal('100vh');
  });

  // Tests that a gameboard instance is created with custom grid properties.
  it('test_custom_grid', async () => {
    const gameBoard = await fixture(html`
      <game-board
        grid-cells-x="8"
        grid-cells-y="10"
        grid-width="80vw"
        grid-height="90vh"
      ></game-board>
    `);
    expect(gameBoard.gridCellsX).to.equal('8');
    expect(gameBoard.gridCellsY).to.equal('10');
    expect(gameBoard.gridWidth).to.equal('80vw');
    expect(gameBoard.gridHeight).to.equal('90vh');
  });

  // Tests that a gameboard instance is not created with invalid grid properties.
  it('test_invalid_properties', async () => {
    const gameBoard = await fixture(
      html`<game-board grid-cells-x="-1" grid-cells-y="invalid"></game-board>`
    );
    expect(gameBoard.gridCellsX).to.equal('12');
    expect(gameBoard.gridCellsY).to.equal('12');
  });

  // Tests that a gameboard instance is rendered with css grid styles based on the grid properties.
  it('test_grid_styles', async () => {
    const gameBoard = await fixture(
      html`<game-board
        grid-cells-x="3"
        grid-cells-y="3"
        grid-width="300px"
        grid-height="300px"
      ></game-board>`
    );
    expect(gameBoard.shadowRoot.innerHTML).contain(
      'grid-template-columns: repeat(<!---->3, 1fr);'
    );
    expect(gameBoard.shadowRoot.innerHTML).contain(
      'grid-template-rows: repeat(<!---->3, 1fr);'
    );
    expect(gameBoard.shadowRoot.innerHTML).contain('width: <!---->300px;');
    expect(gameBoard.shadowRoot.innerHTML).contain('height: <!---->300px;');
  });

  // Tests that a gameboard instance is not populated with child elements with invalid data attributes.
  it('test_invalid_data_attributes', async () => {
    const gameBoard = await fixture(html` <game-board
      grid-cells-x="3"
      grid-cells-y="3"
    >
      <div data-pos="1,1" data-size="12,12" data-bgcolor="red"></div>
    </game-board>`);
    expect(gameBoard.shadowRoot.innerHTML).not.contain('<div style="');
  });

  // Tests that the grid properties can be changed after the gameboard instance has been created.
  it('test_grid_property_change', async () => {
    const gameBoard = await fixture(html`<game-board></game-board>`);
    gameBoard.gridCellsX = '4';
    gameBoard.gridCellsY = '4';
    gameBoard.gridWidth = '400px';
    gameBoard.gridHeight = '400px';
    await new Promise(resolve => setTimeout(resolve, 500));
    expect(gameBoard.shadowRoot.innerHTML).contain(
      'grid-template-columns: repeat(<!---->4, 1fr);'
    );
    expect(gameBoard.shadowRoot.innerHTML).contain(
      'grid-template-rows: repeat(<!---->4, 1fr);'
    );
    expect(gameBoard.shadowRoot.innerHTML).contain('width: <!---->400px;');
    expect(gameBoard.shadowRoot.innerHTML).contain('height: <!---->400px;');
  });
});
