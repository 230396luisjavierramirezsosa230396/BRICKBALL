function player(){
	this.x=width/2
	this.y=height-20
	this.w=120
	this.h=20
	this.top=this.x-this.w/2
	this.bottom=this.x+this.w/2

	this.speed=8
	this.r=this.w 

	this.show=function (){
		rectMode(CENTER);
		fill('black');
		 rect(this.x,this.y,this.w,this.h)
	}

	
	this.move = function(dir){
		this.dir=dir
		if (this.dir == LEFT && this.x >= 41 ) {
				this.x-=this.speed;
			}
		else if(this.dir == RIGHT && this.x +this.w-41 <= width){
			this.x+=this.speed;
		}
			this.top=this.x-this.w/2
			this.bottom=this.x+this.w/2

	}
	
	
}