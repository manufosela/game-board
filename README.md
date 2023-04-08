# GameBoard

A LitElement that creates a grid-based game board with customizable dimensions and cells. It renders the grid using CSS grid and populates it with child elements based on their position and size data attributes. The class also has properties for the grid width, height, and number of cells in each direction, which can be set via attributes or in the constructor.

## Usage

```html
<game-board
  grid-cells-x="8"
  grid-cells-y="10"
  grid-width="80vw"
  grid-height="90vh"
></game-board>
```

## Properties

- **gridWidth** (String): The width of the game board. Default value is '100vw'.
- **gridHeight** (String): The height of the game board. Default value is '100vh'.
- **gridCellsX** (String): The number of cells in the horizontal direction of the game board. Default value is '12'.
- **gridCellsY** (String): The number of cells in the vertical direction of the game board. Default value is '12'.

## Methods

- **checkDataAttributes(element)** (boolean): Checks if the given element has the required data attributes.
- **checkElement(x, y, width, height)** (boolean): Checks if the given element params are valid.
- **fixProperties()** (void): Fixes the properties if they are invalid.
- **insertShadowDOMElements()** (void): Inserts child elements into the shadow DOM based on their light DOM child elements.

## CSS Custom Properties

This component does not expose any custom CSS properties.

### Styling

The following custom properties are available for styling this component:

```css
  :host {
    /* CSS Grid styles */
    grid-template-columns: repeat(${this.gridCellsX}, 1fr);
    grid-template-rows: repeat(${this.gridCellsY}, 1fr);

    /* Dimensions of the game board */
    width: ${this.gridWidth};
    height: ${this.gridHeight};
  }
```

## Dependencies

This component depends on the following modules:

**lit**: Lit is a simple library for building fast, lightweight web components.

## License

This component is licensed under the Apache-2.0 License. See LICENSE file for details.
