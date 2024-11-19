//--CONSTANTS_AND_VARIABLES--//
let inputDir={x: 0 , y: 0};
const foodsound= new Audio('pow-90398-Copy.mp3');
const gameOversound= new Audio('crash-snake-16-47956-Copy.mp3');
const moveSound= new Audio('snake-hiss-95241-Copy.mp3');
const musicSound= new Audio('happy-rock-165132.mp3');
let board = document.getElementById('board');
let speed=5;
let lastPaintTime=0;
let snakearr=[{x : 13 , y : 15}];
let score= 0;
food={ x: 6 ,y: 7};
//--GAMING_FUNCTIONS--//
function main(ctime){
    window.requestAnimationFrame(main);
    console.log(ctime);
    if ((ctime-lastPaintTime)/1000 <1/speed){
        return;
    } 
    lastPaintTime= ctime;
    gameEngine();
    

}
function isCollide(snake){
    //IF_SNAKE_COLLIDE_INTO_ITSELF//
    for (let i=1; i < snakearr.length; i++) {
        if(snake[i].x===snake[0].x&&snake[i].y===snake[0].y){
            return true;
        }
    }
    //IF_SNAKE_BUMPS_INTO_THE_WALL//
     if(snake[0].x >=18||snake[0].x<=0||snake[0].y>=18||snake[0].y<=0){
        return true;
     }
        
    

}

function gameEngine(){
    //SNAKE_ARRAY_UPDATION//
    if(isCollide(snakearr)){
        gameOversound.play();
        musicSound.pause();
        inputDir={x: 0 , y: 0};
        alert("Game Over. Press any key to play again!!");
        snakearr=[{x : 13 , y : 15}];
        musicSound.play()
        score= 0;
    }

    //NEXT_FOOD_AFTER_PREVIOUS_EAT_AND_SCORE_UPDATION//
    if(snakearr[0].y===0&&snakearr[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>hiscoreval){
            localStorage.setItem("Hi Score:", JSON.stringify(hiscoreval));
            HighscoreBox.innerHTML= "HiScore:"+hiscoreval;
        }
        scoreBox.innerHTML="Score: " + score;
        snakearr.unshift({x: snakearr[0] + inputDir.x , y: snakearr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food={ x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }
     //MOVE_SNAKE//
     for (let i = snakearr.length -2; i>=0; i--) {
        snakearr[i+1] ={...snakearr[i]};
        
     }
     snakearr[0].x += inputDir.x;
     snakearr[0].y += inputDir.y;

    //DISPLAY_SNAKE//
    board.innerHTML="";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.st.gridRowStart= e.y;
        snakeElement.st.gridColumnStart = e.x ;
        snakeElement.classList.add('snake');
        if (index==0){
            snakeElement.classList.add('head');
        }
        else
         { snakeElement.classList.add('snake');
         }
        board.appendChild(snakeElement);

    });
    //DISPLAY_FOOD//
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart= food.y;
        foodElement.style.gridColumnStart = food.x ;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}









//--MAIN_LOGIC_START--//
let hiscore= localStorage.getItem("Hi Score:");
if(hiscore===null){
    hiscoreval=0;
    localStorage.setItem("Hi Score:", JSON.stringify(hiscoreval));
}
else{
    hiscoreval= json.parse(hiscore);
    HighscoreBox.innerHTML= "HiScore:"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
      inputDir = {x: 0, y:1} // BEGIN_GAME
      moveSound.play();
      switch(e.key){
        case "ArrowUp" :
            console.log("ArrowUp");
            inputDir.x=0 ;
            inputDir.y=-1 ;
            break;
        case "ArrowDown" :
            console.log("ArrowDown");
            inputDir.x= 0 ;
            inputDir.y= 1;
            break;
      
        case "ArrowLeft" :
            console.log("ArrowLeft");
            inputDir.x= -1;
            inputDir.y= 0;
            break;  
        case "ArrowRight" :
             console.log("ArrowRight");
             inputDir.x= 1;
            inputDir.y= 0;
             break;
            
        default:
            break;
        }
});