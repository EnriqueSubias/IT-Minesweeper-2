
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
            this.logic.init(this.size, this.mines)
        });

        const buttonMedium = this.buildButton('button', 'game-medium', 'Medium');
        divButtons.appendChild(buttonMedium);

        buttonMedium.addEventListener('click', () => {
            this.newGame('medium');
            this.logic.init(this.size, this.mines)
        });

        const buttonLarge = this.buildButton('button', 'game-large', 'Large');
        divButtons.appendChild(buttonLarge);

        buttonLarge.addEventListener('click', () => {
            this.newGame('large');
            this.logic.init(this.size, this.mines)
        });

        // // Default game on first load
        this.newGame("small");
        this.logic.init(this.size, this.mines)

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
    },

    // Starts a new game
    newGame: function (size) {
        this.generatePlayfield(size);
        // Left click uncovers a cell
        // Right click flags a cell (doesnt affect game logic because it's just a visual aid)

        // The program handles all clicks in a single callback per click type (Because each cell has data-x and data-y coordinates).

        // Left click and right click have different functions so the program handles them in separate callbacks.
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

        cell.addEventListener('click', (event) => {
            this.cellClick(event);
        });

        cell.addEventListener('contextmenu', (event) => {
            this.cellRightClick(event);
        });


        return cell;
    },

    cellClick: function (event) {
        // console.dir(event);
        const x = event.target.dataset.x;
        const y = event.target.dataset.y;
        event.preventDefault(); // Prevents this trigger from also triggering the right click event

        console.log('Left click on cell ' + x + ',' + y + ' detected');
    },

    cellRightClick: function (event) {
        // console.dir(event);
        const x = event.target.dataset.x;
        const y = event.target.dataset.y;
        event.preventDefault(); // Prevents this trigger from also triggering the right click event

        console.log('Right click on cell ' + x + ',' + y + ' detected');

    },

    init: function () {

        this.logic = localLogic; // Sets the game logic to the local game logic object

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


const localLogic = {
    // Minesweeper local game logic

    init: function (size, numberOfMines) {
        console.log('Local game logic initialized with a size of ' + size + ' x ' + size + ' and ' + numberOfMines + ' mines');

        this.size = size;
        this.numberOfMines = numberOfMines;

    }

    // Make the field where the gama logic stores the mines in


}

