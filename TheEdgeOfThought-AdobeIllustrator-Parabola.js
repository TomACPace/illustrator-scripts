
alert("A simple parabola is a graph equation of y = x-squared, \nspanning from a negative value for X to the same positive value.\n A good sample is -4");

// For whatever purposes, viewing in Illustrator, the start shouldn't be more than 4-5.
//  This works well for small start values such as -0.3.
start = parseFloat(prompt("Enter your negative X value", "-0.5"));

// A good increment is 0.01, or there about.
increment = parseFloat(prompt("Enter the increment for counting along X", 0.01) );

// 300-400 is good to scale up from a point-based graph to an easily viewed and printable image
scale = parseFloat(prompt("Enter the scale for easy viewing in Illustrator", 400));

// Stroke width is good at 0.5 for a point-based graph but may be too fine for printing, 
//  but that responsibility is left for the user
strokewidth = 0.5; 
drawParabola(start, increment, strokewidth, scale);
redraw();

function drawParabola(starti, increment, strokewidth, scale) {


	var linescale = scale;
	// Colours
	var redColour = new RGBColor(); redColour.red = 255;
	var blueColour = new RGBColor(); blueColour.blue = 255;
	var blackColour = new RGBColor(); 
	
	var myDoc = app.activeDocument;//.documents.add();
	var myParabolaPath = myDoc.pathItems.add();
	myParabolaPath.stroked = true;
	myParabolaPath.strokeWidth = strokewidth;
	myParabolaPath.filled = false;
	
	
	var newPoint;
	for (i = starti; i <= Math.abs(starti); i+= increment ) {
		newPoint = myParabolaPath.pathPoints.add();
		newPoint.anchor = [i  * scale, i*i  * scale];
		//giving the direction points the same value as the 
		//anchor point creates a straight line segment
		newPoint.leftDirection = newPoint.anchor;
		newPoint.rightDirection = newPoint.anchor;
		newPoint.pointType = PointType.CORNER;	
		
	}


	// X-axis
	var axisX = myDoc.pathItems.add();
	axisX.filled = false;
	axisX.stroked = true;
	axisX.strokeWidth = strokewidth;
	axisX.strokeColor = redColour;
	newPoint = axisX.pathPoints.add();
	newPoint.anchor=[starti  * scale, 0 * scale];
	newPoint.leftDirection = newPoint.anchor;
	newPoint.rightDirection = newPoint.anchor;

	newPoint = axisX.pathPoints.add();
	newPoint.anchor=[Math.abs(starti) * scale, 0 * scale];
	newPoint.leftDirection = newPoint.anchor;
	newPoint.rightDirection = newPoint.anchor;


	// Y-axis

	var axisY = myDoc.pathItems.add();
	axisY.filled = false;
	axisY.stroked = true;
	axisY.strokeWidth = strokewidth;
	axisY.strokeColor = blueColour;

	newPoint = axisY.pathPoints.add();
	newPoint.anchor=[0 * scale, Math.abs(starti) * scale];
	newPoint.leftDirection = newPoint.anchor;
	newPoint.rightDirection = newPoint.anchor;

	newPoint = axisY.pathPoints.add();
	newPoint.anchor=[0 * scale, starti * scale];
	newPoint.leftDirection = newPoint.anchor;
	newPoint.rightDirection = newPoint.anchor;
	
	
	// Top, left, width, height
	var focusPath = myDoc.pathItems.ellipse((0.25+increment*2) * scale, -increment*2  * scale, increment*4 * scale, increment*4 * scale);
	focusPath.stroked = true;
	focusPath.filled = false;
	focusPath.strokeWidth = strokewidth;
	
	var focusPathDot = myDoc.pathItems.ellipse((0.25+increment/2) * scale, -increment/2 * scale, increment * scale, increment * scale);
	focusPathDot.stroked = false;
	focusPathDot.filled = true;
	focusPathDot.fillColor = blackColour;
}

