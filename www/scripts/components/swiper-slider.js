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

            // по наведению - остановим
            $(this).mouseover(function(){
                imagesSlider.stopAutoplay();
            });
            $(this).mouseout(function(){
                imagesSlider.startAutoplay();
            });
        });
    });
});