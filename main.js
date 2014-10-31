$(document).on('ready', function() {

	var reset = function () {
		TweenMax.set($('#box'), {clearProps: 'all'});
	};

	CSSPlugin.defaultTransformPerspective = 500;

	$('#card-flip').on('click', function(){
		TweenMax.to(box, 6, {rotationY: 360, transformOrigin: "", onComplete: reset});
	});


	$('#axis-card-flip').on('click', function(){
		TweenMax.to(box, 3, {rotationY: 360, transformOrigin: "left top", onComplete: reset});
	});


	$('#orbiting').on('click', function(){
		TweenMax.to(box, 4, {rotationY: 360, transformOrigin: "left 50% -200", onComplete: reset});
	});


	$('#crazy-motion').on('click', function(){
		TweenMax.to(box, 3, {rotation: "-170_short", rotationY: "-=360_cw", rotationX: "1.5rad_cw", onComplete: reset});
	});

	$('#').on('click', function(){});


  

}); // jQuery


// https://greensock.com/get-started-js#loading