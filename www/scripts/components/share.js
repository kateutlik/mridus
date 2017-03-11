/* ----- share.js ----- */

$(function() {
    $(document).ready(function() {
        $('.share__button').on('click', function(){
            var shareEl = $('.share-container');
            var cancelBtn = shareEl.find('.share-cancel, .share-header-close');
            var body = $('body');

            if (shareEl.length) {
                body.addClass('share-open');
                cancelBtn.click(function handler() {
                    body.removeClass('share-open');
                    cancelBtn.off('click', handler);
                });

            if (window.currentArticle) {
                console.log($(window.currentArticle).attr('data-href'));
            }

            var copyClipboardItem = $('.share-permalink-item .share-text');
            // var link = window.currentArticle && $(window.currentArticle).attr('data-href') ? $(window.currentArticle).attr('data-href') : window.location.href;
            var link = 'short link';
            copyClipboardItem.text(link);

            } else {
                console.log('Нету вёрски');
            }

            return false;
        });

        
    });
});