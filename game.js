import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from "./snake.js";
import { update as updateFood, draw as drawFood, getFoodPosition } from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
let score = 0;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {
    if (gameOver) {
        if (confirm('You lost. Press ok to restart.')) {
            window.location = '/';
        }
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
    checkFoodCollision();
}

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function updateScore() {
    score += 1;
    document.getElementById('score').textContent = score;
}

function onSnakeEatFood() {
    updateScore();
    // Additional logic for repositioning food, etc.
}

function checkFoodCollision() {
    const snakeHead = getSnakeHead();
    const foodPosition = getFoodPosition();
    if (snakeHead.x === foodPosition.x && snakeHead.y === foodPosition.y) {
        onSnakeEatFood();
        // Additional logic for repositioning food, etc.
    }
}