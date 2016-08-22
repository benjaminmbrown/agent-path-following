var Path = function(width,height) {

    this.radius = 15;
    this.start = createVector(0,height/3);
    this.end = createVector(width,2*height/3);
    this.init = function(){

    	this.start = createVector(random(0,height),random(0,height));
    	this.end = createVector(random(0,width),random(0,width));
    }

    this.display = function() {

            strokeWeight(this.radius * 2);
            stroke(0, 100);
            line(this.start.x, this.start.y, this.end.x, this.end.y);
            strokeWeight(1);
            stroke(0);
            line(this.start.x, this.start.y, this.end.x, this.end.y);
        
    }

}
