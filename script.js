const board = document.querySelector(".board")

const boardWidth = 30;
const boardHeight = 30;

const cols = Math.floor(board.clientWidth / boardWidth)
const rows = Math.floor(board.clientHeight / boardWidth)

for(let i = 1; i < cols * rows; i++) {
    const block = document.createElement("div")
    block.classList.add("block")
    board.appendChild(block)
}

