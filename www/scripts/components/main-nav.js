/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header');

		header.find('.burgerButton').click(function(){
			header.toggleClass('state_open')
		});
	});
});