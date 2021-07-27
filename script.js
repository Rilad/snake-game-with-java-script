let canvas = document.getElementById("snake"); /* the let statement declares a block-scoped local variable, optionally initializing it to a value. */
let context = canvas.getContext("2d"); /* leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context. */
let box = 32; /* number of pixels for each square */
let snake = []; /* sets the snake position variable to an array */
snake[0] = { /* sets the starting position of the snake in the center of the canvas */
    x: 8*box,
    y: 8*box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random()*15)*box, /* The Math.random() function returns a floating-point, pseudo-random number in the range 0 to less than 1 (inclusive of 0, but not 1) with approximately uniform distribution over that range*/
    y: Math.floor(Math.random()*15)*box /* The Math.floor() function returns the largest integer less than or equal to a given number.*/
}

function createBG() {
    /*creates the background*/
    context.fillStyle = "green"; /* the CanvasRenderingContext2D.fillStyle property of the Canvas 2D API specifies the color, gradient, or pattern to use inside shapes. The default style is #000 (black).*/
    context.fillRect(0, 0, 16*box, 16*box); /* the CanvasRenderingContext2D.fillRect() method of the Canvas 2D API draws a rectangle that is filled according to the current fillStyle. */
    /*(x:x-axis coordinate of the rectangle's starting point, y:y-axis coordinate of the rectangle's starting point, width:The rectangle's width. Positive values are to the right, and negative to the left, height:the rectangle's height. Positive values are down, and negative are up.)*/
}

function createSnake() {
    /*creates the snake */
    for(i=0; i<snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood(){
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); /*The document.addEventListener() method attaches an event handler to the document. 
document.addEventListener(event, function, useCapture)-> event: a String that specifies the name of the event; function: Required. Specifies the function to run when the event occurs and an event object is passed to the function as the first parameter, whose type depends on the specified event; useCapture: Optional.
'keydown': The event occurs when the user is pressing a key*/

function update(event) {
    /*when a key is pressed, this function updates the direction in which the snake will move*/
    /* key code (https://keycode.info/): 37:ArrowLeft; 38:ArrowUp; 39: ArrowRight; 40:ArrowDown.*/
    /*PS: the snake cannot immediately change to the opposite direction, e.g., event.keyCode cannot be an ArrowLeft (37) with the direction 'right'. */
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function startGame(){
    if(snake[0].x > 15*box ) snake[0].x = 0;
    if(snake[0].x < 0 ) snake[0].x = 15*box;
    if(snake[0].y < 0) snake[0].y = 15*box;
    if(snake[0].y > 15*box) snake[0].y = 0;

    for(i = 1;i < snake.length; i++){ 
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game); /*The clearInterval() method clears a timer set with the setInterval() method. */
            alert('Game Over');
        }
    }

    createBG();
    createSnake();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); /* pop removes the last element from an array and returns that element */
    }else{
        food.x = Math.floor(Math.random()*15)*box; 
        food.y = Math.floor(Math.random()*15)*box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead); /* unshift adds one or more elements to the beginning of an array and returns the new length of the array.*/
}

let game = setInterval(startGame, 100); /* Repeats the executes of a function continuously, after waiting a specified number of milliseconds. */