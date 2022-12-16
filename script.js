
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

        this.logic.sweep(x, y);
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

    sweep: function (x, y) {
        // This function sweeps the field for mines
        // It returns the number of mines in the surrounding cells
        // It also returns the number of covered cells in the surrounding cells
        // It also returns the number of flagged cells in the surrounding cells
        // This function is called when a cell is uncovered

        console.log(this.movesCounter + ' moves made');

        if (this.movesCounter === 0) {
            this.placeMines(x, y);
        }


        // if (this.firstClick) {
        //     this.firstClick = false;
        //     this.initMines(x, y);
        // }

        this.movesCounter++;
    },

    placeMines: function (x, y) {
        // This function places the mines on the field
        // It takes the coordinates of the first click as parameters
        // It places the mines in a way that the first click is always safe

        // Infinite loop that breaks when all mines are placed
        this.minesLeft = this.numberOfMines;
        while (true) {
            const tryX = Math.floor(Math.random() * this.size);
            const tryY = Math.floor(Math.random() * this.size);

            if (tryX === x && tryY === y) {
                continue; // If the coordinates are the same as the first click, try again
            }

            if (this.field[tryX][tryY] === true) {
                continue; // If there is already a mine there, try again
            }

            this.field[tryX][tryY] = true; // Place a mine
            this.minesLeft--; // Decrease the number of mines left

            if (this.minesLeft === 0) {
                break; // If all mines are placed, break the loop
            }
        }

        
        
        // // Loop through the mines
        // for (let i = 0; i < this.numberOfMines; i++) {
        //     // Generate random coordinates
        //     let randomX = Math.floor(Math.random() * this.size);
        //     let randomY = Math.floor(Math.random() * this.size);

        //     // Check if the coordinates are the same as the first click
        //     if (randomX === x && randomY === y) {
        //         // If they are, generate new coordinates
        //         randomX = Math.floor(Math.random() * this.size);
        //         randomY = Math.floor(Math.random() * this.size);
        //     }

        //     // Check if the coordinates are already occupied
        //     if (this.field[randomX][randomY] === true) {
        //         // If they are, generate new coordinates
        //         randomX = Math.floor(Math.random() * this.size);
        //         randomY = Math.floor(Math.random() * this.size);
        //     }

        //     // Place the mine
        //     this.field[randomX][randomY] = true;
        // }

        console.dir(this.field);

    },

    init: function (size, numberOfMines) {
        console.log('Local game logic initialized with a size of ' + size + ' x ' + size + ' and ' + numberOfMines + ' mines');

        this.size = size;
        this.numberOfMines = numberOfMines;

        // This field is where the game logic object stores the mines in:
        this.field = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.field[i] = new Array(this.size);
            for (let j = 0; j < this.size; j++) {
                this.field[i][j] = false; // False means no mine
            }
        }

        console.dir(this.field);

        // Delay the initialization of the mines until the first click

        // Initialize the move counter
        this.movesCounter = 0;
    }
}
