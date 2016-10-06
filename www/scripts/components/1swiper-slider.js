/* ----- swiper-slider.js ----- */

$(function() {
    $(document).ready(function() {
        $('.slider').each(function () {
            var imagesSlider = new Swiper($(this), {
                pagination: $(this).find('.swiper-pagination'),
                paginationClickable: true,
                loop: true,
                nested: true,
                autoplay: 9000, // скорость
                autoplayDisableOnInteraction: true,
                observeParents: true,
                observer: true
            });
        });

        $('.slider-page').each(function () {
            var imagesSlider = new Swiper($(this), {
                loop: true,
                nested: true,
                autoplayDisableOnInteraction: true,
                observeParents: true,
                observer: true
            });
        });


    });
});