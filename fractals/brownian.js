let speed = 10;

let canvasWidth = 500;
let canvasHeight = 500;

let iterations = 500;
function setup() {
    var canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent("canvasDiv");
    pixelDensity(1);
    noLoop();
    begin();
}

function begin() {

    background(255);
    iterations = document.getElementById("iterationsCount").value;
    // start in center of screen
    let x = width / 2;
    let y = height / 2;

    noFill();
    stroke(0);
    strokeWeight(2);
    strokeCap(ROUND);
    beginShape();
    for (let i = 0; i < iterations; i++) {

        vertex(x, y);
        x += random(-speed, speed);
        y += random(-speed, speed);
    }
    endShape();
}
function draw() {

}