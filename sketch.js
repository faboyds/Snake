var snake;
var food;
var scl = 20;
var canvasWidth = 600;
var canvasHeight = 600;

function setup(){
    createCanvas(canvasWidth,canvasHeight);

    snake = new Snake();
    food = new Food();
    food.pickLocation();

    frameRate(15);
}

function draw() {
    background(51);

    snake.update();
    snake.checkIfDied();
    snake.show();

    if (snake.eat(food)){
        food.pickLocation();
    }

    food.show();
}

function keyPressed() {
    if (keyCode === UP_ARROW || keyCode === 87) {
        if(snake.speedY !== 1) snake.direction(0, -1);
    }else if(keyCode === DOWN_ARROW || keyCode === 83){
        if(snake.speedY !== -1) snake.direction(0, 1);
    }else if(keyCode === LEFT_ARROW || keyCode === 65){
        if(snake.speedX !== 1) snake.direction(-1, 0);
    }else if(keyCode === RIGHT_ARROW || keyCode === 68){
        if(snake.speedX !== -1) snake.direction(1, 0);
    }
}

function Snake(){
    this.x = 0;
    this.y = 0;
    this.speedX = 1;
    this.speedY = 0;
    this.total = 0;
    this.tail = [];

    this.update = function () {

        if(this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total-1] = createVector(this.x, this.y);

        this.x += this.speedX * scl;
        this.y += this.speedY * scl;

        this.x = constrain(this.x , 0 , width - scl);
        this.y = constrain(this.y , 0 , height - scl);
    };
    
    this.show = function () {
        fill(255);
        for(var i = 0; i < this.tail.length; i++){
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }

        rect(this.x, this.y, scl, scl);
    };

    this.direction = function (x, y) {
        this.speedX = x;
        this.speedY = y;
    };

    this.eat = function (food) {
        var d = dist(this.x, this.y, food.x, food.y);
        if(d < 1){
            this.total++;

            return true;
        }
        return false;
    };
    
    this.checkIfDied = function () {
        for(var i = 0; i < this.tail.length; i++){
            if(dist(this.tail[i].x, this.tail[i].y, this.x, this.y) < 1){
                this.total = 0;
                this.tail = [];

                fill(255, 0, 0);
                rect(0, 0, canvasWidth, canvasHeight);
            }
        }
    }
}

function Food(){

    this.x = 0;
    this.y = 0;

    this.pickLocation = function () {
        var cols = floor(width / scl);
        var rows = floor(height / scl);

        var l = createVector(floor(random(cols)), floor(random(rows)));
        l.mult(scl);

        this.x = l.x;
        this.y = l.y;
    };

    this.show = function () {
        fill(255, 10, 10);
        rect(this.x, this.y, scl, scl);
    };
}