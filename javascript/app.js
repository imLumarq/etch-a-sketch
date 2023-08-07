const container = document.querySelector(".container");
const gridItems = document.getElementsByClassName("grid-item");

let color = document.getElementById("color");
const defaultColor = "#c7e6ff";

const randomColor = document.getElementById("random-color");
const erase = document.getElementById("erase");
const clearAll = document.getElementById("clear-all");

const gridSizeLabel = document.getElementById("grid-size-label");
const gridSize = document.getElementById("grid-size");

window.onload = myMain;

/*....................Default grid, grid size number and different button clicks on sketch....................*/

let isMouseDown = false;
function myMain() {
    color = color.value;
    gridSizeLabel.textContent = `${gridSize.value} x ${gridSize.value}`;

    for (let i = 1; i <= 256; i++) {
        const gridItem = document.createElement("button");
        gridItem.classList.add("grid-item");
        container.appendChild(gridItem);
    }

    container.style.gridTemplateColumns = `repeat(${gridSize.value},1fr)`;
    document.querySelector(".container").onclick = SelectTile;
}

function SelectTile(e) {
    if (e.target.tagName == "BUTTON") {
        e.target.style.backgroundColor = color;
    }
}

document.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    document.querySelector(".container").onmousemove = SelectTiles;
});

document.addEventListener("mouseup", (e) => {
    isMouseDown = false;
});

function SelectTiles(e) {
    if (isMouseDown) {
        if (e.target.tagName == "BUTTON") {
            e.target.style.backgroundColor = color;
        }
    }
}

/*....................Changing gird size....................*/

gridSize.oninput = function () {
    gridSizeLabel.textContent = `${this.value} x ${this.value}`;
    SetNewGrid(this.value);
};

function SetNewGrid(newGridSize) {
    container.style.gridTemplateColumns = `repeat(${newGridSize},1fr)`;
    newGridSize = newGridSize * newGridSize;

    container.innerHTML = "";
    for (let i = 1; i <= newGridSize; i++) {
        const gridItem = document.createElement("button");
        gridItem.classList.add("grid-item");
        container.appendChild(gridItem);
    }
}

/*....................Setting colors....................*/

color.onchange = SetNewColor;

function SetNewColor() {
    color = this.value;
}

randomColor.addEventListener("click", () => {
    color = GetRadomColor();
});

function GetRadomColor() {
    const letters = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
    ];
    let color = "#";
    for (var i = 0; i < 6; i++) {
        color = color + letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

erase.addEventListener("click", () => {
    color = defaultColor;
});

clearAll.addEventListener("click", () => {
    for (let i = 0; i < gridItems.length; i++) {
        gridItems[i].style.backgroundColor = defaultColor;
    }
});
