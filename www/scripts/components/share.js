/* ----- share.js ----- */

$(function() {
    $(document).ready(function() {
        $('.share-handler').on('click', function(){
            var shareEl = $('.share-container');
            var cancelBtn = shareEl.find('.share-cancel');
            var body = $('body');

            if (shareEl.length) {
                body.addClass('share-open');
                cancelBtn.click(function handler() {
                    body.removeClass('share-open');
                    cancelBtn.off('click', handler);
                });
            } else {
                console.log('Нету вёрски');
            }

            return false;
        });

        
    });
});