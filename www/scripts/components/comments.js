/* ----- comments.js ----- */

$(function() {
    $(document).ready(function() {
        var authModal = $('.comments__auth');
        var commentBtn = $('.page .comments__comment-button');
        var modalVisibleClass = 'visible-modal';
        var modalOpenClass = 'comments-modal-opened';

        var preventSubmitElements = authModal.find('.yellowButton, .socials');

        var scrollTopBeforeOpen;

        // comments answer modal
        var answerModal = $('.comments__answer-modal');
        var answerBtns = $('.comments__answer');


        var openedModal;
        
        initNiceSelect();

        $(".comments > p, .comments-live > div").on('click', function(){
            $(this).closest('.comments, .comments-live').toggleClass("state_open");

            return false;
        });

        commentBtn.on('click', addComment);
        answerBtns.on('click', addAnswer);


        function addComment() {
            showModal(authModal);
        }

        function addAnswer() {
            showModal(answerModal);
           
            var contentEl = answerModal.find('.comments__answer-modal-question');
            contentEl.empty();
            contentEl.append($(this).closest('li').find('.comments__avatar, .comments__body').clone());

            answerModal.find('.comments__textarea').focus();
            document.body.scrollTop = 300;

            answerModal.find('.comments__comment-button').on('click', closeModalHandler);
        }

        function showModal(modal) {
            openedModal = modal;
            scrollTopBeforeOpen = document.body.scrollTop;

            modal.addClass(modalVisibleClass);

            $(document.body).addClass(modalOpenClass);

            document.body.scrollTop = 0;

            modal.find('.filter__close').on('click', closeModalHandler);

            // TODO: remove this listener
            preventSubmitElements.on('click', preventSubmit);
        }

        function closeModalHandler() {
            openedModal.removeClass(modalVisibleClass);
            $(document.body).removeClass(modalOpenClass);

            $(this).off('click', closeModalHandler);

            preventSubmitElements.off('click', preventSubmit);
            document.body.scrollTop = scrollTopBeforeOpen;
        }

        function preventSubmit() {
            return false;
        }

        function getData($el)  {
            return {
                img: $el.find('img')[0].src,
                text: $el.find('p').text()
            };
        }

        function setData(data) {
            answerModal.find('.comments__answer-modal-question img')[0].src = data.img;
            answerModal.find('.comments__answer-modal-question p').text(data.text);
        }

         function initNiceSelect() {
            $('.comments__select').niceSelect();

            var liElements = $('.page .comments__body .nice-select li');
            
            liElements.on('click', function () {
                $(this).closest('.nice-select').css('background-color', $(this).css('background-color'));
            });
        }
    });
});