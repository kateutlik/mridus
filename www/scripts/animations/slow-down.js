$(window).scroll(function(){
	var scrollVar = $(window).scrollTop();

	if(scrollVar < 70) {
		$('#header').addClass('state_scroll');
		var opacity = (scrollVar * 2) / 100;
		$('.section-title.transparent').css({'opacity': opacity, 'background': 'rgba(0,0,0,0)'});
		$('.slowDown .slider').height(261 - scrollVar * 2);
		$('.slowDown__overlay').css({'opacity': opacity});
	} else {
		$('#header').addClass('state_scroll');
		$('.section-title.transparent').css({'opacity': 1, 'background': 'rgba(0,0,0,1)'});
		$('.slowDown .slider').height(123);
		$('.slowDown__overlay').css({'opacity': 1.38});
	}

	if(scrollVar === 0){
		$('#header').removeClass('state_scroll');
	}
});