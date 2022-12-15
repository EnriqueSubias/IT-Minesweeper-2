
window.addEventListener("load", () => {
    minesweeper.init();
});

const minesweeper = { // Avoids polluting the global namespace

    // Creates the header
    createHeader: function () {
        const header = document.createElement('header');
        
        const divHeaderTitle = document.createElement('div');
        divHeaderTitle.id = 'header-title';

        const h1 = document.createElement('h1');
        h1.textContent = 'Minesweeper';

        const p = document.createElement('p');
        p.textContent = 'of Enrique Alejo Subías Melgar';

        divHeaderTitle.appendChild(h1);
        divHeaderTitle.appendChild(p);

        header.appendChild(divHeaderTitle);

        return header;
    },

    // Creates the playfield
    createPlayfield: function () {
        const divPlayfiled = document.createElement('div');
        divPlayfiled.id = 'playfield';
        return divPlayfiled;
    },

    // Creates the buttonbar
    createButtons: function () {
        const divButtons = document.createElement('div');
        divButtons.id = 'buttons';
        return divButtons;
    },

    // Creates the footer
    createFooter: function () {
        const footer = document.createElement('footer');
        return footer;
    },

    init: function () {
        console.log('HTML page is fully loaded');
        // alert('HTML page is fully loaded');

        const body = document.querySelector('body'); // Finds the body element

        // Creates a div element with class="content"
        const content = document.createElement('div');
        content.className = 'content';
        body.appendChild(content);

        // header
        const header = this.createHeader();

        // div#playfield
        const divPlayfiled = this.createPlayfield();

        // div#buttonbar
        const divButtons = this.createButtons();

        // footer
        const footer = this.createFooter();

        content.appendChild(header);
        content.appendChild(divPlayfiled);
        content.appendChild(divButtons);
        content.appendChild(footer);
    }
}
