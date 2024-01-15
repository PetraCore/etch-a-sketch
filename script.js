const DEFAULT_PIXEL_COLOR = '#FFFFFF';
const DEFAULT_CANVAS_RESOLUTION = 16;
const DEFAULT_BRUSH_COLOR = '#4CABE6';
const DEFAULT_BRUSH_MODE = 'colorize';

function verifyResolution(resolution) {
    let resNum = Number(resolution);
    if (isNaN(resNum)) {
        return DEFAULT_CANVAS_RESOLUTION;
    }

    resNum = Math.abs(resolution);
    if (resolution > 100) {
        return 100;
    }
    if (resolution < 1) {
        return 1;
    }

    return resNum;
}

let arePixelsInteractive = false;

function activatePixels(event) {
    arePixelsInteractive = true;
    drawPixel(event);
}

function deactivatePixels() {
    arePixelsInteractive = false;
}

let brushMode = DEFAULT_BRUSH_MODE;  
let brushColor = DEFAULT_BRUSH_COLOR;

function drawPixel(event) {
    if (!arePixelsInteractive) {
        return;
    }

    const pixel = event.currentTarget;

    switch(brushMode) {
        case 'colorize': {
            pixel.style.backgroundColor = brushColor;
            break;
        }
        case 'rainbow': {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            break;
        }
        case 'darken': {
            let rgbColors = pixel.style.backgroundColor.match(/\d+/g);
            rgbColors = rgbColors.map(colorValue => {
                colorValue = Number(colorValue);
                return colorValue - 15; 
            });
            pixel.style.backgroundColor = `rgb(${rgbColors.toString(', ')})`;
            break;
        }
    }
}

function loadPixels(resolution = DEFAULT_CANVAS_RESOLUTION) {
    resolution = verifyResolution(resolution);
    const gridbox = document.querySelector('.gridbox');
    const pxWidth = gridbox.clientWidth / resolution;
    const pxHeight = gridbox.clientHeight / resolution;
    const amount = resolution ** 2;

    console.log({pxWidth, pxHeight, amount});

    for (let i = 0; i < amount; i++) {
        const pixel = document.createElement('div');
        pixel.style.width = `${pxWidth}px`;
        pixel.style.height = `${pxHeight}px`;
        pixel.style.backgroundColor = DEFAULT_PIXEL_COLOR; 
        pixel.style.userSelect = 'none';

        pixel.addEventListener('mousedown', activatePixels);
        window.addEventListener('mouseup', deactivatePixels);
        pixel.addEventListener('mouseover', drawPixel);

        gridbox.appendChild(pixel);
    }
}

function reloadPixels(resolution = DEFAULT_CANVAS_RESOLUTION) {
    const gridbox = document.querySelector('.gridbox');
    while (gridbox.firstChild) {
        gridbox.removeChild(gridbox.firstChild);
    }
    loadPixels(resolution);
}

function setupSlider() {
    const slider = document.querySelector('#dimensionSlider');
    const info = document.querySelector('#dimensionInfo');

    slider.value = DEFAULT_CANVAS_RESOLUTION;
    info.textContent = `${DEFAULT_CANVAS_RESOLUTION} x ${DEFAULT_CANVAS_RESOLUTION}`;

    slider.addEventListener('input', () => {
        const value = slider.value;
        info.textContent = `${value} x ${value}`; 
    });

    slider.addEventListener('click', () => {
        const value = slider.value;
        reloadPixels(value);
    });
}

function highlightOption(event) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('highlight');
    });
    const option = event.target;
    option.classList.add('highlight');
}

function setupOptions() {
    const colorPicker = document.querySelector('#colorPicker');
    const colorBtn = document.querySelector('.colorBtn');
    const rainbowBtn = document.querySelector('.rainbowBtn');
    const darkenBtn = document.querySelector('.darkenBtn');
    const reloadBtn = document.querySelector('#reload');

    colorBtn.style.backgroundColor = DEFAULT_BRUSH_COLOR;

    reloadBtn.addEventListener('click', () => {
        reloadPixels(document.querySelector('#dimensionSlider').value);
    });

    colorBtn.addEventListener('click', (event) => {
        highlightOption(event);
        brushMode = 'colorize';
    });

    colorPicker.addEventListener('blur', () => {
        brushColor = colorPicker.value;
    })

    colorPicker.addEventListener('input', () => {
        colorBtn.style.backgroundColor = colorPicker.value;
    })

    rainbowBtn.addEventListener('click', (event) => {
        highlightOption(event);
        brushMode = 'rainbow';
    });

    darkenBtn.addEventListener('click', (event) => {
        highlightOption(event);
        brushMode = 'darken';
    });
}

function setupWebpage() {
    loadPixels();
    setupSlider();
    setupOptions();
}

setupWebpage();