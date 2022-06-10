const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var rope;
var watermelon;
var watermelonIMG;
var glue;
var backgroundIMG;
var cueio;
var cueiotriste;
var cueiocomendo;
var cueiopiscano;
var cueioIMG;

let engine;
let world;
var ground;

function preload(){
  backgroundIMG = loadImage("background.png");
  watermelonIMG = loadImage("melon.png");
  cueioIMG=loadImage("Rabbit-01.png");

cueiopiscano = loadAnimation("blink_1.png","blink_2.png","blink_3.png");

cueiocomendo = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");

cueiotriste = loadAnimation("sad_1.png","sad_2.png","sad_3.png");



cueiopiscano.playing = true;
cueiocomendo.playing = true;
cueiotriste.playing = true;
cueiotriste.looping= false;
cueiocomendo.looping = false; 

}
function setup() 
{
  createCanvas(500,700);
  frameRate(80);

  engine = Engine.create();
  world = engine.world;

  button = createImg('cut_btn.png');
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(knife);
  
  rope= new Rope(8,{x:245,y:30});

  ground = new Ground(200,680,600,20);

 cueiopiscano.frameDelay = 20;
  cueiocomendo.frameDelay = 20;
  cueiotriste.frameDelay=20;

  var WATERMEOLON_options = {
    density:0.005
  };

  //coelho
  cueio=createSprite(250,620,100,100);
  cueio.scale = 0.15;

  //varuaçoes da animação do coelho
  cueio.addAnimation("piscando",cueiopiscano);
  cueio.addAnimation("comendo",cueiocomendo);
  cueio.addAnimation("triste",cueiotriste);
  //mudança de animação do coelho
  cueio.changeAnimation("piscando");
 

//fruta
  watermelon = Bodies.circle(60,20,10,WATERMEOLON_options);
  Matter.Composite.add(rope.body,watermelon);

  //corda
  glue = new Link(rope,watermelon);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
}

function draw() 
{
  background(51);
  image(backgroundIMG,width/2,height/2,490,690);
  
  //verifica se existe
  if(watermelon!=null){
    image(watermelonIMG,watermelon.position.x,watermelon.position.y,75,75);
  }
  
  rope.show();  
  Engine.update(engine);
  ground.show();

  //verifica se a fruta colideo com o coelho
  if(collide(watermelon,cueio)==true){
    cueio.changeAnimation('comendo');
  }

  //verifica se a fruta colidio com o chão
  if(collide(watermelon,ground.body)==true){
    cueio.changeAnimation("triste");
  }



  drawSprites(); 
}

//função de ponto de corte
function knife(){
  rope.break();
  glue.dettach();
  glue = null;
}


//função de verificação de colisão
function collide(body,sprite){
  if(body!=null){
     var dista = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
     if(dista<=80){
      World.remove(engine.world,watermelon);
      watermelon=null;
      return true;
     }
     else{
      return false;
     }
  }
}




