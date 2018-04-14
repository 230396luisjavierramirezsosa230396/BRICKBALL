let p;
let pe;
let b=[] 
let bgImage
let entities  =[]
let puntos=0;
let vidas=3;
let musica;



const LEFT = -1
const RIGHT = 1
function preload(){
  bgImage = loadImage('images/sky.png') 
  musica = loadSound('sounds/musica.mp3')
}

function setup() {
  musica.play();
	createCanvas(windowWidth, windowHeight);
  initGame()
  p=new player();
  pe=new ball();

  for (var j =2; j < 8; j+=2) {
    for (var i =4 ; i < 16; i+=2) {
      b.push(new block(i*80,j*40))
  }
}
  
}

const createBg=function(){
  let side=300
  let columns=width/side
  let rows=height/side+1
  for(let i=0 ;i<rows ; i++){
    for(let j=0;j<columns;j++){
      let bg = new BackgroundEntity(bgImage,side*j,side*i,side,side)
      bg.speedY=2
      entities.push(bg)
    }
  }
}

const initGame =function(){
  createBg()


}



function draw() {
  entities.forEach(function(entity)
  {
    entity.draw()
    entity.move()
  })
  p.show();
  if (keyIsPressed) {
    //Move player 1
    if (keyIsDown(LEFT_ARROW)) {p.move(LEFT)}
    if (keyIsDown(RIGHT_ARROW)) {p.move(RIGHT)}
  }
 pe.move();

  
      for (var i =0; i < b.length; i++) {
    b[i].show()
    if(pe.collision(b[i])){
      pe.vy=-pe.vy
      b.splice(i,1)
      puntos ++;

      if(puntos==18)
      {
           alert("Ganaste");
 
      }
    }
    
  }



  if(vidas==0){
    alert("perdiste");
  }

  if(pe.collision(p)){
      pe.vy=-pe.vy
    }
  if(pe.y<0){
    pe.vy=-pe.vy
  }

  
  //pe.show();
  pe.show();
  showScore()
 
  
}

const showScore = function(){
  fill('#fff')
  textSize(50)
  text("Puntos"+" "+puntos,width-300, 70)
  text("Brick Ball",width/2 -150, 70)


    text("Vidas"+" "+pe.vidas,20, 70)

}




