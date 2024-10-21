var snake;
var snake2;

var dir = "w";
var nextDir = "w";

var dir2 = "w";
var nextDir2 = "w";

var growFor = 0;
var growFor2 = 0;

var programCode = function(processingInstance) {
    with (processingInstance) {
        var width = 600;
        var height = 600;

        var widthStuds = width / 25;
        var heightsStuds = height / 25;

        size(width, height, 1);
        frameRate(2);

        var growing = false;
        var growing2 = false;
        var food = [250, 350];

        var defaultSnake = [
            [width/2-25*5, height/2]
        ];

        var defaultSnake2 = [
            [width/2+25*5, height/2]
        ];

        snake = defaultSnake;
        snake2 = defaultSnake2;

        keyPressed = function() {
            if ((key.toString() == "w" || key.toString() == "W") && dir != "s") nextDir = "w";
            else if ((key.toString() == "a" || key.toString() == "A") && dir != "d") nextDir = "a";
            else if ((key.toString() == "s" || key.toString() == "S") && dir != "w") nextDir = "s";
            else if ((key.toString() == "d" || key.toString() == "D") && dir != "a") nextDir = "d";

            if ((key.toString() == "i" || key.toString() == "I") && dir2 != "s") nextDir2 = "w";
            else if ((key.toString() == "j" || key.toString() == "J") && dir2 != "d") nextDir2 = "a";
            else if ((key.toString() == "k" || key.toString() == "K") && dir2 != "w") nextDir2 = "s";
            else if ((key.toString() == "l" || key.toString() == "L") && dir2 != "a") nextDir2 = "d";
        };

        function respawn() {
            dir = "w";
            nextDir = "w";
            snake = defaultSnake.map(segment => [...segment]);
        }

        function respawn2() {
            dir2 = "w";
            nextDir2 = "w";
            snake2 = defaultSnake2.map(segment => [...segment]);
        }

        function arrayIncludes(arr, coord) {
            return arr.some(item => item[0] === coord[0] && item[1] === coord[1]);
        }

        function getPos() {
            var x = Math.floor(Math.random() * widthStuds) * 25;
            var y = Math.floor(Math.random() * heightsStuds) * 25;

            if (arrayIncludes(snake, [x, y])) {
                return getPos();
            }

            return [x, y];
        }

        draw = function() {
            frameRate(2);
            if (nextDir == "w" && dir != "s") {
                dir = "w";
            }
            if (nextDir == "s" && dir != "w") {
                dir = "s";
            }
            if (nextDir == "a" && dir != "d") {
                dir = "a";
            }
            if (nextDir == "d" && dir != "a") {
                dir = "d"
            }

            if (nextDir2 == "w" && dir2 != "s") {
                dir2 = "w";
            }
            if (nextDir2 == "s" && dir2 != "w") {
                dir2 = "s";
            }
            if (nextDir2 == "a" && dir2 != "d") {
                dir2 = "a";
            }
            if (nextDir2 == "d" && dir2 != "a") {
                dir2 = "d"
            }

            var head = [...snake[0]];
            var head2 = [...snake2[0]];

            if (dir == "a") head[0] -= 25;
            else if (dir == "w") head[1] -= 25;
            else if (dir == "s") head[1] += 25;
            else if (dir == "d") head[0] += 25;

            if (dir2 == "a") head2[0] -= 25;
            else if (dir2 == "w") head2[1] -= 25;
            else if (dir2 == "s") head2[1] += 25;
            else if (dir2 == "d") head2[0] += 25;

            background(50, 50, 50);

            if (head[1] > height) {
                head[1] = 0
            }

            if (head[0] > width) {
                head[0] = 0
            }

            if (head[1] < 0) {
                head[1] = height
            }

            if (head[0] < 0) {
                head[0] = width
            }



            if (head2[1] > height) {
                head2[1] = 0
            }

            if (head2[0] > width) {
                head2[0] = 0
            }

            if (head2[1] < 0) {
                head2[1] = height
            }

            if (head2[0] < 0) {
                head2[0] = width
            }

            noStroke();
            var headColor = color(0, 100, 0);
            var restColor = color(0, 255, 0);
            var headColor2 = color(0, 0, 100);
            var restColor2 = color(0, 0, 255);
            var foodColor = color(255, 0, 0);

            var newSnake = [head];
            var newSnake2 = [head2];

            for (var i = 0; i < snake.length; i++) {
                newSnake.push([...snake[i]]);
            }

            for (var i = 0; i < snake2.length; i++) {
                newSnake2.push([...snake2[i]]);
            }

            // Check if the snake's head collides with its body excluding the tail
            // If the snake has more than 2 segments, ignore the last segment
            if (snake.length > 2 && arrayIncludes(snake.slice(1, snake.length - 1), head)) {
                respawn();
            }

            if (snake2.length > 2 && arrayIncludes(snake2.slice(1, snake2.length - 1), head2)) {
                respawn2();
            }

            // check if snake is eating food

            if (head[0] === food[0] && head[1] === food[1]) {
                growing = true;
            }

            if (head2[0] === food[0] && head2[1] === food[1]) {
                growing2 = true;
            }

            // handle incase snake is eating

            if (!growing && growFor == 0) {
                newSnake.pop();
            } else if (growing && growFor == 0) {
                growing = false;
                var [foodX, foodY] = getPos();
                food[0] = foodX;
                food[1] = foodY;
            } else if (growing && growFor > 0) {
                growing = false;
                var [foodX, foodY] = getPos();
                food[0] = foodX;
                food[1] = foodY;
            } else {
                growFor -= 1;
            }

            // handle incase snake2 is eating

            if (!growing2 && growFor2 == 0) {
                newSnake2.pop();
            } else if (growing2 && growFor2 == 0) {
                growing2 = false;
                var [foodX, foodY] = getPos();
                food[0] = foodX;
                food[1] = foodY;
            } else if (growing2 && growFor2 > 0) {
                growing2 = false;
                var [foodX, foodY] = getPos();
                food[0] = foodX;
                food[1] = foodY;
            } else {
                growFor2 -= 1;
            }

            // update the snakes

            snake = newSnake;
            snake2 = newSnake2;

            // check collision between two snakes
            if (arrayIncludes(snake2.slice(0), head)) {
                respawn();
            }

            if (arrayIncludes(snake.slice(0), head2)) {
                respawn2();
            }

            // Render the snake
            for (var i = 0; i < snake.length; i++) {
                fill(i === 0 ? headColor : restColor);
                rect(snake[i][0], snake[i][1], 25, 25);
            }

            for (var i = 0; i < snake2.length; i++) {
                fill(i === 0 ? headColor2 : restColor2);
                rect(snake2[i][0], snake2[i][1], 25, 25);
            }

            // Render food
            fill(foodColor);
            rect(food[0], food[1], 25, 25);
        };
    }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("snake");
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode);