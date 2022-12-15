
window.addEventListener("load", () => {
    minesweeper.init();
});

const minesweeper = { // Avoids polluting the global namespace

    gameTypes: [
        { name: 'small', size: 9, mines: 10 },
        { name: 'medium', size: 16, mines: 40 },
        { name: 'large', size: 24, mines: 150 }
    ],

    // Builds the header
    buildHeader: function () {
        const header = document.createElement('header');

        const divHeader = document.createElement('div');
        header.appendChild(divHeader);
        divHeader.id = 'header-title';

        const heading1 = document.createElement('h1');
        divHeader.appendChild(heading1);
        heading1.innerText = 'Minesweeper';

        const paragraph = document.createElement('p');
        divHeader.appendChild(paragraph);
        paragraph.innerText = 'of Enrique Alejo Subías Melgar';

        return header;
    },

    // Builds the playfield
    buildPlayfield: function () {
        const divPlayfiled = document.createElement('div');
        divPlayfiled.id = 'playfield';

        return divPlayfiled;
    },

    // Builds the buttonbar
    buildButtons: function () {
        const divButtons = document.createElement('div');
        divButtons.id = 'buttons';

        const buttonSmall = this.buildButton('button', 'game-small', 'Small');
        divButtons.appendChild(buttonSmall);

        buttonSmall.addEventListener('click', () => {
            this.newGame("small");
        });

        const buttonMedium = this.buildButton('button', 'game-medium', 'Medium');
        divButtons.appendChild(buttonMedium);

        buttonMedium.addEventListener('click', () => {
            this.newGame('medium');
        });

        const buttonLarge = this.buildButton('button', 'game-large', 'Large');
        divButtons.appendChild(buttonLarge);

        buttonLarge.addEventListener('click', () => {
            this.newGame('large');
        });

        return divButtons;
    },

    // Builds a single button
    buildButton: function (className, id, label) {
        const button = document.createElement('button');
        button.className = className;
        button.innerText = label;

        return button;
    },

    // Builds the footer
    buildFooter: function () {
        const footer = document.createElement('footer');

        const divFooter = document.createElement('div');
        footer.appendChild(divFooter);
        divFooter.id = 'footer-title';

        const paragraph = document.createElement('p');
        divFooter.appendChild(paragraph);
        paragraph.innerHTML = '&copy; 2022 by Enrique Alejo Subías Melgar';

        return footer;
    },

    gameType: function (size) {
        // for each
        for (let game = 0; game < this.gameTypes.length; game++) {
            if (this.gameTypes[game].name === size) {

                this.size = this.gameTypes[game].size;
                this.mines = this.gameTypes[game].mines;

                console.log(this.gameTypes[game].name + ' game type selected')
                console.log(this.gameTypes[game])
            }
        }
        // return this.gameTypes.find((gameType) => gameType.name === size);
    },

    // Starts a new game
    newGame: function (size) {
        this.generatePlayfield(size);

    },

    // Starts a new game and then initializes the playfield with the given size
    generatePlayfield: function (size) {

        this.gameType(size);

        console.log('Generating playfield of size ' + this.size + 'x' + this.size + ' with ' + this.mines + ' mines')

        const playfield = document.querySelector('#playfield'); // Finds the playfield div

        playfield.innerHTML = ''; // Empties the playfield

        // Fills the new playfield with cells
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                playfield.appendChild(this.generateCell(i, j));
            }
        }

    },

    // Generates a single cell
    generateCell: function (row, colunm) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.className += ' covered';

        cell.dataset.x = colunm;
        cell.dataset.y = row;

        const style = `calc((100% / ${this.size}) - (2 * var(--shadowsize)))`;

        cell.style.width = style;
        cell.style.height = style;

        return cell;
    },



    init: function () {
        const body = document.querySelector('body'); // Finds the body element

        // Creates the main content div
        const content = document.createElement('div');
        body.appendChild(content);
        content.className = 'content';

        // header
        const header = this.buildHeader();
        content.appendChild(header);

        // div#playfield
        const divPlayfiled = this.buildPlayfield();
        content.appendChild(divPlayfiled);

        // div#buttonbar
        const divButtons = this.buildButtons();
        content.appendChild(divButtons);

        // footer
        const footer = this.buildFooter();
        content.appendChild(footer);

    }
}
