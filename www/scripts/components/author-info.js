$(document).ready(function() {
    $('.author-info__about a').click(function(e) {
        $(this).closest('.author-info__about').toggleClass('expanded');

        e.preventDefault();
    });
});