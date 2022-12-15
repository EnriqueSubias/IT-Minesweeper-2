const minesweeper = { // Avoids polluting the global namespace
    init: function () {
        console.log('HTML page is fully loaded');
        alert('HTML page is fully loaded');
    }
}

// window.addEventListener("load", minesweeper.init);
console.log('HTML page is still loading');

window.onload = (event) => {
    minesweeper.init();
};
// window.onerror

// TODO: Add different functions for header, playfield, buttons and footer

const body = document.querySelector('body');

const header = document.createElement('header');

const divPlayfiled = document.createElement('div');
divPlayfiled.id = 'playfield';

const divButtons = document.createElement('div');
divButtons.id = 'buttons';

const footer = document.createElement('footer');

body.appendChild(header);
body.appendChild(divPlayfiled);
body.appendChild(divButtons);
body.appendChild(footer);
