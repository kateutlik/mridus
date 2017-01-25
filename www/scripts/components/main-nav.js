/* ----- main-nav.js ----- */

$(function() {
	$(document).ready(function() {
		var header = $('#header'),
			burgerButton = $('.burgerButton'),
			body = $('body');

		var scrollTop;

		burgerButton.click(function(e){
			e.stopPropagation();
			e.preventDefault();

			body.toggleClass('state_open');
		});

		$('.header__loginButton').on('click', function() {
			body.removeClass('state_open');
			scrollTop = document.body.scrollTop;
			body.addClass('state_open_registration');
			$('.registration').tabs({
                active: 1
            });
			return false;
		});

		$('.header__readLater').on('click', function() {
			body.removeClass('state_open');
			scrollTop = document.body.scrollTop;
			body.addClass('state_open_saved');
			return false;
		});

		$('.registartion__wrapper .filter__close').on('click', function() {
			body.removeClass('state_open_registration');
			document.body.scrollTop = scrollTop;
		});

		$('.saved__wrapper .filter__close').on('click', function() {
			body.removeClass('state_open_saved');
			document.body.scrollTop = scrollTop;
		});
	});
});