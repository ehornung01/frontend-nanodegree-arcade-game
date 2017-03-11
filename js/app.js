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
    //this.update()

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

};

Player.prototype.update = function() {


    presentEnemies.forEach(function(enemy) {

        if (enemy.x < player.x + player.width &&
            enemy.x + enemy.width > player.x &&
            enemy.y < player.y + player.height &&
            enemy.height + enemy.y > player.y) {
            console.log('collision detected');
            player.x = 200;
            player.y = 400;
            allEnemies = [];
            lose();
        }
    });

    if (player.y < 50) {

        player.x = 200;
        player.y = 400;
        allEnemies = [];
        wins();
    }
};


Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.person), this.x, this.y);

};


Player.prototype.handleInput = function(key) {

    if (key === 'left') {
        if (player.x - 100 > -50) {
            player.x -= 100;
        }
    }

    if (key === 'up') {

        player.y -= 85;

    }

    if (key === 'right') {
        if (player.x + 100 < 500) {
            player.x += 100;
        }
    }

    if (key === 'down') {
        if (player.y + 85 < 450) {
            player.y += 85;
        }
    }
};

//Scoreboard functionality within wins and lose()

score = 0;
loss = 0;

var wins = function() {

    score += 1;


    var element = document.getElementById("wins");
    element.innerHTML = score;
};

var lose = function() {

    loss += 1;
    var element = document.getElementById("lose");
    element.innerHTML = loss;

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


var moveEnemies = function() {

    allEnemies.forEach(function(enemy) {
        this.update();
        player.update();
    });

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