$(document).on('ready', function() {

	var reset = function () {
		TweenMax.set($('#box'), {clearProps: 'all'});
		TweenMax.killTweensOf($('#box'));
	};

	$('#animation-container').on('click', function() {
		reset();
	});

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



// GREEN PULSE

	$('#green-pulse').on('mouseenter', function(){
		TweenMax.fromTo(box, 0.9, {
			boxShadow: "0px 0px 0px 0px rgba(5, 255, 5, .3)"
		},
		{
			boxShadow: "0px 0px 40px 20px rgba(5, 255, 5, .8)",
			repeat: -1,
			yoyo: true,
			ease: Linear.easeNone
		});
	});
	
	// $('#green-pulse').on('mouseleave', function() {
	// 	reset();
	// });


// WHITE BLUR

	$('#white-blur').on('mouseover', function(){
		TweenMax.to(box, 0.9, {
			boxShadow: "0px 0px 50px 40px rgba(255, 255, 255, .3)",
			backgroundColor: "#FFF",
			color: "#AAA"
		});
	});




// ORANGE GLOW
	
	$('#orange-glow').on('mouseover', function(){
		TweenMax.to(box, 0.9, {
			boxShadow: "0px 0px 50px 40px rgba(255, 190, 0, .9)",
			backgroundColor: "rgba(255, 190, 0, .9)",
			borderColor: "rgba(255, 190, 0, .9)"
		});
	});

	// $('#orange-glow').on('mouseleave', function() {
	// 	reset();
	// });


	// $('#animation-container').on('click', function() {
	// 	Tween.pause();
	// });

}); // jQuery


// https://greensock.com/get-started-js#loading
