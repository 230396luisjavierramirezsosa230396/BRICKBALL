function block(x,y){
	this.x=x
	this.y=y +40
	this.w=80
	this.h=40
	this.color1 = random(100);
	this.color2 = random(100);
	this.color3 = random(100);

	//this.r=80  
	this.top=this.x-this.w/2
	this.bottom=this.x+this.w/2

	const speed = 24

	this.show=function (){
		rectMode(CENTER)
		stroke('rgb(0,255,0)');
		strokeWeight(6);
		fill(this.color1,this.color2,this.color3);
		rect(this.x,this.y,this.w,this.h)
	}
}

	