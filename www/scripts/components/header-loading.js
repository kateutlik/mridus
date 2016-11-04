/* ----- header-loading.js ----- */

$(function() {
    $(document).ready(function() {
        var headerLoading = $('.header_article .header__loading');

        if(!headerLoading) return;

        var body = $('body'),
            article = $('.article__container');

        var translatePercent = Math.round(100 - (body.scrollTop() / article.height() * 100));

        if(!(translatePercent > 0)) {
            translatePercent = 100;
        }

        headerLoading.css('transform', 'translate(-' + translatePercent + '%)');

        $(window).on('scroll touchmove', $.throttle(200,function(){
            translatePercent = Math.round(100 - (body.scrollTop() / article.height() * 100));

            if(!(translatePercent > 0)) {
                translatePercent = 100;
            }

            headerLoading.css('transform', 'translate(-' + translatePercent + '%)');
        }));
    });
});
