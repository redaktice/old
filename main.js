$(document).on('ready', function() {

	CSSPlugin.defaultTransformPerspective = 500;

	$('#card-flip').on('click', function(){
		// TweenMax.to(box, 9, {rotationY: 360, transformOrigin: ""})
	});


	$('#axis-card-flip').on('click', function(){
		// TweenMax.to(box, 3, {rotationY: 360, transformOrigin: "left top"})
	});


	$('#axis-card-flip').on('click', function(){
		TweenMax.to(box, 3, {rotation: "-170_short", rotationY: "-=360_cw", rotationX: "1.5rad_cw", onComplete: myFunction});
		function myFunction () {
			TweenMax.killAll();
		
	});

	$('#').on('click', function(){});
  

}); // jQuery