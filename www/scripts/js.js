$(document).ready(function() {
    $('.sticky').Stickyfill();
});

$(function(){

    function initOpinionSwipers() {
        $('.view_opinion').each(function () {
            var opinionSlider = new Swiper($(this), {
                nextButton: $(this).find('.opinion-button-next'),
                prevButton: $(this).find('.opinion-button-prev'),
                autoplay: 4000,
                nested: true,
                // observer: true,
                resistanceRatio: 0,
                // setWrapperSize: true,
                autoplayDisableOnInteraction: false

            });

            /* текущий слайд */
            var currentPlaceholder = $(this).find('#opinion__slideCurrent');
            currentPlaceholder.html(opinionSlider.activeIndex + 1);

            opinionSlider.on('SlideChangeEnd', function () {
                currentPlaceholder.html(opinionSlider.activeIndex + 1);
            });

            /* сколько всего */
            var slides = opinionSlider.slides.size();
            $(this).find('#opinion__slideTotal').html(slides);

        });
    }

    initOpinionSwipers();

});




