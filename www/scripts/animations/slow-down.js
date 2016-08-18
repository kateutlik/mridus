$(document).ready(function() {
	var header = $('#header'),
		sectionTitleTransparent = $('.section-title.transparent'),
		scrollVar = $(window).scrollTop(),
		slider = $('.slowDown .slider'),
		introSection = slider.find('.slider__image img');

	$(window).scroll(function () {

		scrollVar = $(window).scrollTop();

		if (scrollVar < 215) {
			var opacity = (scrollVar * 2) / 100;
			sectionTitleTransparent.css({'opacity': opacity, 'background': 'rgba(0,0,0,0)'});
			window.requestAnimationFrame(animateIntro);
		} else {
			sectionTitleTransparent.css({'opacity': 1, 'background': 'rgba(0,0,0,1)'});
		}

		if (scrollVar === 0) {
			header.removeClass('state_scroll');
		} else {
			header.addClass('state_scroll');
		}
	});


	function animateIntro() {
		var scaleValue = 1 - (scrollVar / 261).toFixed(5) * 0.4,
			opacity = 1 - (scrollVar / 200);

		introSection.css({
			'-moz-transform': 'scale(' + scaleValue + ') translateZ(0)',
			'-webkit-transform': 'scale(' + scaleValue + ') translateZ(0)',
			'-ms-transform': 'scale(' + scaleValue + ') translateZ(0)',
			'-o-transform': 'scale(' + scaleValue + ') translateZ(0)',
			'transform': 'scale(' + scaleValue + ') translateZ(0)'

		});

		slider.css({'opacity': opacity});
	}
});