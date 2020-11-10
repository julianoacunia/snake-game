(function (window, undefined ) {
    'user strict';
    var KEY_ENTER = 13,
        KEY_LEFT = 37,
        KEY_UP = 38,
        KEY_RIGHT = 39,
        KEY_DOWN = 40,
        canvas = null,
        ctx = null,
        lastPress = null,
        pause = false,
        gameover = false,
        currentScene = 0,
        scenes = [],
        mainScene = null,
        gameScene = null,
        highscoresScene = null,
        body = [],
        food = null,
        foodCount = 0,
        fruit = null,
        fruitActive = false,
        //var wall = [],
        highscores = [],
        posHighscore = 10,
        dir = 0,
        score = 0,
        iBody = new Image(),
        iFood = new Image(),
        iFruit = new Image(),
        aEat = new Audio(),
        aDie = new Audio();

        function sendScore(){
            fetch('https://jsonplaceholder.typicode.com/posts',{
                method: 'POST',
                body: {
                    score: score
                }
            }).then(function(response){
                return response.json()
            .then(function(parseResponse){
                console.log("Score sent successfully " + parseResponse);
            })
            }).catch(function(error){
                console.log("Error trying to send the score " + error)
            })
        }

        window.requestAnimationFrame = (function () {
            return window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 17);
                };
        }());

        document.addEventListener('keydown', function (evt) {
            if (evt.which >= 37 && evt.which <= 40) {
                evt.preventDefault();
            }
            lastPress = evt.which;
        }, false);
        function Rectangle(x, y, width, height) {
            this.x = (x === undefined) ? 0 : x;
            this.y = (y === undefined) ? 0 : y;
            this.width = (width === undefined) ? 0 : width;
            this.height = (height === undefined) ? this.width : height;
        }
        Rectangle.prototype = {
            constructor: Rectangle,
            intersects: function (rect) {
                if (rect === undefined) {
                    window.console.warn('Missing parameters on function intersects');
                } else {
                    return (this.x < rect.x + rect.width &&
                        this.x + this.width > rect.x &&
                        this.y < rect.y + rect.height &&
                        this.y + this.height > rect.y);
                }
            },
            fill: function (ctx) {
                if (ctx === undefined) {
                    window.console.warn('Missing parameters on function fill');
                } else {
                    ctx.fillRect(this.x, this.y, this.width, this.height);
                }
            },
            drawImage: function (ctx, img) {
                if (img === undefined) {
                    window.console.warn('Missing parameters on function drawImage');
                } else {
                    if (img.width) {
                        ctx.drawImage(img, this.x, this.y);
                    } else {
                        ctx.strokeRect(this.x, this.y, this.width, this.height);
                    }
                }
            }
        };

        function Scene() {
            this.id = scenes.length;
            scenes.push(this);
        };
        Scene.prototype = {
            constructor: Scene,
            load: function () { },
            paint: function (ctx) { },
            act: function () { }
        };

        function loadScene(scene) {
            currentScene = scene.id;
            scenes[currentScene].load();
        }

        function random(max) {
            return ~~(Math.random() * max);
        }

        function addHighscore(score) {
            posHighscore = 0;
            while (highscores[posHighscore] > score && posHighscore < highscores.length) {
                posHighscore += 1;
            }
            highscores.splice(posHighscore, 0, score);
            if (highscores.length > 10) {
                highscores.length = 10;
            }
            localStorage.highscores = highscores.join(',');
        }

        function repaint() {
            window.requestAnimationFrame(repaint);
            if (scenes.length) {
                scenes[currentScene].paint(ctx);
            }
        }

        function run() {
            setTimeout(run, 50);
            if (scenes.length) {
                scenes[currentScene].act();
            }
        }

        function init() {
            // Get canvas and context
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            // Load assets
            iBody.src = './assets/body.png';
            iFood.src = './assets/fruit.png';
            iFruit.src = './assets/specialFruit.png';
            aEat.src = './assets/chomp.oga';
            aDie.src = './assets/dies.oga';
            // Create food
            food = new Rectangle(80, 80, 10, 10);
            fruit = new Rectangle(80, 80, 10, 10);
            // Create walls
            //wall.push(new Rectangle(50, 50, 10, 10));
            //wall.push(new Rectangle(50, 100, 10, 10));
            //wall.push(new Rectangle(100, 50, 10, 10));
            //wall.push(new Rectangle(100, 100, 10, 10));
            // Load saved highscores
            if (localStorage.highscores) {
                highscores = localStorage.highscores.split(',');
            }
            // Start game
            run();
            repaint();
        }



})