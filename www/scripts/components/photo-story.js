$(document).ready(function () {
    PhotoStory();
});

function PhotoStory() {
    var PHOTO_STORY_VISIBLE_CLASS = 'photo_story-view-visible';
    var PHOTO_STORY_CLASS = 'photo_story-view';
    var PHOTO_STORY_STARTER_ELEMENT = 'photo_story-clickable';
    var PHOTO_STORY_CLOSE_BTN_CLASS = 'photo_story-close';
    var slider;

    init();

    function init() {
        var $element = $('.' + PHOTO_STORY_STARTER_ELEMENT);
        $element.click(openPhotoStory);

        // открыть репортаж если есть в урле
        checkUrlAndOpenIfNeed();
    }

    function openPhotoStory(e, position){
        var $photoStoryView = $('.' + PHOTO_STORY_CLASS);

        if ($photoStoryView) {
            show($photoStoryView);
            slider = new Slider();
            slider.init($photoStoryView, position);
        }
    }

    function show(element) {
        togglePhotoStoryView(element);
        bindHandlers(element);
    }

    function togglePhotoStoryView(element) {
        element.toggleClass(PHOTO_STORY_VISIBLE_CLASS);
    }

    function bindHandlers(element) {
        var $closeBtn = element.find('.' + PHOTO_STORY_CLOSE_BTN_CLASS);
        // close button handler
        $closeBtn.click(closeAndCleanHandlers);

        function closeAndCleanHandlers(event) {
            togglePhotoStoryView(element);
            removeHash();
            slider.remove();

            $closeBtn.off('click', closeAndCleanHandlers);
        }
    }

    function checkUrlAndOpenIfNeed() {
        var hash = window.location.hash;
        var position = +hash.split('#')[1];

        if (hash && !isNaN(position)) {
            var $element = $('.' + PHOTO_STORY_STARTER_ELEMENT);
            if ($element) {
                openPhotoStory.call($element, undefined, position - 1);
            } else {
                removeHash();
            }
        }
    }

    function removeHash() {
        var scrollV, scrollH, loc = window.location;
        if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
        else {
            // Prevent scrolling by storing the page's current scroll offset
            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;

            loc.hash = "";

            // Restore the scroll offset, should be flicker free
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
        }
    }
}

function Slider() {

    var PHOTO_STORY_ITEM_CLASS = 'photo_story-item';
    var PHOTO_STORY_ITEM_ACTIVE_CLASS = 'photo_story-item-active';
    var PHOTO_STORY_WRAPPER = 'photo_story-content';
    var PHOTO_STORY_TOTAL_ITEMS_CLASS = 'photo_story-total';
    var PHOTO_STORY_CURRENT_ITEM_CLASS = 'photo_story-current';

    var currentPosition;
    var totalSize;
    var parentElement;
    var $elements;
    var swiper;
    var currentPageBlock;

    function initSlider(element, position) {
        parentElement = element;
        currentPageBlock = parentElement.find('.' + PHOTO_STORY_CURRENT_ITEM_CLASS);

        updateTotalItemView(position || 0);

        initHandlers(position || 0);
    }

    function updateTotalItemView(currentPosition) {
        parentElement.find('.' + PHOTO_STORY_TOTAL_ITEMS_CLASS).html(parentElement.find('.' + PHOTO_STORY_ITEM_CLASS).length);
        currentPageBlock && currentPageBlock.html(currentPosition + 1);
    }

    function initHandlers(position) {
        swiper = new Swiper('.swiper-container', {
            speed: 400,
            spaceBetween: 100,
            hashnav: true,
            initialSlide: position,
            onSlideChangeStart: function(swiper) {
                currentPageBlock && currentPageBlock.html(swiper.activeIndex + 1);
            }
        });

        if (!position) {
            window.location.hash = 1;
        }
    }

    function removeSlider() {
        removeHandlers();
    }

    function removeHandlers() {
        swiper.destroy(false, true);
    }

    return {
        init: initSlider,
        remove: removeSlider
    }
}
