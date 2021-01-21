class Food {
  constructor(){
  this.foodStock=0;
  this.image=loadImage('Milk.png');
  this.image.scale = 1.5;
  }

  bedroom(){
    background(bedroom, 550, 500);
  }
  washroom(){
    background(washroom, 550, 500);
  }
  garden(){
    background(garden, 550,500);
  }
 updateFoodStock(foodStock){
  this.foodStock=foodStock;
 }

 deductFood(){
   if(this.foodStock>0){
    this.foodStock=this.foodStock-1;
   }
  }

  getFoodStock(){
    return this.foodStock;
  }

  display(){
    var x=1200,y=90;
    
    imageMode(CENTER);
 
    
    if(this.foodStock!=0){
      for(var i=0;i<this.foodStock;i++){
        if(i%10==0){
          x=120;
          y=y+120;
        }
        image(this.image,x,y,80,80);
        x=x+35;
      }
    }
  }
}
