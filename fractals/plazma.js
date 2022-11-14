let isPainted = [];
let zoom = 2.5;
let zMin = 0.5;
let zMax = 5;
let sens = 0.001;

let dark = false;

let dimension = 0;
if (window.innerWidth < 768) {
    dimension = Math.round(window.innerWidth * 0.9);
} else {
    dimension = Math.round(window.innerHeight * 0.8);
}

var maxiterations = 100;


const colorsRed = [];
const colorsGreen = [];
const colorsBlue = [];


$( window ).resize(function() {
    if (window.innerWidth < 768) {
        dimension = Math.round(window.innerWidth * 0.9);
    } else {
        dimension = Math.round(window.innerHeight * 0.8);
    }
    resizeCanvas(dimension, dimension);
});










let canvasWidth=500;
let canvasHeight=500;
let iterations = 0;

function setup() {
	var canvas = createCanvas(canvasWidth, canvasHeight);
	canvas.parent("canvasDiv");
	pixelDensity(1);
	beginning();

}
var k = 0;

function draw() {


	loadPixels();
	
	for (var i = 0; i < width * height; i++) {
		var pix = i * 4;

		pixels[pix + 0] = colorsRed[i];
		pixels[pix + 1] = colorsGreen[i];
		pixels[pix + 2] = colorsBlue[i];
		pixels[pix + 3] = 255;
	}
			
	
	updatePixels();
}









function beginning() {
	colorMode(RGB, 255);
	isPainted = [];
	let val = document.getElementById("TopLeft").value;
	let r = parseInt(val.substr(1, 2), 16)
	let g = parseInt(val.substr(3, 2), 16)
	let b = parseInt(val.substr(5, 2), 16)
	colorsRed[0] = r;
	colorsGreen[0] = g;
	colorsBlue[0] = b;

	isPainted[0] = 1;

    val = document.getElementById("TopRight").value;
	r = parseInt(val.substr(1, 2), 16)
	g = parseInt(val.substr(3, 2), 16)
	b = parseInt(val.substr(5, 2), 16)
	colorsRed[canvasWidth-1] = r;
	colorsGreen[canvasWidth - 1] = g;
	colorsBlue[canvasWidth - 1] = b;

	isPainted[canvasWidth - 1] = 1;


	val = document.getElementById("BottomLeft").value;
	r = parseInt(val.substr(1, 2), 16)
	g = parseInt(val.substr(3, 2), 16)
	b = parseInt(val.substr(5, 2), 16)
	colorsRed[(canvasWidth * canvasHeight) - canvasWidth] = r;
	colorsGreen[(canvasWidth * canvasHeight) - canvasWidth] = g;
	colorsBlue[(canvasWidth * canvasHeight) - canvasWidth] = b;

	isPainted[(canvasWidth * canvasHeight) - canvasWidth] = 1;

	val = document.getElementById("BottomRight").value;
	r = parseInt(val.substr(1, 2), 16)
	g = parseInt(val.substr(3, 2), 16)
	b = parseInt(val.substr(5, 2), 16)
	colorsRed[(canvasWidth * canvasHeight) - 1] = r;
	colorsGreen[(canvasWidth * canvasHeight) - 1] = g;
	colorsBlue[(canvasWidth * canvasHeight) - 1] = b;

	isPainted[(canvasWidth * canvasHeight) - 1] = 1;


	splitRect(canvasWidth, 0, canvasWidth - 1, (canvasWidth * canvasHeight) - 1, (canvasWidth * canvasHeight) - canvasWidth);


	draw();
	//for (var i = 0; i < canvasWidth * canvasWidth; i++) {

		//print("i = " + i + "  " + colorsRed[i] + " " + colorsGreen[i] + " " + colorsBlue[i]);

	//}


}



/*$("#lightScheme").change(
    function() {
        $("#hueDiv")[0].style.display = "block";
        dark = false;
        lightSchemeChange();
    }
);


$("#monochromeScheme").change(beginning);

*/


/*$("#hueRange").change(
    function() {
        if (dark) {
            darkSchemeChange();
        } else {
            lightSchemeChange();
        }
    }
);*/






function splitRect(rectWidth, p1, p2, p3, p4) {
	var side1, side2, side3, side4, center;
	iterations++;

	var rand = randomIntFromInterval(-10, 10);
	
	
	if (rectWidth > 2) {
		

		//sides are averages of the connected corners
		//p1----p2
		//|     |
		//p4----p3
		side1 = parseInt((p1 + p2) / 2);

		side2 = parseInt(((Math.trunc((Math.trunc(p2 / canvasWidth) + Math.trunc(p3 / canvasWidth)) / 2)) * canvasWidth) + (p2 % canvasWidth));

		side3 = parseInt((p3 + p4) / 2);

		side4 = parseInt((Math.trunc((Math.trunc(p4 / canvasWidth) + Math.trunc(p1 / canvasWidth)) / 2) * canvasWidth) + (p1 % canvasWidth));
		center = parseInt(side4 + Math.trunc(rectWidth/2));
		//print("vertix = " + p1 + " " + p2 + " " + p3 + " " + p4);
		//print("side = " + side1 + " " + side2 + " " + side3 + " " + side4 + " " + center);

		paintInAverageColor(p1, p2, p3, p4, center, rand,rectWidth);
		paintInAverageColor(p1, p1, p2, p2, side1, rand, rectWidth);
		paintInAverageColor(p3, p3, p4, p4, side3, rand, rectWidth);
		paintInAverageColor(p3, p3, p2, p2, side2, rand, rectWidth);
		
		paintInAverageColor(p1, p1, p4, p4, side4, rand, rectWidth);

		if (rectWidth > 3) {
			var newWidth = rectWidth/2;
			if (rectWidth % 2 != 0) newWidth += 1;

			splitRect(newWidth, p1, side1, center, side4);
			splitRect(newWidth, side1, p2, side2, center);
			splitRect(newWidth, center, side2, p3, side3);
			splitRect(newWidth, side4, center, side3, p4);
		}

	}


}


function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min)
}


function paintInAverageColor(p1, p2, p3, p4, newPixel, randomNumber, rectWidth) {
	var pixelsCount = 4;
	var avgRed=0;
	var avgGreen=0;
	var avgBlue = 0;

	avgRed += colorsRed[p1] + colorsRed[p2] + colorsRed[p3] + colorsRed[p4];
	avgGreen += colorsGreen[p1] + colorsGreen[p2] + colorsGreen[p3] + colorsGreen[p4];
	avgBlue += colorsBlue[p1] + colorsBlue[p2] + colorsBlue[p3] + colorsBlue[p4];


	var edge1=2, edge2=2;
	if (rectWidth > 100) {
		edge1 = -70;
		edge2 = 70;
	}
	else if (rectWidth >70) {
		edge1 = -50;
		edge2 = 50;
	}
	else if (rectWidth > 20)  {
		edge1 = -15;
		edge2 = 15;
	}
	else if (rectWidth > 7) {
		edge1 = -5;
		edge2 = 5;
	}

	avgRed = avgRed / pixelsCount + randomIntFromInterval(edge1, edge2);
	avgGreen = avgGreen / pixelsCount + randomIntFromInterval(edge1, edge2);
	avgBlue = avgBlue / pixelsCount + randomIntFromInterval(edge1, edge2);

	if (isPainted[newPixel] != 1) {
		colorsRed[newPixel] = parseInt(avgRed);
		colorsGreen[newPixel] = parseInt(avgGreen);
		colorsBlue[newPixel] = parseInt(avgBlue);
		isPainted[newPixel] = 1;
    }
	
	
}