var Flowfield = function(r) {

    this.resolution = r;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.timeIncrement = 0;

    this.create2DArray = function(n) {
        var array = [];
        for (var i = 0; i < n; i++) {
            array[i] = [];
        }
        return array;
    }

    this.field = this.create2DArray(this.cols);
    console.log('field', this.field);

    this.init = function() {
        var xoff = 0;

        for (var i = 0; i < this.cols; i++) {
            var yoff = 0;
            for (var j = 0; j < this.rows; j++) {

                var theta = map(noise(xoff, yoff, this.timeIncrement), 0, 1, 0, 10);
                //polar to cartesian
                //this.field[i][j] = createVector(1,0);
                //this.field[i][j] = p5.Vector.random2D();// random vector
                //this.field[i][j] = createVector(cos(theta), sin(theta)); // perlin noise based
                //this.field[i][j] = createVector(cos(theta), sin(theta));
                yoff += 0.1;
            }
            xoff += 0.1;
        }
        this.timeIncrement += 0.5;
    }

  //  this.init();

    this.lookup = function(lookup) {
        var col = Math.floor(constrain(lookup.x / this.resolution, 0, this.cols - 1));
        var row = Math.floor(constrain(lookup.y / this.resolution, 0, this.rows - 1));
        return this.field[col][row].copy();
    }

    //draws arrows for vectors
    var drawVector = function(v, x, y, scayl) {
        push();
        var arrowSize = 7;
        translate(x, y);
        stroke(200, 100);
        rotate(v.heading());
        var length = v.mag() * scayl;
        line(0, 1, length, 0);
        pop();


    }
    this.update = function() {

    }


    this.display = function() {
                var xoff = 0;
        for (var i = 0; i < this.cols; i++) {
            var yoff = 0;
            for (var j = 0; j < this.rows; j++) {
                var theta = map(noise(xoff, yoff, this.timeIncrement), 0, 1, 0, 10);
                this.field[i][j] = createVector(cos(theta), sin(theta));
               // this.field[i][j] = p5.Vector.random2D();
                drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);

                yoff += 0.1;
            }
            xoff += 0.1;
        }
        this.timeIncrement += 0.010;
    }
}
