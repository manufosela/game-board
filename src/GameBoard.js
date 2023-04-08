import { html, LitElement } from 'lit';
import { gameBoardStyles } from './game-board-styles.js';

/**
 * @class GameBoard
 * @extends {LitElement}
 * @description A LitElement that creates a grid-based game board with customizable dimensions and cells. It renders the grid using CSS grid and populates it with child elements based on their position and size data attributes. The class also has properties for the grid width, height, and number of cells in each direction, which can be set via attributes or in the constructor.
 * @example
 * <game-board grid-cells-x="8" grid-cells-y="10" grid-width="80vw" grid-height="90vh"></game-board>
 */
export class GameBoard extends LitElement {
  /**
   * @returns {import('lit').CSSResult}
   */
  static get styles() {
    return [gameBoardStyles];
  }

  /**
   * @returns {import('lit').PropertyDeclarations}
   */
  static get properties() {
    return {
      gridWidth: { type: String, reflect: true, attribute: 'grid-width' },
      gridHeight: { type: String, reflect: true, attribute: 'grid-height' },
      gridCellsX: { type: String, reflect: true, attribute: 'grid-cells-x' },
      gridCellsY: { type: String, reflect: true, attribute: 'grid-cells-y' },
    };
  }

  /**
   * @returns {void}
   * @memberof GameBoard
   */
  constructor() {
    super();
    this.gridCellsX = '12';
    this.gridCellsY = '12';
    this.gridWidth = '100vw';
    this.gridHeight = '100vh';
  }

  /**
   * @returns {void}
   * @memberof GameBoard
   */
  connectedCallback() {
    super.connectedCallback();
    this.fixProperties();
    this.insertShadowDOMElements();
  }

  /**
   * @param {Map<string, any>} changedProperties
   * @returns {void}
   * @memberof GameBoard
   * @description Called when properties are updated
   * @override
   * @protected
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if (propName === 'gridCellsX' || propName === 'gridCellsY') {
        this.fixProperties();
      }
    });
  }

  /**
   * @returns {void}
   * @memberof GameBoard
   * @description Insert child elements into the shadow DOM based on their light DOM child elements
   * @protected
   */
  insertShadowDOMElements() {
    const lightDom = [...this.querySelectorAll('game-board  > *')];
    lightDom.forEach(_element => {
      if (_element.tagName === 'STYLE') {
        this.shadowRoot.appendChild(_element);
      } else {
        const element = _element.cloneNode(true);
        if (GameBoard.checkDataAttributes(element)) {
          const { pos, size, bgcolor } = element.dataset;
          const [x, y] = pos.split(',');
          const [width, height] = size.split(',');
          if (this.checkElement(x, y, width, height, bgcolor)) {
            element.style.gridColumnStart = parseInt(x, 10);
            element.style.gridColumnEnd = parseInt(x, 10) + parseInt(width, 10);
            element.style.gridRowStart = parseInt(y, 10);
            element.style.gridRowEnd = parseInt(y, 10) + parseInt(height, 10);
            element.style.backgroundColor = bgcolor;
            this.shadowRoot.appendChild(element);
          } else {
            // eslint-disable-next-line no-console
            console.log('Invalid data attributes on element: ', element);
          }
        } else {
          // eslint-disable-next-line no-console
          console.log('Missing data attributes on element: ', element);
        }
      }
    });
  }

  /**
   * @returns {void}
   * @memberof GameBoard
   * @description Fixes the properties if they are invalid
   * @protected
   */
  fixProperties() {
    if (
      parseInt(this.gridCellsX, 10) < 1 ||
      Number.isNaN(parseInt(this.gridCellsX, 10))
    ) {
      this.gridCellsX = '12';
    }
    if (
      parseInt(this.gridCellsY, 10) < 1 ||
      Number.isNaN(parseInt(this.gridCellsY, 10))
    ) {
      this.gridCellsY = '12';
    }
  }

  /**
   * @param {string} x
   * @param {string} y
   * @param {string} width
   * @param {string} height
   * @returns {boolean}
   * @memberof GameBoard
   * @private
   * @description Checks if the element params is valid
   */
  checkElement(x, y, width, height) {
    if (
      x === undefined ||
      y === undefined ||
      width === undefined ||
      height === undefined
    ) {
      return false;
    }
    if (
      Number.isNaN(parseInt(x, 10)) ||
      Number.isNaN(parseInt(y, 10)) ||
      Number.isNaN(parseInt(width, 10)) ||
      Number.isNaN(parseInt(height, 10))
    ) {
      return false;
    }
    if (
      parseInt(x, 10) < 1 ||
      parseInt(y, 10) < 1 ||
      parseInt(width, 10) < 1 ||
      parseInt(height, 10) < 1
    ) {
      return false;
    }
    if (
      parseInt(x, 10) > parseInt(this.gridCellsX, 10) ||
      parseInt(y, 10) > parseInt(this.gridCellsY, 10)
    ) {
      return false;
    }
    if (
      parseInt(x, 10) + parseInt(width, 10) >
        parseInt(this.gridCellsX, 10) + 1 ||
      parseInt(y, 10) + parseInt(height, 10) > parseInt(this.gridCellsY, 10) + 1
    ) {
      return false;
    }
    return true;
  }

  /**
   * @param {HTMLElement} element
   * @returns {boolean}
   * @memberof GameBoard
   * @static
   * @description Checks if the element has the required data attributes
   */
  static checkDataAttributes(element) {
    if (element.dataset.pos === undefined) {
      return false;
    }
    if (element.dataset.size === undefined) {
      return false;
    }
    return true;
  }

  /**
   * @returns {import('lit').TemplateResult}
   */
  render() {
    return html`
      <style>
        :host {
          grid-template-columns: repeat(${this.gridCellsX}, 1fr);
          grid-template-rows: repeat(${this.gridCellsY}, 1fr);
          width: ${this.gridWidth};
          height: ${this.gridHeight};
        }
      </style>
    `;
  }
}
