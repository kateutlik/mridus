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
            var link = 'Копировать ссылку';
            copyClipboardItem.text(link);

            } else {
                console.log('Нету вёрски');
            }

            return false;
        });

        $('.share-permalink-item').on('click', function() {
            copyToClipboard($(this).find('.share-text')[0]);
        });

        function copyToClipboard(elem) {
            // create hidden text element, if it doesn't already exist
            var targetId = "_hiddenCopyText_";
            var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
            var origSelectionStart, origSelectionEnd;
            if (isInput) {
                // can just use the original source element for the selection and copy
                target = elem;
                origSelectionStart = elem.selectionStart;
                origSelectionEnd = elem.selectionEnd;
            } else {
                // must use a temporary form element for the selection and copy
                target = document.getElementById(targetId);
                if (!target) {
                    var target = document.createElement("textarea");
                    target.style.position = "absolute";
                    target.style.left = "-9999px";
                    target.style.top = "0";
                    target.id = targetId;
                    document.body.appendChild(target);
                }
                target.textContent = elem.textContent;
            }
            // select the content
            var currentFocus = document.activeElement;
            target.focus();
            target.setSelectionRange(0, target.value.length);
            
            // copy the selection
            var succeed;
            try {
                succeed = document.execCommand("copy");
            } catch(e) {
                succeed = false;
            }
            // restore original focus
            if (currentFocus && typeof currentFocus.focus === "function") {
                currentFocus.focus();
            }
            
            if (isInput) {
                // restore prior selection
                elem.setSelectionRange(origSelectionStart, origSelectionEnd);
            } else {
                // clear temporary content
                target.textContent = "";
            }
            return succeed;
        }

        
    });
});