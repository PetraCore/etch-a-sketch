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

function colorize(event) {
    this.style.backgroundColor = 'mediumvioletred';
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
        pixel.style.backgroundColor = 'lightblue';

        pixel.addEventListener('mouseover', colorize);

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

    slider.addEventListener('mouseup', () => {
        const value = slider.value;
        reloadPixels(value);
    });
}

function setupOptions() {
    // const colorPicker = document.querySelector('colorPicker');
    // const rainbowBtn = document.querySelector('rainbow option');
    // const shadowBtn = document.querySelector('shadow option');
    const reloadBtn = document.querySelector('#reload');

    reloadBtn.addEventListener('click', () => {
        reloadPixels();
    });

    // colorPicker.addEventListener('click', () => {
    // });

    // rainbowBtn.addEventListener('click', () => {
    // });

    // shadowBtn.addEventListener('click', () => {
    // });
}

loadPixels();
setupSlider();
setupOptions();