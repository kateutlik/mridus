/* ----- comments.js ----- */

$(function() {
    $(document).ready(function() {
        $(".comments__expand, .comments-live__expand").on('click', function(){
            $(this).closest('.comments, .comments-live').toggleClass("state_open");

            return false;
        });
    });
});