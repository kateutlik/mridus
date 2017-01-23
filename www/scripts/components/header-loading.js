/* ----- header-loading.js ----- */

$(function() {
    $(document).ready(function() {
        var headerLoading = $('.header_article .header__loading');

        if(!headerLoading) return;

        var body = $('body');
        var articles = $('.article__container');

        if (!articles.length) {
            console.log('не настроена вёрстка. Используйте .article__container класс');
            return false;
        }

        if (articles.length === 1) {
            var article = articles[0];
        } else {
            var article = setCurrentVisibleEl(articles);
        }

        window.currentArticle = article;

        if(article) {
            var rect = article.getBoundingClientRect();
            translatePercent = Math.round(rect.bottom * 100 / rect.height);

            if(!(translatePercent > 0)) {
                translatePercent = 100;
            }

            headerLoading.css('transform', 'translate(-' + translatePercent + '%)');
        }

        $(window).on('scroll touchmove', $.throttle(200,function(){

            article = articles.length > 1 ? setCurrentVisibleEl(articles) : article;
            window.currentArticle = article;

            if(article) {
                var rect = article.getBoundingClientRect();
                translatePercent = Math.round(rect.bottom * 100 / rect.height);

                if(!(translatePercent > 0)) {
                    translatePercent = 100;
                }

                headerLoading.css('transform', 'translate(-' + translatePercent + '%)');
            } else {
                translatePercent = 100;

                headerLoading.css('transform', 'translate(-' + translatePercent + '%)');
            }
        }));
    });

    function setCurrentVisibleEl(articles) {
        var result;
        for(var i = 0; i < articles.length; i++) {
            if(isElementVisible(articles[i])) {
                result = articles[i];

                break;
            }
        }

        return result;
    }

    function isElementVisible(el) {

        var r, html;
        if (!el || 1 !== el.nodeType) { return false; }
        html = document.documentElement;
        r = el.getBoundingClientRect();

        return (!!r
            && r.bottom >= 0
            && r.right >= 0
            && r.top <= html.clientHeight
            && r.left <= html.clientWidth
        );
    }
});
