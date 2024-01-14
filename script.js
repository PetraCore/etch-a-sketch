function verifyResolution(resolution) {
    let resNum = Number(resolution);
    if (isNaN(resNum)) {
        return 16;
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

let mode = 'colorize';
let brushColor = 'black';

function drawPixel(event) {
    if (!arePixelsInteractive) {
        return;
    }

    const pixel = event.currentTarget;

    switch(mode) {
        case 'colorize':
            pixel.style.backgroundColor = brushColor;
        break;
        case 'rainbow':
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            pixel.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        break;
        case 'darken':
            pixel.style.backgroundColor = 'black';
        break;
    }
}

function loadPixels(resolution = 16) {
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
        pixel.style.backgroundColor = 'white';
        pixel.style.userSelect = 'none';

        pixel.addEventListener('mousedown', activatePixels);
        window.addEventListener('mouseup', deactivatePixels);
        pixel.addEventListener('mouseover', drawPixel);

        gridbox.appendChild(pixel);
    }
}

function reloadPixels(resolution = 16) {
    const gridbox = document.querySelector('.gridbox');
    while (gridbox.firstChild) {
        gridbox.removeChild(gridbox.firstChild);
    }
    loadPixels(resolution);
}

function setupSlider() {
    const slider = document.querySelector('#dimensionSlider');
    const info = document.querySelector('#dimensionInfo');

    slider.addEventListener('input', () => {
        const value = slider.value;
        info.textContent = `${value} x ${value}`; 
    });

    slider.addEventListener('click', () => {
        const value = slider.value;
        reloadPixels(value);
    });
}

function setupOptions() {
    const colorPicker = document.querySelector('#colorPicker');
    const colorBtn = document.querySelector('.colorBtn');
    const rainbowBtn = document.querySelector('.rainbow');
    const darkenBtn = document.querySelector('.darken');
    const reloadBtn = document.querySelector('#reload');

    reloadBtn.addEventListener('click', () => {
        reloadPixels(document.querySelector('#dimensionSlider').value);
    });

    colorPicker.addEventListener('click', () => {
        mode = 'colorize';
    });

    colorPicker.addEventListener('blur', () => {
        brushColor = colorPicker.value;
    })

    colorPicker.addEventListener('input', () => {
        colorBtn.style.backgroundColor = colorPicker.value;
    })

    rainbowBtn.addEventListener('click', () => {
        mode = 'rainbow';
    });

    darkenBtn.addEventListener('click', () => {
        mode = 'darken';
    });
}

loadPixels();
setupSlider();
setupOptions();