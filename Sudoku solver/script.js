function wrapperGenerate() {





    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div")
            cell.classList.add(`cell-${row}-${col}`);
            cell.classList.add(`cell`);
            const input = `   <input type="number" >`;

            document.querySelector(".container").appendChild(cell);
            document.querySelector(`.cell-${row}-${col}`).innerHTML = (input);
        }
    }
}
wrapperGenerate();













