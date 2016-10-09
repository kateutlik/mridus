/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header'),
			burgerButton = $('.burgerButton'),
			body = $('body');

		burgerButton.click(function(e){
			e.stopPropagation();
			e.preventDefault();

			body.toggleClass('state_open');
		});
	});
});