$(function() {
    $(document).ready(function() {
        if( $('body').hasClass('search') && $('.filtersList__wrapper').length ) {
            var parentElement = $('.filtersList__wrapper');
            var parentElementList = parentElement.find('.filtersList');
            var allItems = parentElement.find('.filtersList__item');

            initHandlers();
        }

        function initHandlers() {

            $('.search-form__rubric').click(openList);

            parentElement.find('.filtersList__header-close').click(closeList);
            parentElement.find('.categoryFilter__applyButton').click(applyList);
            parentElement.find('.filtersList__item').click(toggleItem);       
            parentElement.find('.filtersList__header-select-all').click(toggleAllSelection);
        }

        function openList() {
            $('body').addClass('rubric-open');
        }

        function closeList() {
            $('body').removeClass('rubric-open');
        }

        function applyList() {
            var items = parentElementList.find('.selected');
            console.log('Выбранные элементы:');
            console.log(items);

            closeList();
        }

        function toggleItem() {
            $(this).toggleClass('selected');

            checkAllItems(); 
        }

        function toggleAllSelection() {
            if (parentElementList.hasClass('selectedAll')) {
                allItems.removeClass('selected');
            } else {
                allItems.addClass('selected');
            }

            parentElementList.toggleClass('selectedAll');
        }

        function checkAllItems() {
            var selectedItems = parentElementList.find('.selected');

            if(allItems.length === selectedItems.length) {
                parentElementList.addClass('selectedAll');
            } else {
                parentElementList.removeClass('selectedAll');
            }
        }
    });
});
