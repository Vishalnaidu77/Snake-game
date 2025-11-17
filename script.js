const board = document.querySelector(".board")
let modal = document.querySelector(".modal")
const startBtn = document.querySelector(".btn-start")
const restartBtn = document.querySelector(".btn-restart")
const restart = document.querySelector(".restart-game")
const start = document.querySelector(".start-game")
let curScore = document.querySelector("#score")
let highScoreElem = document.querySelector("#high-score")
let timeElem = document.querySelector("#time")
const upArrow = document.querySelector(".up-arrow")
const downArrow = document.querySelector(".down-arrow")
const leftArrow = document.querySelector(".left-arrow")
const rightArrow = document.querySelector(".right-arrow")

let score = 0;
let highScore = localStorage.getItem("highscore") || 0;
let time = '00:00'


const boardWidth = 30;
const boardHeight = 30;

const cols = Math.floor(board.clientWidth / boardWidth)
const rows = Math.floor(board.clientHeight / boardWidth)

let blocks = []
let snake = [
    {
        x: 6,
        y: 23
    },
    {
        x: 6,
        y: 24
    },
    {
        x: 6,
        y: 25
    },
]
let inetvalId = null;
let timeIntervalId = null;
let head = null;
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols)
}
let direction = 'left'


for(let row = 0; row < rows; row++){
    for(let col = 0; col < cols; col++){
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        // block.innerText = `${row}-${col}`
        blocks[`${row}-${col}`] = block
    }
}


// Render snake and Food
function render() {

    if(direction === "left"){
        head = { x: snake[0].x, y: snake[0].y - 1}
    }
    else if(direction === 'right'){
        head = {x: snake[0].x, y: snake[0].y + 1}
    }
    else if(direction === 'down'){
        head = {x: snake[0].x + 1, y: snake[0].y}
    }
    else if(direction === 'up'){
        head = {x: snake[0].x - 1, y: snake[0].y}
    }

    // Wall collision logic
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        clearInterval(inetvalId)
        modal.style.display = "flex"
        start.style.display = "none"
        restart.style.display = "flex"
        return;
    }

    // Self collision logic
    if(snake.some(segment => segment.x === head.x && segment.y === head.y)){
        clearInterval(inetvalId)
        modal.style.display = "flex"
        start.style.display = "none"
        restart.style.display = "flex"
        return
    }

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill")
    })

    snake.unshift(head)
    snake.pop()


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })

    blocks[`${food.x}-${food.y}`].classList.add("food")

    // food consume logic
    if(head.x == food.x && head.y == food.y){
        score++;
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        }
        blocks[`${food.x}-${food.y}`].classList.add("food")
        snake.push(head)

        curScore.innerText = score
        if(score > highScore){
            highScore = score;
            localStorage.setItem("highscore", highScore.toString())
        }
        highScoreElem.innerText = highScore;
    }
}


document.addEventListener("keydown", (event) => {
    if(event.key === 'ArrowLeft' || event.key === "a") direction = 'left';
    if(event.key === "ArrowRight" || event.key === "d") direction = 'right';
    if(event.key === "ArrowUp" || event.key === "w") direction = 'up';
    if(event.key === "ArrowDown" || event.key === "s") direction = 'down';
})

startBtn.addEventListener("click", () => {
    inetvalId = setInterval(() => {
        render()
    }, 200);
    modal.style.display = "none"

    timeIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number)
        if(sec === 59){
            min+=1;
            sec = 0;
        }
        else sec+=1;

        time = `${min < 10 ? "0" : ''}${min}:${sec < 10 ?'0' : ''}${sec}`
        timeElem.innerText = time;
    }, 1000)

    
})


restartBtn.addEventListener("click", () => {

    score = 0;
    time = '00:00';

    curScore.innerText = score;
    highScoreElem.innerText = highScore;
    timeElem.innerText = time;

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`]?.classList.remove("fill")
    })


    blocks[`${food.x}-${food.y}`].classList.remove("food")
    if(window.innerWidth < 600){
        snake = [
            {
                x: 6,
                y: 5
            },
            {
                x: 6,
                y: 6
            },
            {
                x: 6,
                y: 7
            },
        ]
    }
    else{
        snake = [
            {
                x: 6,
                y: 23
            },
            {
                x: 6,
                y: 24
            },
            {
                x: 6,
                y: 25
            },
        ]
    }
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    }
    direction = "left"
    modal.style.display = "none"
    inetvalId = setInterval(() => {
        render()
    }, 200);
})


if(window.innerWidth < 600){
    snake = [
        {
            x: 6,
            y: 10
        },
        {
            x: 6,
            y: 11
        },
        {
            x: 6,
            y: 12
        },
    ]

    upArrow.addEventListener("click", () => {
        direction = 'up'
    })
    downArrow.addEventListener("click", () => {
        direction = 'down'
    })
    leftArrow.addEventListener("click", () => {
        direction = 'left'
    })
    rightArrow.addEventListener("click", () => {
        direction = 'right'
    })
}