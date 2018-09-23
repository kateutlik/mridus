/* ----- photoreports.js ----- */
$(function(){

    function initPhotoReportsSwipers() {
        $('.view_photoreports').each(function () {
            var photoreportsSlider = new Swiper($(this), {
                nextButton: $(this).find('.photoreports-button-next'),
                prevButton: $(this).find('.photoreports-button-prev'),
                autoplay: 4000,
                nested: true,
                // observer: true,
                resistanceRatio: 0,
                // setWrapperSize: true,
                autoplayDisableOnInteraction: false

            });
        });
    }

    initPhotoReportsSwipers();

});