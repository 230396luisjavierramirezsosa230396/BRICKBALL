function ball (){

	this.x=width/2
	this.y=height/2+150;
	this.r=20
	this.vx=5
	this.vy=5
	this.color=0
	this.vidas=10

	this.show=function(){
		fill(255)
		ellipse(this.x,this.y,this.r,this.r)
	}

	this.move =function(){

		this.x+=this.vx;
		this.y+=this.vy;
		if(this.x>width || this.x-this.r<0)
		{

			 	this.vx=-this.vx;
		}

		if(this.y>height)
		{
			this.x=width/2
			this.y=height/2+150;
			this.vidas--	
		}
		if(this.vidas==0){
			alert("perdiste")
			background('white')
		}


	}
	this.collision=function(e){
		if(this.y<=e.y+e.h/2 && this.y>=e.y-e.h/2)
			if(this.x>=e.top && this.x<=e.bottom)
				return true;
			return false ; 
	}
}