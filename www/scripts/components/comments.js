/* ----- comments.js ----- */

$(function() {
    $(document).ready(function() {
        $(".comments__expand").on('click', function(){
            $(this).toggleClass("comments__expand__open");
            $(this).parentsUntil(".article").find(".comments__content").toggleClass("comments__content__open"); // здесь прописать класс раскрывающегося блока коммента
            return false;
        });
    });
});