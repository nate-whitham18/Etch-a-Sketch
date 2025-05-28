//grid.js
document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector('.grid-container');
    const input = document.getElementById('grid-size');
    const button = document.getElementById('set-grid');
    const resetBtn = document.getElementById('reset-grid');
    let currentColor = '#333';
    let rainbowMode = false;
    let drawOnHover = true;
    let isDrawing = false;

    function getRandomColor() {
        const colors = ['#e74c3c', '#f1c40f', '#27ae60', '#3498db', '#9b59b6', '#e67e22', '#1abc9c', '#fff', '#333'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function shadeCell(cell) {
        if (rainbowMode) {
            cell.style.backgroundColor = getRandomColor();
        } else {
            cell.style.backgroundColor = currentColor;
        }
    }

    function createGrid(size) {
        gridContainer.innerHTML = '';
        gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        for (let i = 0; i < size * size; i++) {
            const cell = document.createElement('div');
            cell.classList.add('grid-item');

            if (drawOnHover) {
                cell.addEventListener('mouseenter', () => shadeCell(cell));
            } else {
                cell.addEventListener('mousedown', (e) => {
                    isDrawing = true;
                    shadeCell(cell);
                });
                cell.addEventListener('mouseenter', () => {
                    if (isDrawing) shadeCell(cell);
                });
            }

            // Prevent drag image
            cell.addEventListener('dragstart', e => e.preventDefault());

            gridContainer.appendChild(cell);
        }
    }

    // Initial grid
    createGrid(16);

    button.addEventListener('click', () => {
        let size = parseInt(input.value);
        if (isNaN(size) || size < 2 || size > 100) {
            alert('Please enter a number between 2 and 100.');
            return;
        }
        createGrid(size);
    });

    // Reset button functionality
    resetBtn.addEventListener('click', () => {
        // Clear all grid cells without recreating the grid or changing mode
        const cells = document.querySelectorAll('.grid-item');
        cells.forEach(cell => {
            cell.style.backgroundColor = '';
        });
    });

    // Drawing mode toggle
    const drawModeToggleBtn = document.getElementById('draw-mode-toggle');
    function updateDrawModeButton() {
        if (drawOnHover) {
            drawModeToggleBtn.textContent = 'Click & Drag Mode';
        } else {
            drawModeToggleBtn.textContent = 'Hover Mode';
        }
    }
    drawModeToggleBtn.addEventListener('click', () => {
        drawOnHover = !drawOnHover;
        updateDrawModeButton();

        // Update event listeners on existing cells without recreating the grid
        const cells = document.querySelectorAll('.grid-item');
        cells.forEach(cell => {
            // Remove all previous listeners by cloning the node
            const newCell = cell.cloneNode(true);
            cell.parentNode.replaceChild(newCell, cell);

            if (drawOnHover) {
                newCell.addEventListener('mouseenter', () => shadeCell(newCell));
            } else {
                newCell.addEventListener('mousedown', () => {
                    isDrawing = true;
                    shadeCell(newCell);
                });
                newCell.addEventListener('mouseenter', () => {
                    if (isDrawing) shadeCell(newCell);
                });
            }
            newCell.addEventListener('dragstart', e => e.preventDefault());
        });
    });
    updateDrawModeButton();

    // Mouse up event for click+drag mode
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    // Theme toggle logic
    const toggleThemeBtn = document.getElementById('toggle-theme');
    function updateThemeButton() {
        if (document.body.classList.contains('dark-mode')) {
            toggleThemeBtn.textContent = 'Toggle to Light Mode';
        } else {
            toggleThemeBtn.textContent = 'Toggle to Dark Mode';
        }
    }
    toggleThemeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        updateThemeButton();
    });
    updateThemeButton();

    // Color selector logic
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            if (btn.getAttribute('data-color') === 'rainbow') {
                rainbowMode = true;
            } else {
                rainbowMode = false;
                currentColor = btn.getAttribute('data-color');
            }
        });
    });
    // Set default selected color
    if (colorBtns.length) colorBtns[0].classList.add('selected');
});