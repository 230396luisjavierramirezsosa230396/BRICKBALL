let  ball;
let pad;
Block[] blocks;


int maxLives=3;//Change the maximum number of lives you get
int Width=900;//Adjust these to change the window size (text might break)
int Height=720;
boolean hitSound=false;//change to false if you don't want to hear a sound everytime you hit a block

int lives=maxLives;
int cols;
int rows;
int numBlocks;


int gameState=0;
boolean gameStart=false;
boolean lose=false;

int aliveBlocks=0;
int deadBlocks=0;
int counter=0;

int score=0;


void settings() {
  size(Width, Height);
}

void setup() {

	blocks=new Block[300];
 
  file.amp(0.25);

  cols=width/60;
  rows=int((2*height/5)/40);
  numBlocks=rows*cols;

  int index=0;
  for (int i=0; i<cols; i++) {
    for (int j=0; j<rows; j++) {

      blocks[index]=new Block(i*60, j*40);

      if (blocks[index].alive>0) {
        aliveBlocks++;
      } else {
        deadBlocks++;
      }
      index++;
    }
  }
  ball=new Ball();
  pad=new Paddle();

  lives=maxLives;
}

void draw() {


  if (gameState==0) {//intro slide
    background(200, 0, 0);
    textSize(int(43));
    text("Press SPACEBAR to start", 200, 300);
    textSize(30);
    text("Press       to move right", 50, 500);
    fill(255);
    noStroke();
    rect(137, 487, 30, 10);
    triangle(137+30, 480, 137+30, 504, 150+30, 492);
    text("Press       to move left", 520, 500);
    rect(607+17, 487, 30, 10);
    triangle(624, 480, 624, 504, 624-15, 492);
  } else if (gameState==1) {//actual game

    background(120);

    ball.show();
    pad.show();
    pad.edges();

    if (lose) {//put ball on top of the paddle after losing
      loseText();
      ball.resetPos(pad);
    }

    if (gameStart) {//while the ball is moving
      if (keyPressed) {//move the paddle
        if (keyCode==LEFT) {
          pad.leftMove(3.5);
        }
        if (keyCode==RIGHT) {
          pad.rightMove(3.5);
        }
      }

      for (int i=0; i<numBlocks; i++) {
        blocks[i].show();
      }
      for (int i=0; i<numBlocks; i++) {
        ball.blockCollision(blocks[i]);
      }
      ball.update();

      checkWinGame();
      fill(255);
      textSize(15);
      text("LIFES:", 10, height-15);
      text( lives, 50, height-15);
      text("SCORE:", width-120, height-15);
      text( score, width-50, height-15);
    }
  } else if (gameState==2) {//end of game slide
    winGame();
  }
}

void keyPressed() {

  if (keyCode==' ') {

    if (gameState==0) {
      gameState=1;
    } else  if (gameState==2) {
      resetGame();
    } else if (gameState==1&&!gameStart) {
      gameStart=true;
      lose=false;

      float angle=random(0.3, 0.6);

      ball.speed.x=4*sin(angle);
      ball.speed.y=-4*cos(angle);
    } else if (gameState==1&&lose) {
      lose=false;
      float angle=random(0.3, 0.6);

      ball.speed.x=4*sin(angle);
      ball.speed.y=-4*cos(angle);
    }
  }
}



void loseText() {

  textSize(30);
  text("You lost one life", width/2-137, height/2);
}

void resetGame() {
  loseText();
  lives=maxLives;

  pad.x=width/2;
  ball.location.x=width/2;
  ball.location.y=height-50;
  ball.speed.x=0;
  ball.speed.y=0;
  resetBlocks();
  counter=0;

  gameStart=false;
  lose=false ;
  gameState=0;
}

void resetBlocks() {
  aliveBlocks=0;
  for (int index=0; index<numBlocks; index++) {

    blocks[index].alive=-1+(int)random(2)*2;
    if (blocks[index].alive>0) {
      aliveBlocks++;
    }
  }
}

void checkWinGame() {
  if (aliveBlocks==0) {
    gameState=2;
    gameStart=false;
  }
}

void winGame() {
  noStroke();
  fill(120, 120, 0);
  rect(0, 0, width, height);
  fill(255);
  textSize(43);
  text("Press SPACEBAR to start again", 147, 450);
  textSize(30);
  text("You win", width/2-75, height/2);
  lives=maxLives;
}

class Ball {
  PVector location;
  PVector speed;
  float r=6.5;

  Ball() {
    location=new PVector(width/2, height-50);
    speed=new PVector(0, 0);
  }

  void show() {
    noStroke();
    fill(0);

    ellipseMode(CENTER);
    ellipse(location.x, location.y, r*2, r*2);
    point(location.x, location.y);
  }

  void update() {
    location.add(speed);
    edges();
    padCollision(pad);
  }

  void edges() {
    if (location.y<0+r) {
      speed.y=speed.y*-1;

    }
    if (location.x>width-r){
      speed.x=speed.x*-1;

    }
    else if(location.x<r){
      speed.x=speed.x*-1;
    }
    if (location.y>height) {
      resetPos(pad);
      score-=100;
      lives--;
      lose=true;
      if (lives<1) {
        score=0;

        gameStart=false;
        lose=false;
        println("fail");
        resetGame();
      }
    }
  } 

  void resetPos(Paddle pad) {
    location.x=pad.x;
    location.y=pad.y-5-r;
    speed.x=0;
    speed.y=0;
  }

  void padCollision(Paddle pad) {
    if (location.x>pad.x-50&&location.x<pad.x+50) {
      if (location.y+r>pad.y-pad.padWidth/2&&location.y<pad.y+pad.padWidth/2) {
        float diff=location.x-(pad.x-50);
        float rad=radians(45);
        float angle=map(diff, 0, 100, -rad*3/2, rad*3/2);

        speed.x=4*sin(angle);
        speed.y=-4*cos(angle);
      }
    }
  }

  void blockCollision(Block block) {
    rectMode(CORNER);
    if (block.alive==1) {
      if (speed.x>0) {
        if (location.y>block.y&&location.y<block.y+block.blockHeight) {
          if (location.x+r>block.x&&location.x-r<block.x+block.blockWidth) {
            location.x-=3;
            speed.x=speed.x*-1;
            block.alive--;
            aliveBlocks--;
            deadBlocks++;
            score+=20;
            counter++;
            if(hitSound){
            file.play();
            }
          }
        }
      } else if (speed.x<0) {
        if (location.y>block.y&&location.y<block.y+block.blockHeight) {
          if (location.x-r<block.x+block.blockWidth&&location.x+r>block.x) {
            location.x+=3;
            speed.x=speed.x*-1;
            block.alive--;
            aliveBlocks--;

            deadBlocks++;
            score+=20;
            counter++;
            if(hitSound){
            file.play();
            }

          }
        }
      }

      if (speed.y>0) {
        if (location.x>block.x&&location.x<block.x+block.blockWidth) {
          if (location.y+r>block.y&&location.y-r<block.y+block.blockHeight) {
            location.y-=3;
            speed.y=speed.y*-1;
            block.alive--;
            aliveBlocks--;
            deadBlocks++;
            score+=20;
            counter++;
            if(hitSound){
            file.play();
            }

          }
        }
      } else if (speed.y<0) {
        if (location.x>block.x&&location.x<block.x+block.blockWidth) {
          if (location.y-r<block.y+block.blockHeight&&location.y+r>block.y) {
            location.y+=3;
            speed.y=speed.y*-1;
            block.alive--;
            aliveBlocks--;
            deadBlocks++;
            score+=20;
            counter++;
           if(hitSound){
            file.play();
            }

          }
        }
      }
    }
  }
}
class Block {
  float x;
  float y;
  float blockWidth=60;
  float blockHeight=40;
  int alive=-1+(int)random(2)*2;
  color R, G;

  Block(float x_, float y_) {
    x=x_;
    y=y_;
    R=int(map(x, 0, width, 0, 255));
    G=int(map(y, 0, height*2/5, 0, 255));
  }

  void show() {
    if (alive>0) {
      rectMode(CORNER);
      stroke(255);
      noStroke();
      fill(255);

      rect(x, y, blockWidth, blockHeight);
      fill(R, G, 0);
      rect(x+2, y+2, blockWidth-4, blockHeight-4);
    }
  }
}
class Paddle {
  float x;
  float y=height-38;
  int padWidth=10;

  Paddle() {
    x=width/2;
  }

  void show() {
    fill(255);
    rectMode(CENTER);
    stroke(255);
    rect(x, y, 100, padWidth);
  }

  void edges() {
    if (x-50<0) {
      x=50;
    }
    if (x+50>width) {
      x=width-50;
    }
  }
  void leftMove(float X) {
    x-=X;
  }

  void rightMove(float X) {
    x+=X;
  }
}