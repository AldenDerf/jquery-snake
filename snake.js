$(document).ready(function() {
    const gameContainer = $(".game-container");
    const snake = $(".snake");
    const food = $(".food");

    let  snakeSegments = [{
        x : 0,
        y : 0
    }];
    let direction = "right";


    function updateSnakePosition() {
        let newSegment = { ...snakeSegments[0] }; // Create a new segment to the tail

        if ( direction === "right" ){
            newSegment.x += 20;

        } else if ( direction === "left") {
            newSegment.x -= 20;

        } else if ( direction === "up") {
            newSegment.y -=20;

        } else if ( direction === "down") {
            newSegment.y  +=20;
        }

        snakeSegments.unshift(newSegment); // Add the new head segment to the beginning
        
        console.log("Snake length after updating position:", snakeSegments.length);

        //Update the position of all segments
        for(let i = 0; i < snakeSegments.length; i++){
           const segment = snakeSegments[i];
           const segmentElement = $(".snake").eq(i);

           segmentElement.css({
            left: segment.x,
            top:segment.y
           });
        }


    }

    function generateFoodPosition() {
        const maxX = gameContainer.width() - 20;
        const maxY = gameContainer.height() - 20;

        const foodX = Math.floor(Math.random() * maxX / 20) * 20;
        const foodY = Math.floor(Math.random() * maxY / 20) * 20;

        food.css({ left: foodX, top: foodY });
    }

    function checkCollision() {
        const head = snakeSegments[0];
        if (
            head.x  === parseInt(food.css("left")) && 
            head.y === parseInt(food.css("top"))
        ){
            snakeSegments.push({x: head.x, y: head.y}); // Add a new segment to the tail
            generateFoodPosition();
        }

        console.log("Snake length after collision:", snakeSegments.length);
    }

    $(document).keydown(function(e) {
        if( e.key === "ArrowRight" && direction !== "left" ){
            direction = "right";

        } else if ( e.key === "ArrowLeft" && direction !== "right" ){
            direction = "left";

        } else if ( e.key === "ArrowUp" && direction !== "down"){
            direction = "up";
        } else if ( e.key === "ArrowDown" && direction !== "up"){
            direction = "down";
        }
    });

    setInterval(function() {
        updateSnakePosition();
        checkCollision();
    }, 100);

    generateFoodPosition();
});