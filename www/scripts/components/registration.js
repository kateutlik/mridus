/* ----- tabs.js ----- */

$(function() {
    $(document).ready(function() {
        var registrationTabs = $('.registration');

        if(registrationTabs.length) {
            registrationTabs.tabs({
                active: !~window.location.hash.indexOf('in') ? 0 : 1
            });
        }
    });
});
