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

})