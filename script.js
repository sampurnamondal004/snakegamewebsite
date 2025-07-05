(() => {
  const CELL = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cell-size"));
  const COLS = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cols"));
  const ROWS = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--rows"));

  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  const scoreEl = document.getElementById("score");
  const highScoreEl = document.getElementById("highScore");
  const restartBtn = document.getElementById("restartBtn");

  const dirs = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  };

  let snake, dir, nextDir, food, score, intervalId, speed;
  let highScore = +localStorage.getItem("snake-high-score") || 0;
  highScoreEl.textContent = highScore;

  function init() {
    snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    dir = [0, -1];
    nextDir = dir;
    placeFood();
    score = 0;
    speed = 120;
    scoreEl.textContent = score;
    restartBtn.hidden = true;
    clearInterval(intervalId);
    intervalId = setInterval(gameLoop, speed);
  }

  function placeFood() {
    food = {
      x: Math.floor(Math.random() * COLS),
      y: Math.floor(Math.random() * ROWS),
    };
    while (snake.some((s) => s.x === food.x && s.y === food.y)) {
      food.x = Math.floor(Math.random() * COLS);
      food.y = Math.floor(Math.random() * ROWS);
    }
  }

  function gameLoop() {
    dir = nextDir;
    const head = {
      x: (snake[0].x + dir[0] + COLS) % COLS,
      y: (snake[0].y + dir[1] + ROWS) % ROWS,
    };

    if (snake.some((s) => s.x === head.x && s.y === head.y)) {
      return gameOver();
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score++;
      scoreEl.textContent = score;
      if (score > highScore) {
        highScore = score;
        highScoreEl.textContent = highScore;
        localStorage.setItem("snake-high-score", highScore);
      }
      placeFood();
      if (speed > 60) {
        speed -= 3;
        clearInterval(intervalId);
        intervalId = setInterval(gameLoop, speed);
      }
    } else {
      snake.pop();
    }

    draw();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e63946";
    ctx.fillRect(food.x * CELL, food.y * CELL, CELL, CELL);

    ctx.fillStyle = "#06d6a0";
    snake.forEach((segment) =>
      ctx.fillRect(segment.x * CELL, segment.y * CELL, CELL, CELL)
    );
  }

  function gameOver() {
    clearInterval(intervalId);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "48px sans-serif";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    restartBtn.hidden = false;
  }

  window.addEventListener("keydown", (e) => {
    if (dirs[e.key]) {
      const [dx, dy] = dirs[e.key];
      if (dx !== -dir[0] || dy !== -dir[1]) {
        nextDir = [dx, dy];
      }
    }
  });

  restartBtn.addEventListener("click", init);

  init();
})();


   

    
    







