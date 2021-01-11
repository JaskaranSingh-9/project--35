//Create variables here
var dog, dogHappy, dogSad;
var db, foodS, foodStock;
var fedTime, lastFed, feed, addFood1, foodObj;

function preload(){
    dogImg = loadImage("images/dogImg.png");
    dogImg1 = loadImage("images/dogImg1.png");
}
function setup() {
  createCanvas(1000, 500);
  foodObj = new Food();

  database = firebase.database();
  dog = createSprite(800, 200, 10, 10);
  dog.addImage(dogImg);
  dog.scale = 0.2

  feed = createButton("FEED");
  feed.position(1100, 60);
  feed.mousePressed(feedDog);

  addFood1 = createButton("ADD FOOD");
  addFood1.position(1200, 60);
  addFood1.mousePressed(addFood);

foodStock = database.ref('Food');
foodStock.on("value", readStock);
}

function draw() {  
  background("yellow");
foodObj.display();

fedTime = database.ref('fedTime');
fedTime.on('value', function(data){
  lastFed = data.val();
})
if(lastFed >=12){
  text("LAST FEED :" + lastFed % 12 + 'pm', 350, 30);
} else if(lastFed === 0){
  text("LAST FEED : 12 am", 350, 30);
}else {
  text("LAST FEED :"+ lastFed+'am', 350, 30);
}
  drawSprites();
  
} 
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}
function feedDog(){
  dog.addImage(dogImg1)
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food:foodObj.getFoodStock(), fedTime:hour()
  })
}
function addFood(){
  dog.addImage(dogImg)
  foodS=foodS+1;
  database.ref('/').update({
    Food:foodS,
  })
}





