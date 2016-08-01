/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header'),
			burgerButton = $('.burgerButton');

		burgerButton.click(function(){
			header.toggleClass('state_open')
			burgerButton.toggleClass('state_open')
		});
	});
});