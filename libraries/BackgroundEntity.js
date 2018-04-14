class BackgroundEntity extends Entity{
	constructor(image,x,y,w,h){
		super(image,x,y,w,h)
	}
	move(){
		if(this.isout()){
			this.reset()
		}
		super.move();
	}
	isout(){
		return this.y>height
	}
	reset(){
		this.y=-this.h
	}
}