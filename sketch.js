var antesDeJogar = 0;
var jogar = 1;
var gameover = 2;
var estadoDoJogo = antesDeJogar;
var cactos;
var cactos1;
var cactos2;
var cactos3;
var cactos4;
var cactos5;
var cactos6;
var grupoDeNuvem;
var trex, trex_running, edges;
var groundImage;
var chao;
let chaoinvisivel;
var nuvemimagem
var groupCactos
var parado
var colided
var pontos = 0
var somPonto
var somMorte
var barulhoDoPulo
var restart
var fimDoJogo
var restartimg
var fimimg

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nuvemimagem = loadImage("cloud.png");
  cactos1 = loadImage ("obstacle1.png");
  cactos2 = loadImage ("obstacle2.png");
  cactos3 = loadImage ("obstacle3.png");
  cactos4 = loadImage ("obstacle4.png");
  cactos5 = loadImage ("obstacle5.png");
  cactos6 = loadImage ("obstacle6.png");
  parado = loadAnimation ("trex1.png");
  colided = loadAnimation ("trex_collided.png");
  somPonto = loadSound('checkpoint.mp3');
  somMorte = loadSound('die.mp3');
  barulhoDoPulo = loadSound('jump.mp3');
  restartimg = loadImage ("restart.png");
  fimimg = loadImage ("gameOver.png");

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  trex = createSprite(50, 160, 40, 40);
  chao = createSprite(width-180, 180, 600, 10);
  chao.addImage (groundImage);
  trex.addAnimation("qualquer coisa", trex_running);
  trex.addAnimation("p", parado);
  trex.addAnimation("c", colided);
  trex.scale = 0.5
  chaoinvisivel = createSprite(300, 190,600,10);
  chaoinvisivel.visible = false;
  grupoDeNuvem = new Group ();
  groupCactos = new Group();
  trex.setCollider("circle",0,0,30);
  
  
  //trex.debug = true;
  restart = createSprite(width/2, 140, 40, 40);
  restart.addImage (restartimg)
  restart.scale = 0.5
  restart.visible = false

  fimDoJogo = createSprite(width/2, 100, 40, 40);
  fimDoJogo.addImage (fimimg)
  fimDoJogo.scale = 0.5
  fimDoJogo.visible = false

}


function draw(){
  //definir a cor do plano de fundo 
  background("wight");
  
  text(mouseX + "," + mouseY,mouseX,mouseY);
  //console.log(trex.y);
  console.log(trex.y);
  text(' Km Percorrido '+ pontos,width/2-55,25);
  
  if (estadoDoJogo == antesDeJogar){
    trex.changeAnimation ("p",parado);
  chao.velocityX = 0;
    if (keyDown('space')) {
      estadoDoJogo = jogar;
      trex.changeAnimation ("qualquer coisa", trex_running);
     }

  }  else if (estadoDoJogo==jogar){
    chao.velocityX = -(5+2*pontos/200);
    controle();
    previsaoDoTempo();
    nascimentodeplantas();
    pontos = pontos + Math.round(frameRate()/40)
    if (groupCactos.isTouching(trex)){
      estadoDoJogo = gameover
      somMorte.play();
    }
    if (pontos >0 && pontos % 200 == 0){
      somPonto.play();
    }
  }
  else if (estadoDoJogo == gameover){
    trex.changeAnimation ("c",colided);
    chao.velocityX = 0;
    grupoDeNuvem.setVelocityXEach (0);
    groupCactos.setVelocityXEach (0);
    groupCactos.setLifetimeEach (-1);
    trex.velocityY = 0;
    fimDoJogo.visible = true
    restart.visible = true
    if (mousePressedOver(restart)){
     reset();
    }
  }
  

  trex.collide(chaoinvisivel);

  drawSprites();
}

function controle(){
  if (touches.lenght> 0 || keyDown( "space" ) && trex.y > 160) {
  trex.velocityY = -13
  barulhoDoPulo.play()
  touches=[]
  }

  trex.velocityY= trex.velocityY + 0.7

  if (chao.x <0){
  chao.x = chao.width/2
  }
}

function previsaoDoTempo (){

  if (frameCount % Math.round(random(80,200)) ==0){
  var nuvem =createSprite(width,35 ,10,20)
  nuvem.y = Math.round (random(20,90));
  nuvem.addImage(nuvemimagem)
  nuvem.scale = 0.8
  nuvem.velocityX= -3
  grupoDeNuvem.add(nuvem);
  nuvem.depth =trex.depth
  nuvem.depth =nuvem.depth-1
  nuvem.lifetime = 450;
  if (nuvem.isTouching(grupoDeNuvem)){
    nuvem.x = frameCount % Math.round(random(80,200)) ==0

  }
  }
  

}
function nascimentodeplantas(){
  if (frameCount % Math.round(random(60,150)) ==0){
  cactos= createSprite(width,170);
  cactos.velocityX = -(5+2*pontos/200);
  var rand = Math.round(random(1,6));
  cactos.lifetime = 300;
  switch(rand){
    case 1:cactos.addImage(cactos1);
    break;
    case 2:cactos.addImage(cactos2);
    break;
    case 3:cactos.addImage(cactos3);
    break;
    case 4:cactos.addImage(cactos4);
    break;
    case 5:cactos.addImage(cactos5);
    break;
    case 6:cactos.addImage(cactos6);
    break;
    default:break;
  }
  cactos.scale = 0.5;
  groupCactos.add(cactos);

  if (cactos.isTouching(groupCactos)){
    cactos.x = frameCount % Math.round(random(80,200)) ==0

  }

  
}

}
function reset(){
  groupCactos.destroyEach();
  grupoDeNuvem.destroyEach();
  fimDoJogo.visible = false;
  restart.visible = false;
  pontos = 0;
  chao.velocityX = -5;
  trex.changeAnimation("qualquer coisa", trex_running);
  estadoDoJogo = jogar;

}
