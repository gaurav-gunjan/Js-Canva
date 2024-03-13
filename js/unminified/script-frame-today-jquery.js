$.getJSON('http://192.168.29.156:5000/api/user/adminCategories')
    .done(function (data) {
        console.log("Category Data ::: ", data?.result)

        $.each(data?.result, function (index, value) {
            // console.log("Category Name ::: ", value?.categoryName)
            //! Create a new list item element for Category
            var listItem = $('<li>').attr({ "data-keyword": "search-keyword", "data-target": '#' + value?.categoryName });
            //! Create the anchor element
            var anchor = $('<a>').attr("href", "#").text(value?.categoryName);

            //! Add click event handler to the List Element
            listItem.on('click', function (e) {
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

                    var subContainer = $('#' + value?.categoryName + ' .insert-sub-category');

                    $.ajax({
                        url: 'http://192.168.29.156:5000/api/user/adminSubcategories',
                        type: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify(data)
                    }).done(function (data) {
                        console.log("Sub Category Data ::: ", data?.result);

                        $.each(data?.result, function (index, category) {
                            // subContainer.next().remove()
                            // console.log("Removed Sub Container ::: ", subContainer.next().remove())
                            //! Create a new list item element for Sub-Category
                            var innerListItem = $('<li>').attr("data-keyword", "search-keyword").attr("data-target", '#' + category?.subCategoryName);
                            var innerAnchor = $('<a>').attr("href", "#").text(category?.subCategoryName);

                            //! Add click event handler to the Inner List Element
                            innerListItem.on('click', function () {
                                console.log("Sub Category Name Clicked ::: ", category?.subCategoryName);
                                innerListItem.addClass('opened active');
                                $('#' + value?.categoryName).addClass('panel-hide');
                                $('#' + category?.subCategoryName).removeClass('panel-hide');

                                if (category?._id) {
                                    const childData = { _id: category?._id };


                                    $.ajax({
                                        url: 'http://192.168.29.156:5000/api/user/adminChildCategories',
                                        type: 'POST',
                                        contentType: 'application/json',
                                        data: JSON.stringify(childData)
                                    }).done(function (resData) {
                                        console.log("Child Response Data ::: ", resData);
                                        $.each(resData?.result, function (index, childValue) {
                                            var childContainer = $('#' + category?.subCategoryName + ' .insert-child-category');

                                            //! Dynamic Start : Create a new list item element for Sub-Category
                                            let liElement = $('<li>').attr('data-keyword', childValue?.childCategoryName);
                                            let aElement = $('<a>').attr('href', '#').text(childValue?.childCategoryName);
                                            let spanElement = $('<span>').addClass('material-icons arrow').text('keyboard_arrow_down');
                                            aElement.append(spanElement);
                                            liElement.append(aElement);

                                            let outerDivElement = $('<div>');
                                            let innerDivElement = $('<div>').attr('id', 'palleon-frames-grid-watercolor').addClass('palleon-frames-grid paginated').attr('data-perpage', '4');
                                            let frameDivElement = $('<div>').addClass('palleon-frame').attr('data-elsource', "http://192.168.29.156:5000/" + childValue?.childCategoryImageSVG);
                                            let imageWrapperDivElement = $('<div>').addClass('palleon-img-wrap');
                                            let imgElement = $('<img>').attr('data-src', "http://192.168.29.156:5000/" + childValue?.childCategoryImage).addClass('lazy');
                                            let innerDivLoader = $('<div>').addClass('palleon-img-loader');
                                            imageWrapperDivElement.append(innerDivLoader);
                                            imageWrapperDivElement.append(imgElement);
                                            frameDivElement.append(imageWrapperDivElement);
                                            innerDivElement.append(frameDivElement);
                                            outerDivElement.append(innerDivElement);
                                            liElement.append(outerDivElement);

                                            childContainer.append(liElement);

                                            liElement.on('click', function () {
                                                console.log("Clicked Image Parent List ::: ", liElement);
                                                liElement.addClass('opened');
                                                imageWrapperDivElement.css('min-height', 'auto');
                                                imgElement.addClass('entered loaded').attr('data-ll-status', 'loaded');
                                                innerDivLoader.remove();
                                                imgElement.attr('src', "http://192.168.29.156:5000/" + childValue?.childCategoryImage);
                                            });

                                            selector.find('.palleon-frames-grid').on('click', '.palleon-frame img', function () {
                                                selector.find('#palleon-canvas-loader').css('display', 'flex');
                                                var frame = $(this).parent().parent();
                                                var svgUrl = frame.data('elsource');
                                                selector.find('.palleon-frames-grid .palleon-frame').removeClass('active');
                                                frame.addClass('active');
                                                fabric.loadSVGFromURL(svgUrl, function (objects, options) {
                                                    var svg = fabric.util.groupSVGElements(objects, options);
                                                    var svgWidth = svg.width;
                                                    var svgHeight = svg.height;
                                                    svg.set('originX', 'center');
                                                    svg.set('originY', 'center');
                                                    svg.set('left', getScaledSize()[0] / 2);
                                                    svg.set('top', getScaledSize()[1] / 2);
                                                    svg.set('scaleX', (getScaledSize()[0] + 2) / svgWidth);
                                                    svg.set('scaleY', (getScaledSize()[1] + 2) / svgHeight);
                                                    svg.set('objectType', 'frame');
                                                    canvas.add(svg);
                                                    canvas.setActiveObject(svg);
                                                    canvas.requestRenderAll();
                                                    selector.find('#palleon-canvas-loader').hide();
                                                }, function () { }, {
                                                    crossOrigin: 'anonymous'
                                                });
                                                canvas.fire('palleon:history', { type: 'frame', text: palleonParams.added });
                                            });
                                        });
                                    }).fail(function (error) {
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
                    }).fail(function (error) {
                        console.error('Error fetching data:', error);
                    });

                }
            });


            // $('#' + value?.categoryName).remove()

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
    .fail(function (error) {
        console.error('Error fetching data:', error);
    });