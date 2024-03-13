// console.log("Script Frame")

$.getJSON('http://192.168.1.60:5000/api/user/adminCategories')
    .done(function(data) {
        // console.log("Category Data ::: ", data?.result)
        $.each(data?.result, function(index, value) {
            // console.log("Category Name ::: ", value?.categoryName)

            //! Create a new list item element for Category
            var listItem = $('<li>').attr({
                "data-keyword": "search-keyword",
                "data-target": '#' + value?.categoryName
            });

            //! Create the anchor element
            var anchor = $('<a>').attr("href", "#").text(value?.categoryName);

            //! Add onclick event handler to the anchor element
            listItem.on('click', function() {
                console.log("Category Name Clicked:", value?.categoryName);
                listItem.addClass('opened active');
                $('#palleon-frames-category').addClass('panel-hide');
                $('#' + value?.categoryName).removeClass('panel-hide');

                if (value?._id) {
                    const data = { _id: value?._id };
                    const options = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    };

                    $.ajax({
                        url: 'http://192.168.1.60:5000/api/user/adminSubcategories',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    }).done(function(data) {
                        console.log("Sub Category Data ::: ", data?.result);
                        $.each(data?.result, function(index, category) {
                            var subContainer = $('#' + value?.categoryName + ' .insert-sub-category');
                            var innerListItem = $('<li>').attr("data-keyword", "search-keyword").attr("data-target", '#' + category?.subCategoryName);
                            var innerAnchor = $('<a>').attr("href", "#").text(category?.subCategoryName);

                            innerListItem.on('click', function() {
                                console.log("Sub Category Name Clicked ::: ", category?.subCategoryName);
                                innerListItem.addClass('opened active');
                                $('#' + value?.categoryName).addClass('panel-hide');
                                $('#' + category?.subCategoryName).removeClass('panel-hide');

                                if (category?._id) {
                                    const childData = { _id: category?._id };
                                    const childOptions = {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify(childData)
                                    };

                                    var childContainer = $('#' + category?.subCategoryName + ' .insert-child-category');

                                    $.ajax({
                                        url: 'http://192.168.1.60:5000/api/user/adminChildCategories',
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(childData)
                                    }).done(function(resData) {
                                        console.log("Child Response Data ::: ", resData);
                                        $.each(resData?.result, function(index, childValue) {
                                            // !Dynamic Start
                                            let liElement = $('<li>').attr('data-keyword', childValue?.childCategoryName);
                                            let aElement = $('<a>').attr('href', '#').text(childValue?.childCategoryName);
                                            let spanElement = $('<span>').addClass('material-icons arrow').text('keyboard_arrow_down');
                                            aElement.append(spanElement);
                                            liElement.append(aElement);

                                            let outerDivElement = $('<div>');
                                            let innerDivElement = $('<div>').attr('id', 'palleon-frames-grid-watercolor').addClass('palleon-frames-grid paginated').attr('data-perpage', '4');
                                            let frameDivElement = $('<div>').addClass('palleon-frame').attr('data-elsource', "http://192.168.1.60:5000/" + childValue?.childCategoryImageSVG);
                                            let imageWrapperDivElement = $('<div>').addClass('palleon-img-wrap');
                                            let imgElement = $('<img>').attr('data-src', "http://192.168.1.60:5000/" + childValue?.childCategoryImage).addClass('lazy');
                                            let innerDivLoader = $('<div>').addClass('palleon-img-loader');
                                            imageWrapperDivElement.append(innerDivLoader);
                                            imageWrapperDivElement.append(imgElement);
                                            frameDivElement.append(imageWrapperDivElement);
                                            innerDivElement.append(frameDivElement);
                                            outerDivElement.append(innerDivElement);
                                            liElement.append(outerDivElement);

                                            childContainer.append(liElement);

                                            liElement.on('click', function() {
                                                console.log("Clicked Image Parent List ::: ", liElement);
                                                liElement.addClass('opened');
                                                imageWrapperDivElement.css('min-height', 'auto');
                                                imgElement.addClass('entered loaded').attr('data-ll-status', 'loaded');
                                                innerDivLoader.remove();
                                                imgElement.attr('src', "http://192.168.1.60:5000/" + childValue?.childCategoryImage);

                                                imgElement.on('click', function() {
                                                    console.log("Clicked Image List");
                                                    frameDivElement.addClass('active');
                                                });
                                            });
                                        });
                                    }).fail(function(error) {
                                        console.error('Error fetching data:', error);
                                    });
                                }
                            });

                            innerListItem.append(innerAnchor);
                            subContainer.append(innerListItem);

                            //! Adding Child Category - Start
                            $('#' + value?.categoryName).after(`
                                <div id=${category?.subCategoryName} class="palleon-icon-panel-content panel-hide">
                                    <div class="palleon-tabs">
                                        <div id="palleon-all-frames" class="palleon-tab active">
                                            <ul id="palleon-frames-wrap" class="palleon-accordion insert-child-category">
                                            </ul>
                                        </div>
                                    </div>
                                    <div id="palleon-noframes" class="notice notice-warning">Nothing found.</div>
                                </div>
                            `);
                            //! Adding Child Category - End
                        });
                    }).fail(function(error) {
                        console.error('Error fetching data:', error);
                    });
                }
            });

            listItem.append(anchor);
            $("#palleon-frames-category .insert-category").append(listItem);

            //! Adding Sub Category 
            $('#palleon-frames-category').after(`
                <div id=${value?.categoryName} class="palleon-icon-panel-content">
                    <div id="palleon-all-frames" class="palleon-tab active">
                        <ul id="palleon-frames-wrap" class="palleon-accordion insert-sub-category">
                        </ul>
                    </div>
                </div>
            `);
        });
    })
    .fail(function(error) {
        console.error('Error fetching data:', error);
    });
