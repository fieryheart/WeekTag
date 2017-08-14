function YAnimation( canvas ) {
	var c = document.getElementById(canvas);
	this.canvas = c;
	this.context = c.getContext("2d");
}


YAnimation.prototype.lineFromTo = function(startX, startY, endX, endY, time=1, delay=0, color="#000", callback=function(){}) {

	let context = this.context;
	let k = (endY - startY) / (endX - startX);
	let lineLength = Math.sqrt(Math.pow(startX-endX, 2) + Math.pow(startY-endY, 2));
	let frame = k === Infinity ? lineLength/(time*45) :  lineLength*(1/(k*k+1))/ (time*45);
	let writeFrame;

	if (k === Infinity) {
		writeFrame = function (n) {
			context.save();
			context.beginPath();
			context.strokeStyle = color;
			context.moveTo(startX, startY);
			context.lineTo(startX, startY+n);
			context.stroke();
			context.restore();
		}
	} else {
		writeFrame = function (n) {
			context.save();
			context.beginPath();
			context.strokeStyle = color;
			context.moveTo(startX, startY);
			context.lineTo(startX+n, startY+k*n);
			context.stroke();
			context.restore();
		}
	}

	let myWrapAnimation;
	let n = 0;
	function animation() {
		context.clearRect(0, 0, canvas.width, canvas.height);

		writeFrame(n);
		if(n < lineLength) {
		    n += frame;
		    myWrapAnimation = requestAnimationFrame(animation);
		} else {
		    cancelAnimationFrame(myWrapAnimation);
		    callback();
		}
	}

	setTimeout(animation, delay);
}