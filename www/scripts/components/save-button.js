/* ----- save-button.js ----- */

$(function() {
    $(document).ready(function() {
        $('.save__button').on('click', function(){
            $(this).toggleClass('save__button-saved');
            $(this).find("span").toggleClass('save__button-hidden');
            return false;
        });
    });
});