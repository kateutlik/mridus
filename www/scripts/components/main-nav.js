/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header'),
			burgerButton = $('.burgerButton');

		burgerButton.click(function(e){
			e.stopPropagation();
			e.preventDefault();

			header.toggleClass('state_open');
			burgerButton.toggleClass('state_open');
		});
	});
});