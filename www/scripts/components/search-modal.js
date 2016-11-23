$(function() {
    $(document).ready(function() {
        var $body = $('body');
        
        if( $body.hasClass('search') && $('.filtersList__wrapper').length ) {
            var parentElement = $('.filtersList__wrapper');
            var parentElementList = parentElement.find('.filtersList');
            var allItems = parentElement.find('.filtersList__item');
            var selectedNumberElement = $('.search-rubric-selected-number');
            var btnElement = $('.search-form__rubric'); 

            initHandlers();
            updateSelectedNumberElement();
        }

        function initHandlers() {

            btnElement.click(openList);

            parentElement.find('.filtersList__header-close').click(closeList);
            parentElement.find('.categoryFilter__applyButton').click(applyList);
            parentElement.find('.filtersList__item').click(toggleItem);       
            parentElement.find('.filtersList__header-select-all').click(toggleAllSelection);
        }

        function openList() {
            $body.scrollTop(0);

            $body.addClass('rubric-open');
        }

        function closeList() {
            updateSelectedNumberElement();
            
            $body.removeClass('rubric-open');

            btnElement && btnElement[0] && btnElement[0].scrollIntoViewIfNeeded && btnElement[0].scrollIntoViewIfNeeded();
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

        function updateSelectedNumberElement(items) {
            var selectedCount = allItems.filter('.selected').length;
            var template;

            switch(selectedCount) {
                case 0:
                    template = '0 рубрик';
                    break;
                case 1:
                    template = '1 рубрика';
                    break;
                default:
                    template = selectedCount + ' рубрики';
                    break;
            }

            selectedNumberElement.html(template);
        }
    });
});
