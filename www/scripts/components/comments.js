/* ----- comments.js ----- */

$(function() {
    $(document).ready(function() {
        $(".comments > p, .comments-live > div").on('click', function(){
            $(this).closest('.comments, .comments-live').toggleClass("state_open");

            return false;
        });
    });
});