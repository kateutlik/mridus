/* ----- page-table.js ----- */

$(function() {
    $(document).ready(function () {
        $(".pageTabs__item").on('click', function () {

            var wrapper = $(this).attr("data-wrapper");

            if (wrapper) {

                var page = $(this).attr("data-url");
                var target = $(this).attr("data-target");
                var _this = $(this);

                var container = $("#" + target);
                var heightStill = $(window).height();
                var widthStill = $(window).width();

                container.height(heightStill); // установим высоту, чтоб при удалении не схлопнулась

                // добавляем спиннер
                $.ajax({
                        url: "../components/_md-preloader.html"
                    })
                    .done(function (html) {
                        container.html(html);

                        //устанавливаем ширину, чтобы видеть спиннер
                        //container.width(widthStill);

                        //$("#" + wrapper).removeClass(currentClass).addClass(bgClass);

                        $(".pageTabs__item.state_current").removeClass("state_current");
                        _this.addClass("state_current");
                    });


                // имитируем загрузку контента - при вставке реального кода УДАЛИТЬ обертку в таймаут!!!
                setTimeout(function () {
                    $.ajax({
                            url: page,
                            cache: false
                        })
                        .done(function (html) {
                            //добавляем новый контень
                            container.html(html);
                        })
                        .fail(function () {
                            // console.log( "error" );
                        })
                        .always(function () {
                            container.height(""); // обнулим высоту
                            initJwPlayerTranslations($(".translationPlaceholder:visible").attr("id"), 170, $('.translation__wrapper'));
                        });
                }, 1000);

                return false;
            }
        });

        function initJwPlayerTranslations(id, height, el) {
            var instant;

            var toID = el.find(".translationPlaceholder:visible").attr("id"); // look for placeholder element

            if (!id) {
                return;
            }

            instant = (jwplayer(id).setup({
                width: "100%",
                height: height,
                autostart: true,
                mute: true,
                repeat: true,
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
    });
});