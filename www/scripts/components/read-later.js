/* ----- player.js ----- */

$(function() {
    $(document).ready(function() {
        $(".countersBlock__item-readLater, .saveButton").on('click', function () {
            $(this).toggleClass("view_saved");
            $(this).find("span").toggleClass("state_hidden");

            return false;
        });
    });
});

