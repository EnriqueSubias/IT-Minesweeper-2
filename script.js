
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

        const buttonMedium = this.buildButton('button', 'game-medium', 'Medium');
        divButtons.appendChild(buttonMedium);

        const buttonLarge = this.buildButton('button', 'game-large', 'Large');
        divButtons.appendChild(buttonLarge);

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


    // Starts a new game and then initializes the playfield with the given size
    generatePlayfield: function (size) {

        // small: 9x9, 10 mines
        // medium: 16x16, 40 mines
        // large: 24x24, 150 mines

        // The playfield will be reused:
        // - find it
        // - empty it
        // - fill it

        const playfield = document.querySelector('#playfield'); // Finds the playfield div

        playfield.innerHTML = ''; // Removes all children from the playfield

        // Fillthe playfield with cells with 2 nested loops
        
        size = 9;

        // Creates a new playfield
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
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



        // Method that fills the playfield and brings an argument that is the size of the playfield
        this.generatePlayfield('small');


    }
}
