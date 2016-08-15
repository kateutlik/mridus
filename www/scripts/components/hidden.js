/* ----- hidden.js ----- */

$(function() {
    $(document).ready(function() {
        $(".hidden").on('click', function () {

            var what = $(this).attr("data-id");

            $("#"+what).slideToggle(150).toggleClass("hidden__hide");
            $(this).find("span").toggleClass("hidden__hide");

            return false;
        });
    });
});