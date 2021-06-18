//Create variables here

var dog, happyDog;
var database;
var foodS;
var foodStock;
var dogImage, happyDogImage;
var bedroomImage, gardenImage, washroomImage, livingRoomImage;
var readState, changeState;
var milkBottle1, milkBottle2;

function preload()
{
	//load images here
  dogImage = loadImage("images/sadDog.png");
  happyDogImage = loadImage("images/Happy.png");
  bedroomImage = loadImage("images/Bed Room.png");
  gardenImage = loadImage("images/Garden.png");
  washroomImage = loadImage("images/Wash Room.png");
  milkImage = loadImage("images/milk.png");
  livingRoomImage = loadImage("images/Living Room.png");
}

function setup() {
	database = firebase.database();

  createCanvas(800, 500);

  foodObject = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(700, 400, 150, 150);

  dog.addImage(dogImage);
  dog.scale = 0.25;

  milkBottle1 = createSprite(140, 435, 10, 10);
  milkBottle1.addImage(milkImage);

  milkBottle2 = createSprite(210, 280, 10, 10);
  milkBottle2.addImage(milkImage);

  // feed = createButton("Feed The Dog");
  // feed.position(700, 95);
  // feed.mousePressed(feedDog);

  // addFoods = createButton("Add Food");
  // addFoods.position(800, 95);
  // addFoods.mousePressed(addFood);
}

function draw() {  
  background(46, 139, 87);

  if(gameState === 1){
    foodObject.display();
    writeStock(foodS);
  }

  if(foodS === 0){
    dog.addImage(happyDogImage);
    milkBottle2.visible = false;
  }
  else{
    dog.addImage(dogImage);
    milkBottle2.visible = true;
  }

  var gameStateRef = database.ref("gameState");
  gameState.ref().on("value", function(data){
    gameState = data.val();
  })

  if(gameState === 1){
    dog.addImage(happyDogImage);
    dog.y = 250;
  }

  if(gameState === 2){
    dog.addImage(dogImage);
    dog.y = 250;
    milkBottle2.visible = false;
  }

  var bath = createButton("I want to take bath")
  bath.position(580, 125);
  if(bath.mousePressed(function(){
    gameState = 3
    database.ref('/').update({
      'gameState' : gameState,
    });
  }));

  if(gameState === 3){
    dog.addImage(washroomImage);
    milkBottle2.visible = false;
  }

  var sleep = createButton("I am very sleep")
  sleep.position(710, 125);
  if(sleep.mousePressed(function(){
    gameState = 4,
    database.ref('/').update({
      'gameState' : gameState,
    });
  }));

  if(gameState === 4){
    dog.addImage(bedroomImage);
    milkBottle2.visible = false;
  }

  var play = createButton("I want to play")
  play.position(500, 160);
  if(play.mousePressed(function(){
    gameState = 5,
    database.ref('/').update({
      'gameState' : gameState,
    });
  }));

  if(gameState === 5){
    dog.addImage(livingRoomImage);
    milkBottle2.visible = false;
  }

  var playInGarden = createButton("I want to play in the garden")
  playInGarden.position(585, 160);
  if(playInGarden.mousePressed(function(){
    gameState = 6,
    database.ref('/').update({
      'gameState' : gameState,
    });
  }));

  if(gameState === 6){
    dog.addImage(gardenImage);
    milkBottle2.visible = false;
  }
  
  drawSprites();
  //add styles here

  fill(255, 255, 254);
  textSize(15);
  
  text("Milk Bottle Remaining: "+ foodS, 170, 440);
}

function readStock(data){
  foodS = data.val();
  foodObject.updateFoodStock(foodS);
}

function addFood(){
  foodS++;
  database.ref('/').update({
    Food : foodS,
  });
}

function updateState(state){
  database.ref('/').update({
    gameState : state
  });
}

function feedDog(){
  dog.addImage(happyDogImage);
  foodObject.updateFoodStock(foodObject.getFoodStock() - 1);
  database.ref('/').update({
    Food : foodObject.getFoodStock(),
    FeedTime : hour(),
  });
}

function writeStock(x){
  database.ref('/').update({
    Food: x,
  });
}