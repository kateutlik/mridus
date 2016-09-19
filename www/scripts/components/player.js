/* ----- player.js ----- */

$(function() {
    $(document).ready(function() {

        function initJwPlayerTranslations(id, height, el) {
            var instant;

            var toID = el.find(".translationPlaceholder:visible").attr("id"); // look for placeholder element

            if (!id) {
                return;
            }

            instant = (jwplayer(id).setup({
                width: "100%",
                height: height,
                playlist: [{
                    image: el.data('image'),
                    sources: [{
                        file: el.data('source1')
                    }, {
                        file: el.data('source2')
                    }, {
                        file: el.data('source3')
                    }]
                }],
                skin: {
                    name: "seven",
                    active: "#ffd051"
                }
            }));

            return instant;
        }

        function initTranslation(el) {
            initJwPlayerTranslations(el.find(".translationPlaceholder:visible").attr("id"), 170, el);
        }

        function initPlayers() {
            $('[data-translation]').each(function(i, el){
                initTranslation($(el));
            });
        }


        initPlayers();
    });
});