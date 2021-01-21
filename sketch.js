var dog, happyDog,dogImg,sadDog;
var database;
var foodS,foodStock;
var changeState, readState;
var bedroom, garden, washroom;
var gameState;

function preload(){
	dogImg = loadImage("Dog.png");
  happyDog = loadImage("happy dog.png");
  bedroom = loadImage("../virtual pet images/Bed Room.png");
  garden = loadImage("../virtual pet images/Garden.png");
 washroom = loadImage("../virtual pet images/Wash Room.png");
 sadDog = loadImage("../virtual pet images/Lazy.png");
}

function setup() {
	createCanvas(800, 500);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()
  dog = createSprite(600,340,10,10);
  dog.addImage(dogImg)
  dog.scale=0.30
 
  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("Feed Drago !!")
  feed.position(700,95)
  feed.mousePressed(FeedDog);
 
  add = createButton("Add Food")
  add.position(850,95)
  add.mousePressed(AddFood)

// read game state from database
 readState = database.ref('gameState');
 readState.on("value", function(data){
   gameState = data.val();
 });

} 

function draw(){
 background(46,139,87);

  foodobject.display()
 
 if(gameState!= Hungry){
   feed.hide();
   add.hide();
   dog.remove();
 }else{
   feed.show();
   add.show();
   dog.addImage(sadDog);
 }

  drawSprites();

 currentTime = hour();
 if(currentTime==(lastFed+1)){
   update("Playing");
   foodObject.garden();
 }else if(currentTime==(lastFed+2)){
   update("Sleeping");
   foodObject.bedroom();
 }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
   update("Bathing");
   foodObject.washroom();
 }else{
   update("Hungry");
   foodObject.display();
 }

 //display the text
 fill(255,255,254);
 textSize(25);
 textFont("Comic Sans MS");
 text("Last Feed : 5:00 P. M",50,50);
 drawSprites();
}
function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}

function showError(){
  console.log("Error in writing to the database");
}

function writePosition(nazo){
  if(nazo>0){
    nazo=nazo-1
  }
  else{
    nazo=0
  }
  database.ref('/').set({
    'Food': nazo
  })

}
function AddFood(){
position++
database.ref('/').update({
  Food:position
}
)}

function FeedDog(){

dog.addImage(happyDog)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}

function update(state){
  database.ref('/').update({
    gameState:state
  });
}