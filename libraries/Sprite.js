class Sprite{
	constructor(image){
		this.image=image
	}
	
	draw(x,y,w,h,crop){
		if(typeof crop !== 'undefined'){
			image(this.image,x,y,w,h,crop.x,crop.y,crop.w,crop.h)	
		}
		else{
		image(this.image,x,y,w,h)
		}
	}


}