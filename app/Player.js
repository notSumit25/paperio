
export class Player{
   cursorX;
   cursorY;
   color;
   size;
   trail=[];
   Score;
   context;

   Player(context,color)
   {
    this.context=context;
    this.cursorX=0;
    this.cursorY=0;
    this.trail=[];
    this.color="black";
   }
   
   setCursor(X,Y)
   {
    this.cursorX=X;
    this.cursorY=Y;
   }

   pushInTrail(X,Y)
   {
      if(X&&Y){
    this.trail.push({x:X,y:Y});
      }
   }
}