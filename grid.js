//grid.js
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector('.grid-container');

    for (let i = 0; i < 256; i++) {
        const div = document.createElement('div');
        div.className = 'grid-item';

        div.addEventListener('mouseenter', () => {
            div.style.backgroundColor = '#333'; // change to desired color
          });
          
        gridContainer.appendChild(div);   
    }
});