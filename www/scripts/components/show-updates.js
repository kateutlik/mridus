/* ----- show-updates.js ----- */

$(function() {
    $(document).ready(function() {
        $('.show-updates').on('click', function(){
            $(this).toggleClass('show-updates__open');
            $(this).find("a").toggleClass('show-updates__open__expand');
            return false;
        });
    });
});