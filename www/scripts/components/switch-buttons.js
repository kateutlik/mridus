$(function() {
	$(document).ready(function () {
		var genderSwitch = document.querySelectorAll('.js-switch-gender');

		if (genderSwitch.length) {
			var genderSwitchery = new Switchery(genderSwitch[0], {
				color: '#fC73d0',
				secondaryColor: '#69A1E2'
			});
		}


		var jsSwitchSocialsElems = Array.prototype.slice.call(document.querySelectorAll('.js-switch-socials'));

		if (jsSwitchSocialsElems.length) {

			jsSwitchSocialsElems.forEach(function(html) {
				var switchery = new Switchery(html, {
					size: 'small'
				});
			});

			/* изменяющиеся лэйблы по клику */
			function checkLabel() {

				var changeCheckboxWrapper = $(".myprofileSocials__switchWrapper");

				changeCheckboxWrapper.each(function(){
					var checkbox = $(this).find(".js-switch-socials");
					var label = $(this).find(".myLabel");
					if ($(checkbox).is(":checked")) {
						label.addClass("view_online");
					} else {
						label.removeClass("view_online");
					}
				})
			}

			checkLabel();

			$(jsSwitchSocialsElems).change(function() {
				checkLabel();
			});
		}
	});
});