"use strict";

function main() {
  var mainElement = document.querySelector('#site-main');

  function buildDom(html) {
    mainElement.innerHTML = html;
    return mainElement;
  }

  function createSplashScreen() {
    var splashScreen = buildDom(`
      <section>
        <h1>Eternal Enemies</h1>
        <button>Start</button>
      </section>
    `);
    var startButton = splashScreen.querySelector('button');
    startButton.addEventListener("click", createGameScreen);
  }

  function createGameScreen() {
    var gameOverScreen = buildDom(`
      <section>
        <canvas width="500" height="500"></canvas>
      </section>
    `);

    var canvas = document.querySelector('canvas');
    var gameInstance = new Game(canvas);

    gameInstance.gameOverCallback(createGameOverScreen);
    
    gameInstance.startGame();
    document.addEventListener('keydown', function(event) {
      if(event.key === 'ArrowDown') {
        gameInstance.player.setDirection(1);
      } else if(event.key === 'ArrowUp') {
        gameInstance.player.setDirection(-1);
      }
    })
  };


  function createGameOverScreen() {
    var gameOverScreen = buildDom(`
      <section>
        <h1>Game Over</h1>
        <button>Restart</button>
      </section>
    `);
    var restartButton = gameOverScreen.querySelector('button');
    restartButton.addEventListener("click", createSplashScreen);
  }

  createSplashScreen();
}

window.addEventListener("load", main);
