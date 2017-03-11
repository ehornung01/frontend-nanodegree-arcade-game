// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var randomY = [70, 150, 225];
    var rate = [20, 40, 50];

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -200;
    this.y = randomY[Math.floor(Math.random() * (3 - 0))];
    this.speed = rate[Math.ceil(Math.random() * (3 - 0))] * 5;
    this.width = 50;
    this.height = 50;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {

    this.person = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
    this.score = 0;
    this.loss = 0;

};

Player.prototype.update = function() {

    //loop through enemies array

    presentEnemies.forEach(function(enemy) {


        if (enemy.x < this.x + this.width &&
            enemy.x + this.width > this.x &&
            enemy.y < this.y + this.height &&
            enemy.height + enemy.y > this.y) {
            console.log('collision detected');
            this.x = 200;
            this.y = 400;

            //empty the array to start game over
            allEnemies = [];
            this.lose();
        }
    }.bind(this));

    if (this.y < 50) {

        this.x = 200;
        this.y = 400;
        allEnemies = [];
        this.wins();
    }
};


Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.person), this.x, this.y);

};


Player.prototype.handleInput = function(key) {

    if (key === 'left') {
        if (this.x - 100 > -50) {
            this.x -= 100;
        }
    }

    if (key === 'up') {
        this.y -= 85;
    }

    if (key === 'right') {
        if (this.x + 100 < 500) {
            this.x += 100;
        }
    }

    if (key === 'down') {
        if (this.y + 85 < 450) {
            this.y += 85;
        }
    }
};

//Scoreboard functionality within wins and lose()

Player.prototype.wins = function() {

    this.score += 1;
    var element = document.getElementById("wins");
    element.innerHTML = this.score;

};

Player.prototype.lose = function() {

    this.loss += 1;
    var element = document.getElementById("lose");
    element.innerHTML = this.loss;

};



allEnemies = [];

//only check collisions with the 10 newest enemies

var presentEnemies;


var createEnemies = function() {

    allEnemies.unshift(new Enemy());
    allEnemies.unshift(new Enemy());
    allEnemies.unshift(new Enemy());
    allEnemies.unshift(new Enemy());

    presentEnemies = allEnemies.slice(0, 10);

    setTimeout(createEnemies, 1500);
};

createEnemies();

var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function(e) {

    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});