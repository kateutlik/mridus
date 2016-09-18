$(document).ready(function () {
	var body = $('body'),
		filter = $('.filter');

	filter.on('click', 'li.view_noEmpty', function (e) {
		$(this).toggleClass('view_selected');
	});

	$('.filter-open').click(function (e) {
		e.stopPropagation();
		e.preventDefault();

		var filterName = $(this).data('filter');

		$('.' + filterName).addClass('view_open');
		body.addClass('state_fixed');
	});

	filter.find('.filter__close, .filter__removeButton, .filter__applyButton').click(function (e) {
		e.stopPropagation();
		e.preventDefault();

		var filter = $(this).closest('.filter');

		if($(e.target).hasClass('filter__removeButton')) {
			filter.find('.view_selected').removeClass('view_selected');
		}

		var filterName = filter.data('name'),
			selectedNumber = filter.find('.view_selected').length,
			openButton = $('[data-filter='+ filterName +']'),
			openButtonTitle = openButton.find('.filter__title');

		if (selectedNumber) {
			openButton.addClass('view_removeAll');
			openButtonTitle.text('Фильтр: ' + selectedNumber);
		} else {
			openButton.removeClass('view_removeAll');
			openButtonTitle.text(openButton.data('title'));
		}

		filter.removeClass('view_open');
		body.removeClass('state_fixed');
	});

	$('.filter__reset').click(function (e) {
		e.stopPropagation();
		e.preventDefault();

		var openButton = $(this).closest('.filter-open'),
			filterName = openButton.data('filter'),
			openButtonTitle = openButton.find('.filter__title');

		$('.' + filterName).find('.view_selected').removeClass('view_selected');

		openButton.removeClass('view_removeAll');
		openButtonTitle.text(openButton.data('title'));
	})
});