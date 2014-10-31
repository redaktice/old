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



//we'll use a window.onload for simplicity, but typically it is best to use either jQuery's $(document).ready() or $(window).load() or cross-browser event listeners so that you're not limited to one.
$('#pikachu-btn').on('click', function(){
    var pikachu = document.getElementById("pikachu");
    TweenLite.to(pikachu, 1, {left:"632px"});

// var tl = new TimelineLite(yoyo:true);
//     tl.to(pokeball, .5, {top:"-150px"})
//     .to(pikachu, .5, {top:"-150px"})
//     .to(pokeball, .5, {top:"-10px"})
//     .to(pikachu, .5, {top:"-10px"});

    var pokeball = document.getElementById("pokeball");
    TweenLite.to(pokeball, 2, {left:"632px", delay: 1});
  TweenMax.to(pokeball, 0.2, {top:"-50px", delay: 1});
  TweenMax.to(pokeball, 0.2, {top:"-90px", delay: 1.2});
  TweenMax.to(pokeball, 0.2, {top:"-120px", delay: 1.4});
  TweenMax.to(pokeball, 0.2, {top:"-140px", delay: 1.6});
  TweenMax.to(pokeball, 0.2, {top:"-150px", delay:1.8});
  TweenMax.to(pokeball, 0.2, {top:"-140px", delay: 2.0});
  TweenMax.to(pokeball, 0.2, {top:"-120px", delay: 2.2});
  TweenMax.to(pokeball, 0.2, {top:"-90px", delay: 2.4});
  TweenMax.to(pokeball, 0.2, {top:"-50px", delay: 2.6});
  TweenMax.to(pokeball, 0.2, {top:"-10px", delay: 2.8});
  TweenMax.to(pokeball, 2, {left:"0px", delay: 3});
  TweenLite.to(pikachu, 2, {left:"0px", delay: 3});

    // tl.play();


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
