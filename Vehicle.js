var Vehicle = function(x, y, maxSpeed, maxForce, width, height) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(0, -2);
    this.position = createVector(x, y);
    this.r = 6;
    this.maxSpeed = maxSpeed || 3;
    this.maxForce = maxForce || 0.1;
    this.mass = 155;

    this.wanderRadius = 19;
    this.wanderDistance = 4;
    this.wanderCenter = 0;
    this.wanderAngle = 0;
    this.wanderForce = createVector();

    var c = color(0,0,random(x,y));

    this.run = function() {
        this.update();
        this.borders();
        this.display();
    }

    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }


    this.followFlow = function(flowfield) {
        var desired = flowfield.lookup(this.position);
        desired.mult(this.maxSpeed);

        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);

    }


    this.seek = function(target) {
        var desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.setAngle = function(vector, value) {
        vector.x = cos(value) * vector.mag();
        vector.y = sin(value) * vector.mag();
    }

    this.wander = function() {

        this.wanderCenter = this.velocity.copy();
        this.wanderCenter.setMag(1);
        this.wanderCenter.mult(this.wanderDistance);

        var angleChange = 3

        var displacement = createVector(0, -1);
        displacement.mult(this.wanderRadius);

        this.setAngle(displacement, this.wanderAngle);
        this.wanderAngle += random(-.8, .8);

        this.wanderForce = this.wanderCenter.add(displacement);
        this.wanderForce.limit(this.maxForce);

        this.applyForce(this.wanderForce);

    }

    this.flee = function(target) {
        var desired = p5.Vector.sub(this.position, target);
        desired.setMag(1);
        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.getFuturePosition = function(target) {

        var lookahead = p5.Vector.dist(target.position, this.position) / this.maxSpeed;
        var futurePosition = target.position.copy();
        var futureVelocity = target.velocity.copy();

        futureVelocity.mult(lookahead);
        futurePosition.add(futureVelocity);

        return futurePosition;
    }

    this.pursue = function(target) {
        this.seek(this.getFuturePosition(target));
    }

    this.evade = function(target) {
        this.flee(this.getFuturePosition(target));
    }

    this.arrive = function(target) {
        var desired = p5.Vector.sub(target, this.position);
        var distance = desired.mag();
        if (distance < 100) {
            var scaledSpeed = map(distance, 0, 100, 0, this.maxSpeed);
            desired.setMag(scaledSpeed);
        } else { desired.setMag(this.maxSpeed) }

        var steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);
        this.applyForce(steer);
    }

    this.boundaries = function() {

        var desired = null;
        var d = 25;

        if (this.position.x < d) {
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > width - d) {
            desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < d) {
            desired = createVector(this.velocity.x, this.maxspeed);
        } else if (this.position.y > height - d) {
            desired = createVector(this.velocity.x, -this.maxspeed);
        }

        if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            var steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    };

    this.update = function() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }

    this.display = function() {
        var theta = this.velocity.heading() + PI / 2;
       
        fill(c);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
}
