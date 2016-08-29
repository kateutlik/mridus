/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header'),
			burgerButton = $('.burgerButton'),
			body = $('body');

		burgerButton.click(function(e){
			e.stopPropagation();
			e.preventDefault();

			header.toggleClass('state_open');
			burgerButton.toggleClass('state_open');
			body.toggleClass('state_fixed');
		});
	});
});